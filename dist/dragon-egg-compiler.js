
/*
------------------------------------------------------------------------------

The MIT License (MIT)

Copyright (c) 2013 Encapsule Project
  
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

**** Encapsule Project :: Build better software with circuit models ****

OPEN SOURCES: http://github.com/Encapsule HOMEPAGE: http://Encapsule.org
BLOG: http://blog.encapsule.org TWITTER: https://twitter.com/Encapsule

------------------------------------------------------------------------------


------------------------------------------------------------------------------
 */

(function() {
  var ONMjs, namespaceEncapsule;

  namespaceEncapsule = (typeof Encapsule !== "undefined" && Encapsule !== null) && Encapsule || (this.Encapsule = {});

  Encapsule.code = (Encapsule.code != null) && Encapsule.code || (this.Encapsule.code = {});

  Encapsule.code.lib = (Encapsule.code.lib != null) && Encapsule.code.lib || (this.Encapsule.code.lib = {});

  Encapsule.code.lib.onm = (Encapsule.code.lib.onm != null) && Encapsule.code.lib.onm || (this.Encapsule.code.lib.onm = {});

  ONMjs = Encapsule.code.lib.onm;

  Encapsule.app = (Encapsule.app != null) && Encapsule.app || (this.Encapsule.app = {});

  Encapsule.app.lib = (Encapsule.app.lib != null) && Encapsule.app.lib || (this.Encapsule.app.lib = {});

  Encapsule.app.lib.DragonEggCompiler = (function() {
    function DragonEggCompiler(backchannel_, callback_) {
      var compile, compileComponent, copyProperty, exception;
      try {
        this.backchannel = (backchannel_ != null) && backchannel_ || (function() {
          throw "Missing required backchannel input parameter.";
        })();
        this.callback = (callback_ != null) && callback_ || (function() {
          throw "Missing required callback input parameter.";
        })();
        this.title = "Data Model";
        this.selectedDragonEggAddress = void 0;
        this.jsonTag = ko.observable("<no selection>");
        this.label = ko.observable("");
        this.description = ko.observable("");
        this.dataModelCompiled = ko.observable(false);
        this.dataModelDeclarationObject = void 0;
        this.dataModelDeclarationJSON = ko.observable("<no selection>");
        this.saveJSONAsLinkHtml = ko.computed((function(_this) {
          return function() {
            var html;
            return html = "<a href=\"data:text/json;base64," + (window.btoa(_this.dataModelDeclarationJSON())) + "\" target=\"_blank\" title=\"Open raw JSON in new tab...\"> \n<img src=\"./img/json_file-48x48.png\" style=\"width: 24px; heigh: 24px; border: 0px solid black; vertical-align: middle;\" ></a>";
          };
        })(this));
        copyProperty = function(propertyName_, dataReferenceSource_, dataReferenceDestination_) {
          var exception;
          try {
            return dataReferenceDestination_[propertyName_] = dataReferenceSource_[propertyName_];
          } catch (_error) {
            exception = _error;
            throw "failed to copy property " + propertyName_;
          }
        };
        compileComponent = (function(_this) {
          return function(store_, address_, parentDataReference_) {
            var componentNamespace, exception, immutablePropertiesAddress, immutablePropertiesNamespace, inputData, metaPropertiesAddress, metaPropertiesNamespace, mutablePropertiesAddress, mutablePropertiesNamespace, namespacesAddress, namespacesNamespace, outputData;
            try {
              componentNamespace = store_.openNamespace(address_);
              inputData = componentNamespace.data();
              outputData = parentDataReference_;
              copyProperty("jsonTag", inputData, outputData);
              copyProperty("namespaceType", inputData, outputData);
              copyProperty("____label", inputData, outputData);
              copyProperty("____description", inputData, outputData);
              metaPropertiesAddress = address_.createSubpathAddress("metaProperties");
              metaPropertiesNamespace = store_.openNamespace(metaPropertiesAddress);
              metaPropertiesNamespace.visitExtensionPointSubcomponents(function(subcomponentAddress_) {
                var subcomponentData, subcomponentNamespace;
                subcomponentNamespace = store_.openNamespace(subcomponentAddress_);
                subcomponentData = subcomponentNamespace.data();
                if ((subcomponentData.jsonTag != null) && subcomponentData.jsonTag) {
                  outputData[subcomponentData.jsonTag] = subcomponentData.value;
                }
                return true;
              });
              if (!(inputData.namespaceType === "extensionPoint")) {
                immutablePropertiesAddress = address_.createSubpathAddress("properties.userImmutable");
                immutablePropertiesNamespace = store_.openNamespace(immutablePropertiesAddress);
                immutablePropertiesNamespace.visitExtensionPointSubcomponents(function(immutablePropertyAddress_) {
                  var immutableProperties, immutablePropertyData, immutablePropertyNamespace, namespaceProperties, propertyReference;
                  immutablePropertyNamespace = store_.openNamespace(immutablePropertyAddress_);
                  immutablePropertyData = immutablePropertyNamespace.data();
                  if ((immutablePropertyData.jsonTag != null) && immutablePropertyData.jsonTag) {
                    namespaceProperties = (outputData.namespaceProperties != null) && outputData.namespaceProperties || (outputData.namespaceProperties = {});
                    immutableProperties = (namespaceProperties.userImmutable != null) && namespaceProperties.userImmutable || (namespaceProperties.userImmutable = {});
                    propertyReference = immutableProperties[immutablePropertyData.jsonTag] = {};
                    propertyReference.defaultValue = immutablePropertyData.value;
                    copyProperty("____type", immutablePropertyData, propertyReference);
                    copyProperty("____description", immutablePropertyData, propertyReference);
                    metaPropertiesAddress = immutablePropertyAddress_.createSubpathAddress("metaProperties");
                    metaPropertiesNamespace = store_.openNamespace(metaPropertiesAddress);
                    return metaPropertiesNamespace.visitExtensionPointSubcomponents(function(metaPropertyAddress_) {
                      var metaPropertyData, metaPropertyNamespace;
                      metaPropertyNamespace = store_.openNamespace(metaPropertyAddress_);
                      metaPropertyData = metaPropertyNamespace.data();
                      if ((metaPropertyData.jsonTag != null) && metaPropertyData.jsonTag) {
                        return propertyReference[metaPropertyData.jsonTag] = metaPropertyData.value;
                      }
                    });
                  }
                });
                mutablePropertiesAddress = address_.createSubpathAddress("properties.userMutable");
                mutablePropertiesNamespace = store_.openNamespace(mutablePropertiesAddress);
                mutablePropertiesNamespace.visitExtensionPointSubcomponents(function(mutablePropertyAddress_) {
                  var mutableProperties, mutablePropertyData, mutablePropertyNamespace, namespaceProperties, propertyReference;
                  mutablePropertyNamespace = store_.openNamespace(mutablePropertyAddress_);
                  mutablePropertyData = mutablePropertyNamespace.data();
                  if ((mutablePropertyData.jsonTag != null) && mutablePropertyData.jsonTag) {
                    namespaceProperties = (outputData.namespaceProperties != null) && outputData.namespaceProperties || (outputData.namespaceProperties = {});
                    mutableProperties = (namespaceProperties.userMutable != null) && namespaceProperties.userMutable || (namespaceProperties.userMutable = {});
                    propertyReference = mutableProperties[mutablePropertyData.jsonTag] = {};
                    propertyReference.defaultValue = mutablePropertyData.value;
                    copyProperty("____type", mutablePropertyData, propertyReference);
                    copyProperty("____description", mutablePropertyData, propertyReference);
                    metaPropertiesAddress = mutablePropertyAddress_.createSubpathAddress("metaProperties");
                    metaPropertiesNamespace = store_.openNamespace(metaPropertiesAddress);
                    return metaPropertiesNamespace.visitExtensionPointSubcomponents(function(metaPropertyAddress_) {
                      var metaPropertyData, metaPropertyNamespace;
                      metaPropertyNamespace = store_.openNamespace(metaPropertyAddress_);
                      metaPropertyData = metaPropertyNamespace.data();
                      if ((metaPropertyData.jsonTag != null) && metaPropertyData.jsonTag) {
                        return propertyReference[metaPropertyData.jsonTag] = metaPropertyData.value;
                      }
                    });
                  }
                });
              }
              namespacesAddress = address_.createSubpathAddress("namespaces");
              namespacesNamespace = store_.openNamespace(namespacesAddress);
              namespacesNamespace.visitExtensionPointSubcomponents(function(subnamespaceAddress_) {
                var namespaceDeclaration, subNamespacesData, subnamespaceData, subnamespaceNamespace;
                subNamespacesData = (outputData.subNamespaces != null) && outputData.subNamespaces && outputData.subNamespaces.length && outputData.subNamespaces || (outputData.subNamespaces = []);
                subnamespaceNamespace = store_.openNamespace(subnamespaceAddress_);
                subnamespaceData = subnamespaceNamespace.data();
                switch (subnamespaceData.namespaceType) {
                  case "child":
                    namespaceDeclaration = {};
                    compileComponent(store_, subnamespaceAddress_, namespaceDeclaration);
                    subNamespacesData.push(namespaceDeclaration);
                    break;
                  case "extensionPoint":
                    namespaceDeclaration = {};
                    compileComponent(store_, subnamespaceAddress_, namespaceDeclaration);
                    subNamespacesData.push(namespaceDeclaration);
                    break;
                  case "component":
                    namespaceDeclaration = {};
                    compileComponent(store_, subnamespaceAddress_, namespaceDeclaration);
                    outputData.componentArchetype = namespaceDeclaration;
                    break;
                  default:
                    break;
                }
                return true;
              });
              copyProperty("semanticBindings", inputData, outputData);
              return true;
            } catch (_error) {
              exception = _error;
              throw "Encapsule.app.lib.DragonEggCompiler.compileComponent failure: " + exception;
            }
          };
        })(this);
        compile = (function(_this) {
          return function(store_, address_) {
            var exception, resultJSON;
            try {
              _this.dataModelDeclarationObject = {};
              _this.dataModelDeclarationJSON("");
              compileComponent(store_, address_, _this.dataModelDeclarationObject);
              resultJSON = JSON.stringify(_this.dataModelDeclarationObject, void 0, 2);
              if (!((resultJSON != null) && resultJSON)) {
                throw "Cannot serialize Javascript object to JSON!";
              }
              _this.dataModelDeclarationJSON(resultJSON);
              return true;
            } catch (_error) {
              exception = _error;
              throw "Encapsule.app.lib.DragonEggCompiler.compile failure: " + exception;
            }
          };
        })(this);
        this.dragonEggStoreAddressObserverInterface = {
          onComponentUpdated: (function(_this) {
            return function(store_, observerId_, address_) {
              var candidateAddress, exception, lastAddress, namespaceData, selectedAddress;
              try {
                candidateAddress = store_.getAddress();
                selectedAddress = void 0;
                if (candidateAddress.getModel().jsonTag === "dragonEgg") {
                  selectedAddress = candidateAddress;
                } else {
                  candidateAddress.visitParentAddressesDescending(function(parentAddress_) {
                    if (parentAddress_.getModel().jsonTag === "dragonEgg") {
                      return selectedAddress = parentAddress_;
                    }
                  });
                }
                if ((selectedAddress != null) && selectedAddress) {
                  namespaceData = store_.referenceStore.openNamespace(selectedAddress).data();
                  _this.jsonTag(namespaceData.jsonTag);
                  _this.label(namespaceData.____label);
                  _this.description(namespaceData.____description);
                  lastAddress = _this.selectedDragonEggAddress;
                  _this.selectedDragonEggAddress = selectedAddress;
                  if (((!((lastAddress != null) && lastAddress)) && ((selectedAddress != null) && selectedAddress)) || ((!((selectedAddress != null) && selectedAddress)) && ((lastAddress != null) && (lastAddress != null))) || !lastAddress.isEqual(selectedAddress)) {
                    _this.dragonEggStoreObserverInterface.onComponentUpdated(store_.referenceStore, void 0, selectedAddress);
                  }
                } else {
                  _this.jsonTag("<no selection>");
                  _this.label("");
                  _this.description("");
                  _this.dataModelDeclarationJSON("<no selection>");
                  _this.selectedDragonEggAddress = void 0;
                  _this.dataModelCompiled(false);
                  if ((_this.callback != null) && _this.callback) {
                    _this.callback(void 0, void 0, void 0);
                  }
                }
                return true;
              } catch (_error) {
                exception = _error;
                throw "Encapsule.app.lib.DragonEggCompiler.dragonEggStoreAddressObserverInterface.onComponentCreated failure: " + exception;
              }
            };
          })(this),
          onComponentCreated: (function(_this) {
            return function(store_, observerId_, address_) {
              return _this.dragonEggStoreAddressObserverInterface.onComponentUpdated(store_, observerId_, address_);
            };
          })(this)
        };
        this.dragonEggStoreObserverInterface = {
          onComponentCreated: (function(_this) {
            return function(store_, observerId_, address_) {
              var data, exception, namespace;
              try {
                if (!((_this.selectedDragonEggAddress != null) && _this.selectedDragonEggAddress)) {
                  return true;
                }
                if (!_this.selectedDragonEggAddress.isEqual(address_)) {
                  return true;
                }
                _this.dataModelCompiled(false);
                namespace = store_.openNamespace(address_);
                data = namespace.data();
                if (!((data.jsonTag != null) && data.jsonTag)) {
                  return true;
                }
                compile(store_, address_);
                _this.backchannel.log("ONMjs data model declaration recompiled: " + (address_.getHumanReadableString()) + ". Rebooting ONMjs test host...");
                _this.dataModelCompiled(true);
                if ((_this.callback != null) && _this.callback) {
                  _this.callback(store_, address_, _this.dataModelDeclarationObject);
                }
                return true;
              } catch (_error) {
                exception = _error;
                throw "Encapsule.app.lib.DragonEggCompiler.dragonEggStoreObserverInterface.onComponentUpdated failure: " + exception;
              }
            };
          })(this),
          onComponentUpdated: (function(_this) {
            return function(store_, observerId_, address_) {
              return _this.dragonEggStoreObserverInterface.onComponentCreated(store_, observerId_, address_);
            };
          })(this),
          onSubcomponentUpdated: (function(_this) {
            return function(store_, observerId_, address_) {
              return _this.dragonEggStoreObserverInterface.onComponentCreated(store_, observerId_, address_);
            };
          })(this)
        };
      } catch (_error) {
        exception = _error;
        throw "Encapsule.app.lib.DragonEggCompiler failure: " + exception;
      }
    }

    return DragonEggCompiler;

  })();

  Encapsule.code.lib.kohelpers.RegisterKnockoutViewTemplate("idKoTemplate_DragonEggCompilerView", (function() {
    return "<div class=\"classONMjsSelectedJson\">\n    <span data-bind=\"html: saveJSONAsLinkHtml\"></span>\n    <span class=\"titleString\" data-bind=\"html: title\"></span>\n</div>\n<span data-bind=\"if: dataModelCompiled\">\n<div class=\"classObjectModelNavigatorJsonBody\">\n<pre class=\"classONMjsSelectedJsonBody\" data-bind=\"html: dataModelDeclarationJSON\"></pre>\n</div>\n</span>\n<span data-bind=\"ifnot: dataModelCompiled\">\nOffline.\n</span>";
  }));

}).call(this);
