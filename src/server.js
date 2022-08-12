const fastify = require('fastify')({ logger: true });
const fastifyEnv = require('@fastify/env');
const fastifySwagger = require('@fastify/swagger');
const { env: envSchema } = require('./schemas');
const itemRoutes = require('./routes/itemRoutes');

// Swagger
fastify.register(fastifySwagger, {
	exposeRoute: true,
	routePrefix: '/routes-docs',
	swagger: {
		info: {
			title: 'Fastify API',
			description: 'Description routes API on Fastify'
		}
	}
});

// Routes
fastify.register(itemRoutes);

// Start
const start = async () => {
	try {
		// Register plugins
		await fastify.register(fastifyEnv, {
			confKey: 'config',
			schema: envSchema
		});

		// Ready
		await fastify.ready((error) => {
			if (error) console.error(error);
		});

		// Listen
		await fastify.listen({
			port: fastify.config.PORT
		});
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

// Run
start();
