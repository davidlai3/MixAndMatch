import axios from 'axios';

export const getUserPlayLists = async (access_token) => {
	try {
		const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
			headers: {
				'Authorization': 'Bearer ' + access_token
			}
		}); 
		return response.data.items.map(playlist => ({
			name: playlist.name,
			href: playlist.href
		}));

	} catch (error) {
		throw new Error('Failed to fetch playlists');
	}
};

