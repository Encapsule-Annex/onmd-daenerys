
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;

var uuid = require('node-uuid');
var onm = require('onm');

describe("onmd-onmd data model tests", function() {
    var modelDeclarationModuleExports = null;

    before(function() {
        modelDeclarationModuleExports = require('../exports');
    });

    it("module.exports should be defined", function() {
        assert.isDefined(modelDeclarationModuleExports);
        assert.isObject(modelDeclarationModuleExports);
    });

    it("module.exports.daenerys should be defined", function() {
        assert.isDefined(modelDeclarationModuleExports.daenerys);
        assert.isObject(modelDeclarationModuleExports.daenerys);

    });

    describe("'daenerys' data model instantiation test", function() {
        var onmModel = null

        before(function() {
            onmModel = new onm.Model(modelDeclarationModuleExports.daenerys);
        });

        it("onm.Model should have been constructed without error", function() {
            assert.isDefined(onmModel);
        });


    });

});