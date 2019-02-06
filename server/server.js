const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 8000;
const root = path.resolve(__dirname, '..', 'dist');

app.use(express.static(root))

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});