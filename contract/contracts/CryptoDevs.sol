// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CryptoDevs is ERC721 {
	uint256 private _tokenLimit;
	uint256 private _tokenIds;

	constructor(
		string memory name,
		string memory symbol,
		uint256 tokenLimit
	) ERC721(name, symbol) {
		_tokenLimit = tokenLimit;
	}

	function claimToken(address claimer, string memory tokenURI)
		public
		returns (uint256)
	{
		require(_tokenIds < _tokenLimit, "All tokens have been claimed");
		_mint(claimer, _tokenIds);
		_setTokenURI(_tokenIds, tokenURI);

		_tokenIds++;

		return _tokenIds;
	}
}
