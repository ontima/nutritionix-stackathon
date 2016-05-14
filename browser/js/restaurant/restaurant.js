app.config(function ($stateProvider) {
    $stateProvider.state('restaurant', {
        url: '/',
        templateUrl: 'js/restaurant/restaurant.html',
        controller: 'RestaurantCtrl'
    });
});


app.config(function ($stateProvider) {
    $stateProvider.state('item', {
        url: '/:id',
        templateUrl: 'js/restaurant/demo.html',
        controller: function($scope, label){
            $scope.label = label;
        },
        resolve: {
            label: function($stateParams, RestaurantFactory){
                return RestaurantFactory.getItemById($stateParams.id);
            }
        }
    });
});


app.controller('RestaurantCtrl', function ($scope, $state, RestaurantFactory) {

    $scope.findRest = function (restName) {
    	console.log("inside controller")
        $scope.error = null;
        $scope.results = null;

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
        		// RestaurantFactory.getYelp(restName)
        		// .then(function(yelpResults){
        		// 	console.log("yelpResults: ", yelpResults);
        		// })
        	})
        })

    };

//     $scope.maxCalFilter = function(maxCal){
//     	console.log("inside maxCalFilter");
//   //   	var filtered = [];
// 		// for (var i=0; i<$scope.menuItems.length; i++) {
// 		// 	var item = $scope.menuItems[i];
// 		// 	if (item.fields.nf_calories <= maxCal) {
// 		// 		filtered.push(item);
// 		// 	}
// 		// }
// 		// $scope.menuItems = filtered;
// 		// console.log("after filtering: ", filtered);
// 		// $scope.apply();
//     };

});


// app.filter('calorieFilter', function(){
// 	console.log("insider app filter");
// 	return function(item){
// 		console.log(item);
// 		return item.filter(function(i){
// 			return i.fields.nf_calories <= maxCal;
// 		});
// 	};
// 	// return function(items, maxCal){
// 	// 	var filtered = [];
// 	// 	for (var i=0; i<items.length; i++) {
// 	// 		var item = items[i];
// 	// 		if (item.fields.nf_calories <= maxCal) {
// 	// 			filtered.push(item);
// 	// 		}
// 	// 	}
// 	// 	return filtered;
// 	// };

// });