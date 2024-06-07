import express from 'express';
import {getUserPlayLists } from './server.js';

const router = express.Router();

router.get('/success', async function(req, res) {
	const access_token = req.query.access_token;
	const refresh_token = req.query.refresh_token;

	try {
		const user_playlists = await getUserPlayLists(access_token);
		console.log(user_playlists);
		res.redirect('http://localhost:3000/search')

	} catch (error) {
		res.send({
			message: "Authentication successful, but failed to playlists",
			access_token: access_token,
			refresh_token: refresh_token,
			error: error.message
		});
	}
});

router.get('/api/data', (req, res) => {
	const access_token = req.query.access_token;
	try {
		const user_playlists = getUserPlayLists(access_token);
		res.json(user_playlists);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch playlists", error: error.message });
	}
});

export { router }
