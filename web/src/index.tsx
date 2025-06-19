import { Hono } from "hono";

import index from "/public/index.html?raw";

const app = new Hono();

app.get("/", (c) => {
  return c.html(index as string);
});

app.get("/qrcode", (c) => {
  return c.redirect("/");
});

export default app;
