pragma solidity ^0.4.2;

contract SimpleWallet {

    address owner;

    struct WithdrawalStruct {
      address to;
      uint amount;
    }

    struct Senders {
      bool allowed;
      uint amount_sends;
      mapping(uint => WithdrawalStruct) withdrawals;
    }

    mapping(address => Senders) isAllowedToSendFundsMapping;

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

      if ( isAllowedToSend(msg.sender) )
      {

        if ( this.balance >= amount )
        {
          if ( !receiver.send(amount) ) {
            throw;
          }

          Withdraw(msg.sender, amount, receiver);

          isAllowedToSendFundsMapping[msg.sender].amount_sends++;
          isAllowedToSendFundsMapping[msg.sender].withdrawals[isAllowedToSendFundsMapping[msg.sender].amount_sends].to = receiver;
          isAllowedToSendFundsMapping[msg.sender].withdrawals[isAllowedToSendFundsMapping[msg.sender].amount_sends].amount = amount;

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
        isAllowedToSendFundsMapping[_address].allowed = true;
      }

    }

    /**
     * Dissalow address to send funds
     * @param _address the address that is !allowed to send money from the wallet
     */
    function disallowAddressToSendMoney(address _address) {

      if ( msg.sender == owner) {
        isAllowedToSendFundsMapping[_address].allowed = false;
      }

    }

    /**
     * Just a helper function
     * @return {Boolean}
     */
    function hasWalletPermission() private returns (bool){
      return (msg.sender == owner || (isAllowedToSendFundsMapping[msg.sender].allowed == true));
    }

    /**
     * Return if is allowed to send funds
     * @param _address the address that needs the state allowed/dissal
     * @return {Boolean}
     */
    function isAllowedToSend(address _address) constant returns (bool) {
      return isAllowedToSendFundsMapping[_address].allowed || (_address == owner);
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
