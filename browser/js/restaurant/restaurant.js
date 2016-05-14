app.config(function ($stateProvider) {
    $stateProvider.state('restaurant', {
        url: '/',
        templateUrl: 'js/restaurant/restaurant.html',
        controller: 'RestaurantCtrl'
    });
});


app.controller('RestaurantCtrl', function ($scope, $state, RestaurantFactory) {

    $scope.findRest = function (restName) {
    	console.log("inside controller")
        $scope.error = null;
        $scope.results = null;
        $scope.maxCal = 10000;


        RestaurantFactory.findRestId(restName) 
        .then(function(restaurant){
        	console.log("result of findRestId:id ", restaurant._id);
        	console.log("result of findRestId:fields ", restaurant.fields);
        	RestaurantFactory.getMenuItems(restaurant._id)
        	.then(function(items){
        		console.log("result of getMenuItems: ", items);
        		$scope.restaurantName = restaurant.fields.name;
        		$scope.results = true;
        		$scope.menuItems = items.hits;
        	})
        })

    };

});


app.filter('calorieFilter', function(){
	console.log("insider app filter");
	// return function(item){
	// 	console.log(item);
	// 	return item.filter(function(i){
	// 		return i.fields.nf_calories <= maxCal;
	// 	});
	// };
	return function(items, maxCal){
		var filtered = [];
		for (var i=0; i<items.length; i++) {
			var item = items[i];
			if (item.fields.nf_calories <= maxCal) {
				filtered.push(item);
			}
		}
		return filtered;
	};

});