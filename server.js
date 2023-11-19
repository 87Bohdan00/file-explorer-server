const express = require('express');
const app = express();
const port = 3001;

let filesData = [
	{ id: 1, name: 'File 1', type: 'file', description: 'Description of File 1' },
	{
		id: 2,
		name: 'Folder 1',
		type: 'folder',
		files: [
			{ id: 3, name: 'File 2', type: 'file', description: 'Description of File 2' },
			{ id: 4, name: 'File 3', type: 'file', description: 'Description of File 3' },
			{ id: 5, name: 'Folder 2', type: 'folder', files: [
                { id: 6, name: 'File 4', type: 'file', description: 'Description of File 4' }
            ] },
		],
	},
	{ id: 7, name: 'Folder 3', type: 'folder', files: [] },
];

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.get('/files', (req, res) => {
	res.json(filesData);
});

app.put('/files/:id', (req, res) => {
	const { id } = req.params;
	const { name } = req.body;

	const fileToUpdate = filesData.find((file) => file.id === parseInt(id));
	if (!fileToUpdate) {
		return res.status(404).send('File not found');
	}

	fileToUpdate.name = name;
	res.json(fileToUpdate);
});

app.delete('/files/:id', (req, res) => {
	const { id } = req.params;

	filesData = filesData.filter((file) => file.id !== parseInt(id));
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
