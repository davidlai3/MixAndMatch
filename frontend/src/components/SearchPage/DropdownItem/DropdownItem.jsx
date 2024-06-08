import React from 'react';
import './DropdownItem.css';

const DropdownItem = ({children, href, onClick}) => {
	return (
		<div className='dropdown-item' onClick={onClick}>
			{children}
		</div>
	)
}

export default DropdownItem;
