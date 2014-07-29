
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

    describe("Build a very simple dragon egg object", function() {
        var namespace = null;

        before(function() {
            var rootAddress = daenerysModel.createRootAddress();
            var newDragonEggAddress = rootAddress.createSubpathAddress("dragonEggs.dragonEgg");
            namespace = daenerysStore.createComponent(newDragonEggAddress);
            namespaceData = namespace.data();
            namespaceData.jsonTag = "testSimple";
            namespaceData.____label = "Simple Test";
            namespaceData.____description = "This is a simple test data model compiled with the Daenerys data model and pyre data model transform.";
            console.log(daenerysStore.toJSON(undefined,4));
        });

        describe("Transform the simple dragon egg object into an onm data model", function() {
            var compiledDataModel = null;
            before(function() {
                compiledDataModel = moduleExports.pyre.compileDragonEgg(daenerysStore, namespace.getResolvedAddress());
                console.log(JSON.stringify(compiledDataModel, undefined, 4));
            });
            it("The transform should have returned an object", function() {
                assert.isObject(compiledDataModel);
            });
            it("We should be able to initialize a new onm.Model with the returned object", function() {
                assert.isObject(new onm.Model(compiledDataModel));
            });
        });

    });

    describe("Build a complicated dragon egg object", function() {

        var namespace = null;

        before(function() {
            var rootAddress = daenerysModel.createRootAddress();
            var newDragonEggAddress = rootAddress.createSubpathAddress("dragonEggs.dragonEgg");
            namespace = daenerysStore.createComponent(newDragonEggAddress);
            namespaceData = namespace.data();
            namespaceData.jsonTag = "testComplex";
            namespaceData.____label = "Complex Test";
            namespaceData.____description = "This is a complex test data model compiled with the Daenerys data model and pyre data model transform.";

            var eggRootAddress = namespace.getResolvedAddress();

            var semanticBindingsAddress = eggRootAddress.createSubpathAddress("semanticBindings");
            var semanticBindingsNamespace = daenerysStore.openNamespace(semanticBindingsAddress);
            var semanticBindingsData = semanticBindingsNamespace.data();
            semanticBindingsData.componentKeyGenerator = "internalUuid";
            semanticBindingsData.namespaceVersioning = "internalAdvanced";

            console.log(daenerysStore.toJSON(undefined,4));
        });

        describe("Transform the complex dragon egg object into an onm data model", function() {
            var compiledDataModel = null;
            before(function() {
                compiledDataModel = moduleExports.pyre.compileDragonEgg(daenerysStore, namespace.getResolvedAddress());
                console.log(JSON.stringify(compiledDataModel, undefined, 4));
            });
            it("The transform should have returned an object", function() {
                assert.isObject(compiledDataModel);
            });
            it("We should be able to initialize a new onm.Model with the returned object", function() {
                assert.isObject(new onm.Model(compiledDataModel));
            });
        });


    });


});