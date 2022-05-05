const fastify = require("fastify")({ logger: true })

const PATHS = require("./config/paths")

fastify.register(require("@fastify/static"), {
  root: PATHS.ROOTS.PUBLIC
})

fastify.get('/', async (request, reply) => {
  return reply.sendFile("index.html")
})

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
