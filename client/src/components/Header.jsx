import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

export default function Header() {
	const location = useLocation();

	return (
		<Navbar className="p-4" bg="transparent" expand="lg">
			<div className="container-fluid">
				<LinkContainer
					to={{
						pathname: '/',
						search: location.search,
					}}
				>
					<Navbar.Brand>ERC-721 Demo</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
			</div>
		</Navbar>
	);
}
