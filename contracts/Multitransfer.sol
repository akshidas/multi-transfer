// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface CustomToken {
    function transfer(address to, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract Multitransfer {
    event TokensTransferred(address indexed recipient, uint256 amount);

    function sendTokenToMultiple(
        address _tokenAddress,
        address[] memory _recipients,
        uint256[] memory _amounts
    ) external {
        CustomToken customToken = CustomToken(_tokenAddress);

        require(
            _recipients.length > 0 && _recipients.length == _amounts.length,
            "Invalid inputs"
        );
        uint totalAmountToSend = 0;
        for (uint256 i = 0; i < _recipients.length; i++) {
            totalAmountToSend += _amounts[i];
        }

        require(
            customToken.balanceOf(msg.sender) >= totalAmountToSend,
            "Insufficient funds"
        );
        for (uint256 i = 0; i < _recipients.length; i++) {
            require(
                customToken.transferFrom(
                    msg.sender,
                    _recipients[i],
                    _amounts[i]
                ),
                "Token transfer failed"
            );
            emit TokensTransferred(_recipients[i], _amounts[i]);
        }
    }
}
