const { test, expect } = require("@playwright/test");
require("dotenv").config();
var userid;
test("Get users", async ({ request }) => {
  const response = await request.get(
    `${process.env.API_HOST_NAME}/api/users?page=2`,
  );
  expect(response.status()).toBe(200);
});

test("Create user", async ({ request }) => {
  const response = await request.post(
    `${process.env.API_HOST_NAME}/api/users`,
    {
      data: {
        name: "kumar",
        job: "trainer",
      },
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  expect(response.status()).toBe(201);

  var res = await response.json();
  userid = res.id;
});

test("Update user", async ({ request }) => {
  const response = await request.put(
    `${process.env.API_HOST_NAME}/api/users/${userid}`,
    {
      data: {
        name: "kumar",
        job: "engineer",
      },
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  expect(response.status()).toBe(200);
});

test("Delete user", async ({ request }) => {
  const response = await request.delete(
    `${process.env.API_HOST_NAME}/api/users/${userid}`,
  );
  expect(response.status()).toBe(204);
});
