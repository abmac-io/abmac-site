import { Hono } from "hono";
import { UUID, randomUUID } from "node:crypto";

type Bindings = {
  CACHE: KVNamespace,
};

type Session = {
  id: UUID,
};

const expirationTtl = 172800;

const cache = new Hono<{ Bindings: Bindings }>()

cache.get("/session", async (c) => {
  //const key = c.req.param("id");

  const session = sessionStorage.getItem("abmac-session") || {
    id: randomUUID()
  } as Session;


  //await c.env.CACHE.put(key, "value", { expirationTtl })
  //return c.text(`Success: ${key}`);
});

export default cache;
