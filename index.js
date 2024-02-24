import express from "express";
import http from "node:http";
import createBareServer from "@tomphttp/bare-server-node";
import path from "node:path";
import * as dotenv from "dotenv";
dotenv.config();

const __dirname = process.cwd();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "static")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});
app.get("/contributors", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "contributors.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "about.html"));
});
app.get("/proxy", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "Proxy.html"));
});
app.get("/games", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "Games.html"));
});
app.get("/apps", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "Apps.html"));
});
app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "Settings.html"));
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "404.html"));
});

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Bright Services listening on port 8080 ${process.env.PORT}`);
});

server.listen({
  port: process.env.PORT,
});
