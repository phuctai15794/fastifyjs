const { v4: uuidV4 } = require('uuid');
let items = require('../data/Items');

const getItems = (req, rep) => {
	rep.send(items);
};

const getItem = (req, rep) => {
	const { id } = req.params;
	const item = items.find((item) => item.id === Number(id));
	rep.send(item);
};

const addItem = (req, rep) => {
	const { name } = req.body;
	const item = {
		id: uuidV4(),
		name
	};

	items = [...items, item];

	rep.code(201).send(item);
};

const updateItem = (req, rep) => {
	const { id } = req.params;
	const { name } = req.body;

	items = items.map((item) => {
		if (item.id === Number(id)) {
			item.name = name;
		}
		return item;
	});

	rep.code(200).send(items);
};

const deleteItem = (req, rep) => {
	const { id } = req.params;

	items = items.filter((item) => item.id !== Number(id));

	rep.code(200).send({ message: `Item ${id} has been removed` });
};

module.exports = {
	getItems,
	getItem,
	addItem,
	updateItem,
	deleteItem
};
