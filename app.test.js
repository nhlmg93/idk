import assert from "node:assert";
import { test } from "node:test";
import { Window } from "happy-dom";
import fastify  from "./app.js";

test("renders", async (t) => {
  t.after(() => fastify.close());

  const response = await fastify.inject({
    method: "GET",
    url: "/"
  })

  assert.strictEqual(response.statusCode, 200, 'Status code is 200')

  const window = new Window()
  const document = window.document
  document.body.innerHTML = response.body

  await t.test("Monday-Sunday", () => {
    console.log(document.querySelector(".center").innerHTML)
    
  });
});
