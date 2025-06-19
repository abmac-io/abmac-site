import { Hono } from "hono";

const app = new Hono();
import index from "../public/templates/index.html?raw";

app.get("/", (c) => {
  return c.html(index as string);
});

app.get("/qrcode", (c) => {
  return c.redirect("/");
});

export default app;
