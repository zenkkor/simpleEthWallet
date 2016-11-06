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
     * @return {[type]} [description]
     */
    function() {

      if ( msg.sender == owner || (isAllowedToSendFundsMapping[msg.sender] == true) ) {
        Deposit(msg.sender, msg.value);
      }
      else {
        throw;
      }

    }

    /**
     * Sends funds if balance is high enough
     * @param  {[type]} uint    [description]
     * @param  {[type]} address [description]
     * @return {[type]}         [description]
     */
    function sendFunds(uint amount, address receiver) returns (uint) {

      if (  msg.sender == owner || (isAllowedToSendFundsMapping[msg.sender] == true) )
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
     * @param  {[type]} address [description]
     * @return {[type]}         [description]
     */
    function allowAddressToSendMoney(address _address) {

      if ( msg.sender == owner ) {
        isAllowedToSendFundsMapping[_address] = true;
      }

    }

    /**
     * Dissalow address to send funds
     * @param  {[type]} address [description]
     * @return {[type]}         [description]
     */
    function disallowAddressToSendMoney(address _address) {

      if ( msg.sender == owner) {
        isAllowedToSendFundsMapping[_address] = false;
      }

    }

    /**
     * Return if is allowed to send funds
     * @param  {[type]}  address [description]
     * @return {Boolean}         [description]
     */
    function isAllowedToSend(address _address) constant returns (bool) {
      return isAllowedToSendFundsMapping[_address] || (msg.sender == owner);
    }

    /**
     * Kills the wallet, yo.
     * Only allows this for the owner
     * @return {[type]} [description]
     */
    function killWallet() {
      if ( msg.sender == owner )
        suicide(owner);
    }



}
