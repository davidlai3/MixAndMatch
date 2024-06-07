import React from 'react';
import './SpotifyLoginButton.css';

const SpotifyLoginButton = () => {
	const handleLogin = () => {
		window.location.href = 'http://localhost:3001/login';
	};

	return (
		<button className="spotify-login-button" onClick={handleLogin}>
			Login with Spotify
		</button>
	);
};

export default SpotifyLoginButton;
