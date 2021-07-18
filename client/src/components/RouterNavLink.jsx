import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

export default function RouterNavLink({ children, ...props }) {
	return (
		<LinkContainer {...props}>
			<Nav.Link active={false}>{children}</Nav.Link>
		</LinkContainer>
	);
}
