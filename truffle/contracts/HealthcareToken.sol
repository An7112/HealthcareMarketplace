pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract HealthcareToken is ERC20 {
    using SafeMath for uint256;

    constructor() ERC20("HealthcareMarket Token", "HCMA") {
        uint256 initialSupply = 100000000000000000000;
        _mint(msg.sender, initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function buyToken() public payable {
        require(msg.value > 0, "Amount should be greater than zero.");
        uint256 tokenAmount = msg.value;
        _mint(msg.sender, tokenAmount);
    }

    function withdraw(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance.");
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }
}
