/*global angular*/
var app = angular.module('simpleEthWallet');

app.controller("FundsCtrl", function($scope) {

	$scope.accounts = web3.eth.accounts;

	/**
	 * Deposit funds
	 * @param address
	 * @param amount
	 */
	$scope.depositFunds = function(address, amount) {
		var contract = SimpleWallet.deployed();

		// Deposit Ether
		web3.eth.sendTransaction({
				from: address.trim(),
				to: contract.address,
				value: web3.toWei(amount, "ether")
			},
			function(error, result) {
				if (error) {
					$scope.has_errors = "Whoops, deposit failed.";
				} else {
					$scope.transfer_success = true;
				}
				$scope.$apply();
			});
	}

	/**
	 * Withdraw funds
	 * @param address
	 * @param amount
	 */
	$scope.withdrawFunds = function(address, amount) {
		var contract = SimpleWallet.deployed();

		var send_json = {
			from: web3.eth.accounts[0]
		};

		contract.sendFunds(amount, address, send_json).then(function(newBalance) {
				$scope.transfer_success_withdraw = true;
				$scope.$apply();
			},
			function(errors) {
				$scope.has_errors_withdraw = errors
				$scope.$apply();
			});
	}
});
