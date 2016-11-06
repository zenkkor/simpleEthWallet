/*global angular*/
var app = angular.module('simpleEthWallet');

app.controller("DashboardCtrl", function($scope) {

	var contract = SimpleWallet.deployed();

    $scope.balance = web3.eth.getBalance(contract.address).toNumber();
	$scope.balanceInEther = web3.fromWei($scope.balance, "ether");

	$scope.withdrawals = [];

	contract.getAmountOfWithdrawals.call(web3.eth.accounts[0]).then(function(results){
		var numberOfWithdrawals = results.toNumber();

		for (var i = 0; i <= numberOfWithdrawals; i++)
		{
			contract.getWithdrawalForAddress.call(web3.eth.accounts[0], i).then(function(result_withdrawal){
				result_withdrawal[1] = web3.fromWei(result_withdrawal[1].toNumber(), "ether");
				$scope.withdrawals.push(result_withdrawal);
				$scope.$apply();
			});
		}

		return this;
	});

});
