var keystone = require('keystone');

/**
 * List Recipe
 */

// Getting our recipe model
var Recipe = keystone.list('Recipe');

// Creating the API end point
exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	Recipe.model.find(function (err, items) {
		// Make sure we are handling errors
		if (err) return res.apiError('database error', err);
		res.apiResponse({
			// Filter recipe by
			recipe: items,
		});

		// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
		// This is handy if we want to speed up loading times once our recipe collection grows
	}).limit(Number(req.query.limit));
};
