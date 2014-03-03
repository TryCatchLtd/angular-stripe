var injector = angular.injector(['ng', 'angular-stripe']);

module("angular-stripe");

test("expirymonth", function () {
    var filter = injector.get('$filter');
    var expiryMonth = filter("expirymonth");

    equal(expiryMonth(null), "", "null should return empty string");
    equal(expiryMonth("not a number"), "not a number", "input not number should return input string");
    equal(expiryMonth(12), "12", "number input over 10 should return as is");
    equal(expiryMonth(3), "03", "number input under 10 should return with a padding of '0'");
});

test("creditcard-number", function () {
    var $scope = injector.get("$rootScope").$new();
    var $compile = injector.get("$compile");
    var element = angular.element('<form name="form"><input name="value" type="text" ng-model="value" creditcard-number /></form>');
    $compile(element)($scope);
    $scope.$digest();
    var form = $scope.form;

    form.value.$setViewValue("");
    equal($scope.value, undefined, "empty value is an invalid card number");

    form.value.$setViewValue("4242 4242 4242 4242");
    equal($scope.value, "4242 4242 4242 4242", "4242 4242 4242 4242 is a valid card number");

    form.value.$setViewValue("4242-1111-1111-1111");
    equal($scope.value, undefined, "4242-1111-1111-1111 is an invalid card number");

});

test("creditcard-cvc", function () {
    var $scope = injector.get("$rootScope").$new();
    var $compile = injector.get("$compile");
    var element = angular.element('<form name="form"><input name="value" type="text" ng-model="value" creditcard-cvc /></form>');
    $compile(element)($scope);
    $scope.$digest();
    var form = $scope.form;

    form.value.$setViewValue("");
    equal($scope.value, undefined, "empty value is an invalid cvc");

    form.value.$setViewValue("123");
    equal($scope.value, "123", "123 is a valid cvc number");

    form.value.$setViewValue("99");
    equal($scope.value, undefined, "99 is an invalid card number");

});
