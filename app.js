import Fastify from "fastify";
import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";
import Handlebars from "handlebars";
import path from "path";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyView, {
  engine: {
    handlebars: Handlebars,
  },
  layout: "./layout.html",
  propertyName: "render",
  root: path.join(import.meta.dirname, "views"),
});

fastify.register(fastifyStatic, {
  root: path.join(import.meta.dirname, "public"),
});

fastify.get("/", async function handler(_request, reply) {
  return reply.render("index.html");
});
fastify.get("/public/htmx", async function handler(_request, reply) {
  return reply.sendFile("htmx.min.js");
});

export default fastify
