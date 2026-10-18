const { test, expect } = require("@playwright/test");

test("Test1@sanity", async ({ request }) => {
  console.log("Test 1");
});

test("Test2@regression", async ({ request }) => {
  console.log("Test 2");
});

test("Test3@smoke", async ({ request }) => {
  console.log("Test 3");
});
test("Test4@regression@sanity", async ({ request }) => {
  console.log("Test 4");
});
test("Test5@regression", async ({ request }) => {
  console.log("Test 5");
});
