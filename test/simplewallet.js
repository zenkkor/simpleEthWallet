/**
 * Test for the simple wallet
 */

contract('SimpleWallet', function(accounts){

  it('the owner is allowed to send funds', function(){
    var myContract = SimpleWallet.deployed();

    return myContract.isAllowedToSend.call(accounts[0]).then(function(isAllowed){
      assert.equal(isAllowed, true, 'the owner should have been allowed to send funds');
    });

  });


  it('the other account should not be allowed to send funds', function(){

    var myContract = SimpleWallet.deployed();

    return myContract.isAllowedToSend.call(accounts[2]).then(function(isAllowed){
      assert.equal(isAllowed, false, 'The other account is allowed to send');
    });
  });

});
