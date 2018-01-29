'use strict';

var expect = require( 'chai' ).expect;
var LambdaTester = require( 'lambda-tester' );
var geoCodeApi = require( '../handler' ).getGeocode;

describe('geocodeapi', function() {
    it( 'test success', function() {
		return LambdaTester( geoCodeApi )
			.event({"queryStringParameters": {
				"address": "10 Fedex parkway, Collierville, TN"
			}})
			.expectResult((result ) => {
				console.log(result.body )
				expect(result.body.indexOf("errorDescription")).to.equal(-1);
                expect( result.body.length).to.be.above(0);

            });
	});

	it ('test failure', function() {
		return LambdaTester( geoCodeApi )
			.event({"queryStringParameters": {
				"address": ""
			}})
			.expectResult((result ) => {
				console.log ("Result" + result.body)
				expect(result.body.indexOf("errorDescription")).to.not.equal(-1);
                expect( result.body.length).to.be.above(0);

            });		
	})
})

