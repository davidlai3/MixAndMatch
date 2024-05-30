import { UserInfo, TopArtists, TopTracks } from './models.js';
var similarity = require('compute-cosine-similarity');

function calculateSimilarity(l1, l2) {
	return similarity(l1, l2);
}

async function generateMatches(userId) {
	try {
		const user = await UserInfo.findOne({ id: userId });
		const topArtists = await TopArtists.findOne({ userId: userId });
		const topTracks = await TopTracks.findOne({ userId: userId });

		if (!user || !topArtists || !topTracks) {
			throw new Error('User not found');
		}

		const similarityScores = [];

		const cursor = UserInfo.find({ id: {$ne: userId} }).cursor();

		for (let otherUser = await cursor.next(); otherUser != null; otherUser = await cursor.next()) {
			const otherUserTopArtists = await TopArtists.findOne({ userId: otherUser.id });
			const otherUserTopTracks = await TopTracks.findOne({ userId: otherUser.id });

			if (!otherUserTopArtists || !otherUserTopTracks) continue;

			const artistSimilarity = calculateSimilarity(topArtists.artists, otherUserTopArtists.artists);
			const trackSimilarity = calculateSimilarity(topTracks.tracks, otherUserTopTracks.tracks);

			const totalSimilarity = artistSimilarity + trackSimilarity;
			similarityScores.push({ user: otherUser, score: totalSimilarity });
		}

		similarityScores.sort((a, b) => b.score - a.score);
		return similarityScores.map(item => item.user);
		

	} catch (error) {
		throw new Error('Failed to generate matches');
	}

}
