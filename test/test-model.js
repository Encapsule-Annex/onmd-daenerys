
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;

var uuid = require('node-uuid');
var onm = require('onm');

describe("onmd-daenerys data model tests", function() {
    var moduleExports = null;

    before(function() {
        moduleExports = require('../exports')
    });

    it("module.exports should be defined", function() {
        assert.isDefined(moduleExports);
        assert.isObject(moduleExports);
    });

    it("module.exports.daenerys should be defined", function() {
        assert.isDefined(moduleExports.daenerysDataModelDeclaration);
        assert.isObject(moduleExports.daenerysDataModelDeclaration);

    });

    describe("'daenerys' data model instantiation test", function() {
        var onmModel = null;

        before(function() {
            onmModel = new onm.Model(moduleExports.daenerysDataModelDeclaration);
            console.log(JSON.stringify(onmModel.implementation.objectModelDeclaration, undefined, 4));
            for (var schemaPath in onmModel.implementation.objectModelPathMap) {
                console.log(schemaPath);
            }
        });

        it("onm.Model should have been constructed without error", function() {
            assert.isDefined(onmModel);
        });


    });

});