import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UseFormInput from '../components/UseFormInput';
import { useHistory } from 'react-router-dom';

export default function CreateNFT({ httpClient, user }) {
	const history = useHistory();
	const [name, nameInput] = UseFormInput({
		type: 'text',
		placeholder: 'Enter name',
	});
	const [description, descriptionInput] = UseFormInput({
		as: 'textarea',
		placeholder: 'Enter description',
	});
	const [url, urlInput] = UseFormInput({
		type: 'text',
		placeholder: 'Enter image url',
	});

	const createNFT = async () => {
		const createdObject = {
			title: 'Asset Metadata',
			type: 'object',
			properties: {
				name: {
					type: 'string',
					description: name,
				},
				description: {
					type: 'string',
					description: description,
				},
				image: {
					type: 'string',
					description: url,
				},
			},
		};

		const result = await httpClient.sendTxAsync(
			process.env.REACT_APP_CONTRACT_NAME,
			parseInt(process.env.REACT_APP_CHAIN_ID),
			'claimToken',
			[user.eth_address, JSON.stringify(createdObject)]
		);

		if (result) {
			history.push('/');
		} else {
			console.log(result);
		}
	};

	return (
		<Form>
			<Form.Group className="mb-3" controlId="formGroupName">
				<Form.Label>Name</Form.Label>
				{nameInput}
			</Form.Group>
			<Form.Group className="mb-3" controlId="formGroupDescription">
				<Form.Label>Description</Form.Label>
				{descriptionInput}
			</Form.Group>
			<Form.Group className="mb-3" controlId="formGroupImageUrl">
				<Form.Label>Image URL</Form.Label>
				{urlInput}
			</Form.Group>
			<Button variant="primary" onClick={createNFT}>
				Submit
			</Button>
		</Form>
	);
}
