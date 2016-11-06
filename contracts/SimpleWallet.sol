pragma solidity ^0.4.2;

contract SimpleWallet {

    address owner;
    mapping(address => bool) isAllowedToSendFundsMapping;

    event Deposit(address _sender, uint amount);
    event Withdraw(address _sender, uint amount, address _beneficiary);

    /**
     * Constructor
     */
    function SimpleWallet() {
      owner = msg.sender;
    }

    /**
     * Anonymous function for when contract recieves funds or is called
     * without any funds and without function
     */
    function() payable {

      if ( hasWalletPermission() ) {
        Deposit(msg.sender, msg.value);
      }
      else {
        throw;
      }

    }

    /**
     * Sends funds if balance is high enough
     * @param amount The amount that is to be sent
     * @param receiver The receiving account
     * @return uint balance
     */
    function sendFunds(uint amount, address receiver) returns (uint) {

      if ( hasWalletPermission() )
      {

        if ( this.balance >= amount )
        {
          if ( !receiver.send(amount) ) {
            throw;
          }

          Withdraw(msg.sender, amount, receiver);
          return this.balance;
        }

      }

    }

    /**
     * Add new address to send funds mapping
     * @param _address The address that is allowed to send money from the wallet
     */
    function allowAddressToSendMoney(address _address) {

      if ( msg.sender == owner ) {
        isAllowedToSendFundsMapping[_address] = true;
      }

    }

    /**
     * Dissalow address to send funds
     * @param _address the address that is !allowed to send money from the wallet
     */
    function disallowAddressToSendMoney(address _address) {

      if ( msg.sender == owner) {
        isAllowedToSendFundsMapping[_address] = false;
      }

    }

    /**
     * Just a helper function
     * @return {Boolean}
     */
    function hasWalletPermission() private returns (bool){
      return (msg.sender == owner || (isAllowedToSendFundsMapping[msg.sender] == true));
    }

    /**
     * Return if is allowed to send funds
     * @param _address the address that needs the state allowed/dissal
     * @return {Boolean}
     */
    function isAllowedToSend(address _address) constant returns (bool) {
      return isAllowedToSendFundsMapping[_address] || (_address == owner);
    }

    /**
     * Kills the wallet, yo.
     * Only allows this for the owner
     */
    function killWallet() {
      if ( msg.sender == owner )
        suicide(owner);
    }



}
