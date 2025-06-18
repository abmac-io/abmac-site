import { Hono } from "hono";

const app = new Hono();
import index from "../public/templates/index.html?raw";
import test from "../public/templates/test.html?raw";
import test2 from "../public/templates/test2.html?raw";

app.get("/", (c) => {
  return c.html(index as string);
});

app.get("/test", (c) => {
  return c.html(test as string);
});

app.get("/test2", (c) => {
  return c.html(test2 as string);
});

export default app;
