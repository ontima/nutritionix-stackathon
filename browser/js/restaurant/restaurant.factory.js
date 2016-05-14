app.factory('RestaurantFactory', function($http){

	var RestaurantFactory = {};
	//var Yelp = require('yelp');

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

	RestaurantFactory.getItemById = function(id){
		console.log("inside getItemById: ", id);
		var searchUrl = "https://api.nutritionix.com/v1_1/item?id=" + id + "&appId=28a1636f&appKey=cbcc547b50b346b4fd16ae047a872b72"
		return $http.get(searchUrl)
		.then(function(item){
			console.log("item details: ", item.data);
			return item.data;
		})
	};

	// RestaurantFactory.getYelp = function(restName) {
	// 	var yelp = new Yelp({
	// 		consumer_key: 'aO1l0AIstqjAzPGT4X51VA',
	// 		consumer_secret: 'G_LzgSIWVS0FMQSIFMahsQKHjPk',
	// 		token: 's1A-6RE70Dbci9f8j97m-vICCIg2FVE8',
	// 		token_secret: 'WW90RdfjdO5RFopG1V2KL0xMABw',
	// 	});
	// 	yelp.search({ term: 'Starbucks' })
	// 	.then(function (data) {
	// 	  console.log("yelp data: ", data);
	// 	})
	// 	.catch(function (err) {
	// 	  console.error(err);
	// 	});
	// }

	return RestaurantFactory;

});




//search by brand name
//curl -v  -X GET "https://api.nutritionix.com/v1_1/brand/search?query=five+guys&min_score=1&appId=28a1636f&appKey=cbcc547b50b346b4fd16ae047a872b72"


//get all menu items for a brand
//curl -v  -X GET "https://api.nutritionix.com/v1_1/search/?brand_id=513fbc1283aa2dc80c000026&fields=item_name%2Cnf_calories&appId=28a1636f&appKey=cbcc547b50b346b4fd16ae047a872b72"
//curl -v  -X GET "https://api.nutritionix.com/v1_1/search/?brand_id=513fbc1283aa2dc80c000026&fields=*&appId=28a1636f&appKey=cbcc547b50b346b4fd16ae047a872b72"