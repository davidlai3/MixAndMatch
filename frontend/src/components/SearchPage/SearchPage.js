import React, {useState, useEffect} from 'react';
import './SearchPage.css'
import Dropdown from './Dropdown/Dropdown';
import DropdownItem from './DropdownItem/DropdownItem';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const SearchPage = () => {

	const items = ['playlist1', 'playlist2', 'playlist3', 'playlist4'];

	const queryParams = new URLSearchParams(useLocation().search);
	const access_token = queryParams.get('access_token');
	const refresh_token = queryParams.get('refresh_token');
	console.log("Test: ")
	console.log(axios.get('http://localhost:3001/api/data', {
		params: { access_token, refresh_token }
	}))

	const [data, setData] = useState([]);

	useEffect(() => {
		// Fetch data from the backend
		axios.get('http://localhost:3001/api/data', {
			params: { access_token, refresh_token }
		})
		.then(response => {
			setData(response.data)
		})
		.catch(error => {
			console.error('There was an error fetching the data!', error);
		});
	}, [access_token, refresh_token]);


	return (
		<div className="searchpage">
			{/* <h2> Which playlist would you like to analyze? </h2> */}
			<div className="content"> 
				<Dropdown
					buttonText="Choose your playlist" 
					content={
					<>
						{data.map((item, id) => (
						<DropdownItem key={id} href={item.href}>
							{item.name}
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
