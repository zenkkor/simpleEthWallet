/*global angular*/
var app = angular.module('simpleEthWallet');

app.controller("DashboardCtrl", function($scope) {

	var contract = SimpleWallet.deployed();

    $scope.balance = web3.eth.getBalance(contract.address).toNumber();
	$scope.balanceInEther = web3.fromWei($scope.balance, "ether");

});
