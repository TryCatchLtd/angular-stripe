angular.module("angular-stripe", []);

angular.module("angular-stripe").filter("expirymonth", function () {
    return function (input) {
        if (!input) {
            return "";
        }

        if(!isNaN(input) && input < 10 && input > 0) {
            return "0" + input;
        }

        return input;
    };
});

angular.module("angular-stripe").directive("creditcardNumber", function($window) {
    return {
        require: "ngModel",
        link: function(scope, element, attributes, controller) {
            controller.$parsers.unshift(function(viewValue) {
                if (!$window.hasOwnProperty("Stripe")) {
                    throw "Stripe.js has not been loaded.";
                }

                if (Stripe.card.validateCardNumber(viewValue)) {
                    controller.$setValidity("creditcard-number", true);
                    return viewValue;
                } else {
                    controller.$setValidity("creditcard-number", false);
                    return undefined;
                }
            });
        }
    };
});

angular.module("angular-stripe").directive("creditcardCvc", function($window) {
    return {
        require: "ngModel",
        link: function(scope, element, attributes, controller) {
            controller.$parsers.unshift(function(viewValue) {
                if (!$window.hasOwnProperty("Stripe")) {
                    throw "Stripe.js has not been loaded.";
                }

                if (Stripe.card.validateCVC(viewValue)) {
                    controller.$setValidity("creditcard-number", true);
                    return viewValue;
                } else {
                    controller.$setValidity("creditcard-number", false);
                    return undefined;
                }
            });
        }
    };
});
