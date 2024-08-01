import { ApiExpress } from "./infra/http/express/api.express";

(() => {
  const api = ApiExpress.create([]);
  const port = 3000;
  api.startServer(port);
})()