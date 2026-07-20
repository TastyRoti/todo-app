import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test("can add a new task", async ({ page }) => {
  const uniqueTitle = `Buy milk ${Date.now()}`;
  await page.getByPlaceholder("New task...").fill(uniqueTitle);
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.getByText(uniqueTitle)).toBeVisible();
});

test("can mark a task as done", async ({ page }) => {
  const uniqueTitle = `Walk the dog ${Date.now()}`;
  await page.getByPlaceholder("New task...").fill(uniqueTitle);
  await page.getByRole("button", { name: "Add" }).click();

  const taskRow = page.getByTestId(new RegExp("task-item-")).filter({ hasText: uniqueTitle });
  await taskRow.getByRole("checkbox").click({ timeout: 10000 });

  await expect(page.getByText(uniqueTitle)).toHaveClass(/line-through/);
});

test("can delete a task", async ({ page }) => {
  const uniqueTitle = `Temporary task ${Date.now()}`;
  await page.getByPlaceholder("New task...").fill(uniqueTitle);
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.getByText(uniqueTitle)).toBeVisible();

  const taskRow = page.getByTestId(new RegExp("task-item-")).filter({ hasText: uniqueTitle });
  await taskRow.getByRole("button").click();

  await expect(page.getByText(uniqueTitle)).not.toBeVisible();
});

test("can search for tasks", async ({ page }) => {
  const uniqueTitle = `Findable task ${Date.now()}`;
  await page.getByPlaceholder("New task...").fill(uniqueTitle);
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByPlaceholder("Search tasks...").fill("Findable");
  await expect(page.getByText(uniqueTitle)).toBeVisible();

  await page.getByPlaceholder("Search tasks...").fill("NonExistentXYZ");
  await expect(page.getByText(uniqueTitle)).not.toBeVisible();
});

test("can create a task with a new category", async ({ page }) => {
  const uniqueTitle = `Task with category ${Date.now()}`;
  const uniqueCategory = `Category${Date.now()}`;

  await page.getByPlaceholder("New task...").fill(uniqueTitle);

  await page.getByTestId("category-select").click();
  await page.getByTestId("new-category-input").fill(uniqueCategory);
  await page.getByTestId("new-category-submit").click();

  await page.getByRole("option", { name: uniqueCategory }).click();

  await page.getByRole("button", { name: "Add" }).click();

  const taskRow = page.getByTestId(new RegExp("task-item-")).filter({ hasText: uniqueTitle });
  await expect(taskRow.getByText(uniqueCategory)).toBeVisible();
});

test("can set a due date on a task", async ({ page }) => {
  const uniqueTitle = `Task with due date ${Date.now()}`;

  await page.getByPlaceholder("New task...").fill(uniqueTitle);
  await page.getByTestId("due-date-trigger").click();

  await page.locator('[role="gridcell"] button').first().click();

  await page.getByRole("button", { name: "Add" }).click();

  const taskRow = page.getByTestId(new RegExp("task-item-")).filter({ hasText: uniqueTitle });
  await expect(taskRow.locator("svg").first()).toBeVisible();
});