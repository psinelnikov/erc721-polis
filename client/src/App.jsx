import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ViewAllNFTs from './pages/ViewAllNFTs';
import ViewNFT from './pages/ViewNFT';
import CreateNFT from './pages/CreateNFT';
import Header from './components/Header';
import Footer from './components/Footer';
import TokenMetadata from './components/TokenMetadata';
import axios from 'axios';
import { Oauth2Client, HttpClient } from '@metis.io/middleware-client';

import './App.css';

export default function App() {
	const [httpClient, setHttpClient] = useState(null);
	const [user, setUser] = useState(null);

	function getUrlVars() {
		var vars = [],
			hash;
		var hashes = window.location.href
			.slice(window.location.href.indexOf('?') + 1)
			.split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

	useEffect(() => {
		const fetchData = async () => {
			let accessToken;
			let refreshToken;
			let expiresIn;

			try {
				const code = getUrlVars()['code'];
				if (!code) {
					console.log('error code');
					return;
				}

				const res = await axios.get(
					`http://localhost.localdomain:8080/api/accesstoken?code=${code}`
				);

				console.log(res);
				if (res.status === 200 && res.data && res.data.code === 200) {
					accessToken = res.data.data.access_token;
					refreshToken = res.data.data.refresh_token;
					expiresIn = res.data.data.expires_in;

					setHttpClient(
						new HttpClient(
							process.env.REACT_APP_APP_ID,
							accessToken,
							refreshToken,
							expiresIn
						)
					);
					const oauth2Client = new Oauth2Client();
					setUser(await oauth2Client.getUserInfoAsync(accessToken));
				} else if (res.status === 200 && res.data) {
					console.log(res.data.msg);
				} else {
					console.log('code error');
					console.log(res);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return (
		<Router>
			<Header />
			<Container>
				<TokenMetadata httpClient={httpClient} user={user} />
				<Switch>
					<Route exact path="/">
						<ViewAllNFTs httpClient={httpClient} user={user} />
					</Route>
					<Route path="/view/:id">
						<ViewNFT httpClient={httpClient} user={user} />
					</Route>
					<Route path="/create">
						<CreateNFT httpClient={httpClient} user={user} />
					</Route>
				</Switch>
			</Container>
			<Footer />
		</Router>
	);
}
