module.exports = {
	env: {
		type: 'object',
		required: ['PORT'],
		properties: {
			PORT: {
				type: 'string',
				default: 3000
			}
		}
	}
};
