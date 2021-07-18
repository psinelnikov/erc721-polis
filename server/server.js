require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 8080;

app.use(cors());

app.get('/api/accesstoken', async (req, res) => {
	// code can only be used 1-time
	const code = req.query.code;
	axios
		.get(
			`https://rocket.metis.io/api/v1/oauth2/access_token?app_id=${process.env.APP_ID}&app_key=${process.env.APP_SECRET}&code=${code}`
		)
		.then((response) => {
			res.send(response.data);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.listen(port);
console.log('Server listening on port: ' + port);
