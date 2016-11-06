/**
 * Test for the simple wallet
 */

contract('SimpleWallet', function(accounts) {

    it('the owner is allowed to send funds', function() {
        var myContract = SimpleWallet.deployed();

        return myContract.isAllowedToSend.call(accounts[0]).then(function(isAllowed) {
            assert.equal(isAllowed, true, 'the owner should have been allowed to send funds');
        });

    });


    it('the other account should not be allowed to send funds', function() {

        var myContract = SimpleWallet.deployed();

        return myContract.isAllowedToSend.call(accounts[2]).then(function(isAllowed) {
            assert.equal(isAllowed, false, 'The other account is allowed to send');
        });
    });

    it('adding accounts to the allowed list', function() {

        var myContract = SimpleWallet.deployed();

        return myContract.isAllowedToSend.call(accounts[1]).then(function(isAllowed) {
            assert.equal(isAllowed, false, 'The other account is allowed to send');
        }).then(function() {
            myContract.allowAddressToSendMoney(accounts[1]);
        }).then(function() {
            return myContract.isAllowedToSend.call(accounts[1]);
        }).then(function(isAllowed) {
            assert.equal(true, isAllowed, 'The other account was not allowed to send');
        }).then(function() {
            myContract.disallowAddressToSendMoney(accounts[1]);
        }).then(function() {
            return myContract.isAllowedToSend.call(accounts[1]);
        }).then(function(isAllowed) {
            assert.equal(false, isAllowed, 'The other account was allowed to send');
        })
    });

    it('should check Deposit Events', function(done) {

        var meta = SimpleWallet.deployed();
        var event = meta.allEvents();

        event.watch(function(error, result) {
            if (error) {
                console.err(error);
            } else {
                // Check if the events are correct
                assert.equal(result.event, "Deposit");
                assert.equal(web3.fromWei(result.args.amount.valueOf(), "ether"), 1);
                assert.equal(result.args._sender.valueOf(), web3.eth.accounts[0]);
                event.stopWatching();
                done();
            }
        });

        // Send some ether
        web3.eth.sendTransaction({
            from: web3.eth.accounts[0],
            to: meta.address,
            value: web3.toWei(1, "ether")
        });

    });

    it('should check not allowed Deposit Events', function(done) {

        var meta = SimpleWallet.deployed();

        web3.eth.sendTransaction({
            from: web3.eth.accounts[0],
            to: meta.address,
            value: web3.toWei(1, "ether")
        }, function(error, result) {
            if (error) {
                done(result);
            } else {
                done();
            }
        })

    });

});
