/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'online-test',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
 
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true

       //ENV.GOURL='http://ec2-54-218-55-72.us-west-2.compute.amazonaws.com:8086';
  //ENV.GOURL= 'https://rpqb-onlinetest-rest.herokuapp.com'
       ENV.GOURL='http://localhost:8084';

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
      //ENV.GOURL= 'https://rpqb-onlinetest-rest.herokuapp.com'

	  ENV.GOURL= 'https://onlinetestgo.herokuapp.com'

	  //ENV.GOURL= 'https://onlinetest11.mybluemix.net'

  }

  return ENV;
};