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