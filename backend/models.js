import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
	id: String,
	href: String,
	favorite_track: String
});

const artistSchema = new Schema({
	id: String,
	name: String,
	href: String
});

const topArtistsSchema = new Schema({
	userId: String,
	artists: [artistSchema]
});

const trackSchema = new Schema({
	id: String,
	name: String,
	href: String
});

const topTracksSchema = new Schema({
	userId: String,
	tracks: [trackSchema]
});



const UserInfo = mongoose.model('UserInfo', userSchema);
const TopArtists = mongoose.model('TopArtists', topArtistsSchema);
const TopTracks = mongoose.model('TopTracks', topTracksSchema);
export { UserInfo, TopArtists, TopTracks }


