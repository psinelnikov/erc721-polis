import React from 'react';

export default function Footer() {
	return (
		<footer className="p-4 text-center">
			<div>
				Page Layout and Functionality created by{' '}
				<a href="https://github.com/pavelsinelnikov">
					Pavel Sinelnikov
				</a>
			</div>
			<div>
				Used{' '}
				<a href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721">
					OpenZeppelin's ERC-721 Smart Contract Implementation
				</a>
			</div>
		</footer>
	);
}
