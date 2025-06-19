import { Hono } from "hono";
import { UUID } from "node:crypto";

type Bindings = {
  cache: KVNamespace,
};

type Session = {
  id: UUID,
};

const ttl_expiration = 172800;

const cache = new Hono();

cache.get("/", (c) => {
  return c.text("something");
});

export default cache;
