/*global angular*/
var app = angular.module('simpleEthWallet');

app.controller("FundsCtrl", function($scope) {

    $scope.accounts = web3.eth.accounts;

	/**
	 * Deposit funds
	 * @return
	 */
	$scope.depositFunds = function(address, amount) {
		var contract = SimpleWallet.deployed();

		console.log()

		// Deposit Ether
        web3.eth.sendTransaction({
            from: address.trim(),
            to: contract.address,
            value: web3.toWei(amount, "ether")
        },
		function(error, result){
			if ( error )
			{
				$scope.has_errors = "Whoops, deposit failed.";
			}
			else
			{
				$scope.transfer_success = true;
			}
			$scope.$apply();
		});
	}
});
