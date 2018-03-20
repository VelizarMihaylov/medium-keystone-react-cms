// We will need to require Keystone first
var keystone = require('keystone');
// Then to get access to our API route we will use importer
var importRoutes = keystone.importer(__dirname);
// And finally set up the api on a route
var routes = {
	api: importRoutes('./api'),
};

// Export our app routes
exports = module.exports = function (app) {
	// Get access to the API route in our app
	app.get('/api/recipe/', keystone.middleware.api, routes.api.recipe.list);
	// Set up the default app route to  http://localhost:3000/index.html
	app.get('/index.html', function (req, res) {
		// Render some simple boilerplate html
		function renderFullPage () {
			// Note the div class name here, we will use that as a hook for our React code
			return `
		<!doctype html>
		<html>
			<head>
				<title>Keystone With React And Redux</title>
			</head>
      <body>
        <div class="react-container">
        </div>
				<script src="bundle.js"></script>
			</body>
		</html>
		`;
		}
		// Send the html boilerplate
		res.send(renderFullPage());
	});
};
