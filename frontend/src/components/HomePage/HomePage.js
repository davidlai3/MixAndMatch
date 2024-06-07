import React from 'react';
import TitleBlock from './TitleBlock'
import SpotifyLoginButton from './SpotifyLoginButton'
import './HomePage.css'

const HomePage = () => {
	return (
		<div className="App">
			<header className="App-header">
				<TitleBlock />
				<SpotifyLoginButton />
			</header>
		</div>
	);
};

export default HomePage;
