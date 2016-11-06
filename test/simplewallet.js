/**
 * Test for the simple wallet
 */

contract('SimpleWallet', function(accounts){

  it('the owner is allowed to send funds', function(){
    var myContract = SimpleWallet.deployed();

    return myContract.isAllowedToSend.call(accounts[0]).then(function(isAllowed){
      assert(isAllowed, true, 'the owner should have been allowed to send funds');
    });

  });

});
