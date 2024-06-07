import React from 'react';
import DropdownButton from '../DropdownButton/DropdownButton';
import DropdownContent from '../DropdownContent/DropdownContent';
import { useState, useEffect, useRef } from 'react';

const Dropdown = ({buttonText, content}) => {
	const [open, setOpen] = useState(false);
	const [dropdownTop, setDropDownTop] = useState(0);

	const dropdownRef = useRef();
	const buttonRef = useRef();
	const contentRef = useRef();

	const toggleDropdown = () => {
		if (!open) {
			const spaceRemaining = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
			const contentHeight = contentRef.current.clientHeight;

			const topPosition = spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;
			setDropDownTop(topPosition);
		}
		setOpen((open) => !open);
	};

	useEffect(() => {
		const handler = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("click", handler);

		return () => {
			document.removeEventListener("click", handler);
		};

	}, []);

	return (
		<div className="dropdown" ref={dropdownRef}>
			<DropdownButton ref={buttonRef} toggle={toggleDropdown} open={open}>{buttonText}</DropdownButton>
			<DropdownContent top={dropdownTop} ref={contentRef} open={open}>{content}</DropdownContent>
		</div>
	);
};

export default Dropdown;
