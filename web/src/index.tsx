import { Hono } from 'hono'

const app = new Hono()
import index from "../public/templates/index.html?raw";
import test from "../public/templates/test.html?raw";

app.get('/', (c) => {
  return c.html(index as string);
})


app.get('/test', (c) => {
  return c.html(test as string);
})

export default app
