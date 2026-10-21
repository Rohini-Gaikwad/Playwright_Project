const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("REST API Testing", () => {
  test("GET /posts returns 100 posts", async ({ request }) => {
    const response = await request.get(`${process.env.BASE_URL}/posts`);

    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts).toHaveLength(100);
    expect(posts[0]).toHaveProperty("id");
    expect(posts[0]).toHaveProperty("title");
    expect(posts[0]).toHaveProperty("body");
  });

  test("POST /posts creates a new post", async ({ request }) => {
    const newPost = {
      title: "Playwright API Testing",
      body: "Testing REST APIs without a browser",
      userId: 1,
    };

    const response = await request.post(`${process.env.BASE_URL}/posts`, {
      data: newPost,
    });

    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created.title).toBe(newPost.title);
    expect(created.body).toBe(newPost.body);
    expect(created.id).toBeDefined();
  });

  test("PUT /posts/1 updates an existing post", async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: "Updated Title",
      body: "Updated body content",
      userId: 1,
    };

    const response = await request.put(`${process.env.BASE_URL}/posts/1`, {
      data: updatedPost,
    });

    expect(response.status()).toBe(200);
    const result = await response.json();
    expect(result.title).toBe("Updated Title");
  });

  test("DELETE /posts/1 removes the post", async ({ request }) => {
    const response = await request.delete(`${process.env.BASE_URL}/posts/1`);
    expect(response.status()).toBe(200);
  });

  test("GET /posts/999 returns 404 for missing post", async ({ request }) => {
    const response = await request.get(`${process.env.BASE_URL}/posts/999`);
    expect(response.status()).toBe(404);
  });
});
