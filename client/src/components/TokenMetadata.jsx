import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TokenMetadata({ httpClient, user }) {
	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const name = await httpClient.sendTxAsync(
					process.env.REACT_APP_CONTRACT_NAME,
					parseInt(process.env.REACT_APP_CHAIN_ID),
					'name',
					[]
				);
				const symbol = await httpClient.sendTxAsync(
					process.env.REACT_APP_CONTRACT_NAME,
					parseInt(process.env.REACT_APP_CHAIN_ID),
					'symbol',
					[]
				);
				setTokenName(name.result);
				setTokenSymbol(symbol.result);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [user, httpClient]);

	return (
		<>
			<Row>
				<Col>
					<h1>
						{tokenName} - {tokenSymbol}
					</h1>
					{user && <h2>Hello, {user.display_name}</h2>}
				</Col>
			</Row>
		</>
	);
}
