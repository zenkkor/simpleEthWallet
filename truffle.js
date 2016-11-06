module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "bower_components/angular/angular.js",
      "bower_components/angular-route/angular-route.js",
      "javascripts/app.js",
      "apps/dashboard/controllers/dashboard.js",
      "apps/events/controllers/events.js",
      "apps/funds/controllers/funds.js",
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/",
    "apps/": "apps/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
