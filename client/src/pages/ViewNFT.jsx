import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom';

export default function ViewNFT({ httpClient }) {
	const { id } = useParams();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [url, setUrl] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const value = await httpClient.sendTxAsync(
					process.env.REACT_APP_CONTRACT_NAME,
					parseInt(process.env.REACT_APP_CHAIN_ID),
					'tokenURI',
					[parseInt(id)]
				);
				const object = JSON.parse(value.result);
				setName(object.properties.name.description);
				setDescription(object.properties.description.description);
				setUrl(object.properties.image.description);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [id, httpClient]);

	return (
		<Form>
			<Form.Group
				as={Row}
				className="mb-3"
				controlId="formPlaintextEmail"
			>
				<Form.Label column sm="2">
					Name
				</Form.Label>
				<Col sm="10">
					<Form.Control plaintext readOnly defaultValue={name} />
				</Col>
			</Form.Group>

			<Form.Group
				as={Row}
				className="mb-3"
				controlId="formPlaintextPassword"
			>
				<Form.Label column sm="2">
					Description
				</Form.Label>
				<Col sm="10">
					<Form.Control
						plaintext
						readOnly
						defaultValue={description}
					/>
				</Col>
			</Form.Group>

			<Form.Group
				as={Row}
				className="mb-3"
				controlId="formPlaintextPassword"
			>
				<Form.Label column sm="2">
					Image
				</Form.Label>
				<Col sm="10">
					<Image src={url} rounded fluid />
				</Col>
			</Form.Group>
		</Form>
	);
}
