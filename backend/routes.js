import express from 'express';
import { getUserTopArtists, getUserTopTracks, getUserInfo } from './server.js';
import { UserInfo, TopArtists, TopTracks } from './models.js';

const router = express.Router();

router.get('/success', async function(req, res) {
	const access_token = req.query.access_token;
	const refresh_token = req.query.refresh_token;

	try {
		const user_info = await getUserInfo(access_token);
		const top_artists = await getUserTopArtists(access_token);
		const top_tracks = await getUserTopTracks(access_token);

		// TODO: Update favorite track in db
		await UserInfo.findOneAndUpdate({ 
			id: user_info.id, 
			href: user_info.href,
			},
			{ $set: user_info },
			{ upsert: true, new: true }
		);

		await TopArtists.findOneAndUpdate({ 
			userId: user_info.id,
			},
			{ $set: {artists: top_artists} },
			{ upsert: true, new: true }
		);

		await TopTracks.findOneAndUpdate({ 
			userId: user_info.id,
			},
			{ $set: {tracks: top_tracks} },
			{ upsert: true, new: true }
		);

		res.send({
			message: "Authentication successful",
			access_token: access_token,
			refresh_token: refresh_token,
			user_info: user_info,
			top_artists: top_artists,
			top_tracks: top_tracks
		});
	} catch (error) {
		res.send({
			message: "Authentication successful, but failed to fetch top artists",
			access_token: access_token,
			refresh_token: refresh_token,
			error: error.message
		});
	}

});

export { router }
