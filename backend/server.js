import axios from 'axios';


export const getUserTopArtists = async (access_token) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists?limit=50', {
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        });
		return response.data.items.map(artist => ({
			id: artist.id,
			name: artist.name,
			href: artist.href
		}));
    } catch (error) {
        throw new Error('Failed to fetch top artists');
    }
};

export const getUserTopTracks = async (access_token) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50', {
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        });
		return response.data.items.map(track => ({
			id: track.id,
			name: track.name,
			href: track.href
		}));
	} catch (error) {
        throw new Error('Failed to fetch top artists');
    }
};


const extractFields = (data) => {
	return {
		id: data.id,
		href: data.href,
	};
};

export const getUserInfo = async (access_token) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
		return ({
			id: response.data.id,
			href: response.data.href
		});
    } catch (error) {
        throw new Error('Failed to fetch top artists');
    }
};


