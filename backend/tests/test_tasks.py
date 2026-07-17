import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database import Base, get_db


SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_and_teardown():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_create_task():
    response = client.post("/tasks/", json={"title": "Buy milk", "priority": 5})
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Buy milk"
    assert data["priority"] == 5
    assert data["done"] is False
    assert "id" in data


def test_get_tasks_empty():
    response = client.get("/tasks/")
    assert response.status_code == 200
    assert response.json() == []


def test_get_tasks_returns_created_task():
    client.post("/tasks/", json={"title": "Buy milk", "priority": 5})
    response = client.get("/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Buy milk"


def test_mark_task_as_done():
    create_response = client.post("/tasks/", json={"title": "Walk the dog"})
    task_id = create_response.json()["id"]

    patch_response = client.patch(f"/tasks/{task_id}", json={"done": True})
    assert patch_response.status_code == 200
    assert patch_response.json()["done"] is True


def test_delete_task():
    create_response = client.post("/tasks/", json={"title": "Temporary task"})
    task_id = create_response.json()["id"]

    delete_response = client.delete(f"/tasks/{task_id}")
    assert delete_response.status_code == 204

    get_response = client.get("/tasks/")
    assert get_response.json() == []


def test_filter_by_status():
    client.post("/tasks/", json={"title": "Done task"})
    client.post("/tasks/", json={"title": "Undone task"})

    all_tasks = client.get("/tasks/").json()
    task_id = all_tasks[0]["id"]
    client.patch(f"/tasks/{task_id}", json={"done": True})

    done_response = client.get("/tasks/?status=done")
    assert len(done_response.json()) == 1

    undone_response = client.get("/tasks/?status=undone")
    assert len(undone_response.json()) == 1


def test_search_tasks():
    client.post("/tasks/", json={"title": "Buy milk"})
    client.post("/tasks/", json={"title": "Walk the dog"})

    response = client.get("/tasks/?search=milk")
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Buy milk"


def test_sort_by_priority_descending():
    client.post("/tasks/", json={"title": "Low priority", "priority": 2})
    client.post("/tasks/", json={"title": "High priority", "priority": 9})

    response = client.get("/tasks/?sort=priority&order=desc")
    data = response.json()
    assert data[0]["priority"] == 9
    assert data[1]["priority"] == 2


def test_priority_validation_rejects_out_of_range():
    response = client.post("/tasks/", json={"title": "Bad task", "priority": 15})
    assert response.status_code == 422


def test_create_task_without_title_fails():
    response = client.post("/tasks/", json={"priority": 5})
    assert response.status_code == 422