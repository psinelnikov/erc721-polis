import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import { Oauth2Client } from '@metis.io/middleware-client';

export default function ViewAllNFTs({ httpClient, user }) {
	const [list, setList] = useState([]);
	const location = useLocation();

	const login = async () => {
		let oauth2Client = new Oauth2Client();
		oauth2Client.startOauth2(
			process.env.REACT_APP_APP_ID,
			`http://localhost.localdomain:3000`
		);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const balance = await httpClient.sendTxAsync(
					process.env.REACT_APP_CONTRACT_NAME,
					parseInt(process.env.REACT_APP_CHAIN_ID),
					'balanceOf',
					[user.eth_address]
				);
				const arr = [];
				for (let i = 0; i < balance.result; i++) {
					const tokenId = await httpClient.sendTxAsync(
						process.env.REACT_APP_CONTRACT_NAME,
						parseInt(process.env.REACT_APP_CHAIN_ID),
						'tokenOfOwnerByIndex',
						[user.eth_address, i]
					);
					const rawURI = await httpClient.sendTxAsync(
						process.env.REACT_APP_CONTRACT_NAME,
						parseInt(process.env.REACT_APP_CHAIN_ID),
						'tokenURI',
						[tokenId.result]
					);
					const convertedURI = JSON.parse(rawURI.result);
					arr.push({
						tokenId: tokenId.result,
						name: convertedURI.properties.name.description,
					});
				}

				setList(arr);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [user, httpClient]);

	return (
		<>
			{!user && <Button onClick={login}>Login</Button>}
			<LinkContainer
				className="float-end"
				to={{
					pathname: '/create',
					search: location.search,
				}}
			>
				<Button>Create NFT</Button>
			</LinkContainer>

			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{list.map((listItem) => (
						<tr key={listItem.tokenId}>
							<td>{listItem.tokenId}</td>
							<td>{listItem.name}</td>
							<td>
								<LinkContainer
									className="float-end"
									to={{
										pathname: `/view/${listItem.tokenId}`,
										search: location.search,
									}}
								>
									<Button size="sm">View</Button>
								</LinkContainer>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}
