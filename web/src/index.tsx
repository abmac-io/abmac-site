import { Hono } from "hono";

const app = new Hono();
import index from "../public/templates/index.html?raw";

app.get("/", (c) => {
  return c.html(index as string);
});

export default app;
