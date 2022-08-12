const { getItems, getItem, addItem, updateItem, deleteItem } = require('../controllers/items');

// Schema item
const schemaItem = {
	type: 'object',
	properties: {
		id: { type: 'string' },
		name: { type: 'string' }
	}
};

// Options for get all items
const getAllItemsOpts = {
	schema: {
		response: {
			200: {
				type: 'array',
				items: schemaItem
			}
		}
	},
	handler: getItems
};

// Options for get single item
const getSingleItemOpts = {
	schema: {
		response: {
			200: schemaItem
		}
	},
	handler: getItem
};

// Options for add item
const addItemOpts = {
	schema: {
		body: {
			type: 'object',
			required: ['name'],
			properties: {
				name: {
					type: 'string'
				}
			}
		},
		response: {
			201: schemaItem
		}
	},
	handler: addItem
};

// Options for update item
const updateItemOpts = {
	schema: {
		body: {
			type: 'object',
			required: ['name'],
			properties: {
				name: {
					type: 'string'
				}
			}
		},
		response: {
			200: {
				type: 'array',
				items: schemaItem
			}
		}
	},
	handler: updateItem
};

// Options for delete item
const deleteItemOpts = {
	schema: {
		body: {
			type: 'string',
			required: ['id'],
			properties: {
				id: {
					type: 'string'
				}
			}
		},
		response: {
			200: {
				type: 'object',
				properties: {
					message: { type: 'string' }
				}
			}
		}
	},
	handler: deleteItem
};

function itemRoutes(fastify, options, done) {
	// Get all items
	fastify.get('/items', getAllItemsOpts);

	// Get single item
	fastify.get('/items/:id', getSingleItemOpts);

	// Add item
	fastify.post('/items', addItemOpts);

	// Put item
	fastify.put('/items/:id', updateItemOpts);

	// Delete item
	fastify.delete('/items/:id', deleteItemOpts);

	done();
}

module.exports = itemRoutes;
