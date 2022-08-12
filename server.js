const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');

// DotENV
dotenv.config();

// Routes
fastify.get('/items', (req, rep) => {
	rep.send({ test: 'List of items' });
});

// Start
const start = async () => {
	try {
		await fastify.listen({
			port: process.env.PORT
		});
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};
start();
