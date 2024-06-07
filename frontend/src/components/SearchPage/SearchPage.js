import React, {useState, useEffect} from 'react';
import './SearchPage.css'
import Dropdown from './Dropdown/Dropdown';
import DropdownItem from './DropdownItem/DropdownItem';
import axios from 'axios';

const getAccessTokenFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('access_token');
};

const SearchPage = () => {

	const items = [1, 2, 3, 4]

	return (
		<div className="searchpage">
			{/* <h2> Which playlist would you like to analyze? </h2> */}
			<div className="content"> 
				<Dropdown
					buttonText="Choose your playlist" 
					content={
					<>
						{items.map((item, id) => (
						<DropdownItem key={id}>
							{item}
						</DropdownItem>
						))}
					</>
					} 
				/>
			</div>
		</div>
	);
};

export default SearchPage;
