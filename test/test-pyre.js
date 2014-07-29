
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;

var uuid = require('node-uuid');
var onm = require('onm');
var moduleExports = require('../exports');

describe("onmd-daenerys 'pyre' compiler tests", function() {

    var daenerysModel = null;
    var daenerysStore = null;

    before(function() {
        daenerysModel = new onm.Model(moduleExports.daenerysDataModelDeclaration);
        daenerysStore = new onm.Store(daenerysModel);
    });

    it("Daenerys onm.Store should be initialized", function() {
        assert.isDefined(daenerysModel);
        assert.isDefined(daenerysStore);
    });

});