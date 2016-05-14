app.factory('RestaurantFactory', function($http){

	var RestaurantFactory = {};

	RestaurantFactory.findRestId = function(restName){
		var searchUrl = "https://api.nutritionix.com/v1_1/brand/search?query=" + restName + "&min_score=1&appId=28a1636f&appKey=cbcc547b50b346b4fd16ae047a872b72";
		console.log("searchUrl: ", searchUrl);
		return $http.get(searchUrl)
		//return $http.get("https://api.nutritionix.com/v1_1/brand/search?query=five+guys&min_score=1&appId=28a1636f&appKey=cbcc547b50b346b4fd16ae047a872b72")
		.then(function(restaurants){
			console.log(restaurants.data.hits[0]);
			return restaurants.data.hits[0];
		})
	};

	RestaurantFactory.getMenuItems = function(id){
		var searchUrl = "https://api.nutritionix.com/v1_1/search/?brand_id=" + id + "&fields=item_name%2Cnf_calories&appId=28a1636f&appKey=cbcc547b50b346b4fd16ae047a872b72"
		return $http.get(searchUrl)
		.then(function(items){
			console.log("menu items: ", items.data);
			return items.data;
		})
	};

	return RestaurantFactory;

});




//search by brand name
//curl -v  -X GET "https://api.nutritionix.com/v1_1/brand/search?query=five+guys&min_score=1&appId=28a1636f&appKey=cbcc547b50b346b4fd16ae047a872b72"


//get all menu items for a brand
//curl -v  -X GET "https://api.nutritionix.com/v1_1/search/?brand_id=513fbc1283aa2dc80c000026&fields=item_name%2Cnf_calories&appId=28a1636f&appKey=cbcc547b50b346b4fd16ae047a872b72"
//curl -v  -X GET "https://api.nutritionix.com/v1_1/search/?brand_id=513fbc1283aa2dc80c000026&fields=*&appId=28a1636f&appKey=cbcc547b50b346b4fd16ae047a872b72"