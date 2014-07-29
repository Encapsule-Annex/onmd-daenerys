
/*
------------------------------------------------------------------------------

The MIT License (MIT)

Copyright (c) 2014 Encapsule Project
  
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
  var compileComponent, compileDragonEgg, copyProperty;

  copyProperty = function(propertyName_, dataReferenceSource_, dataReferenceDestination_) {
    var exception;
    try {
      return dataReferenceDestination_[propertyName_] = dataReferenceSource_[propertyName_];
    } catch (_error) {
      exception = _error;
      throw "failed to copy property " + propertyName_;
    }
  };

  compileComponent = function(store_, address_, parentDataReference_) {
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
      metaPropertiesNamespace.visitExtensionPointSubcomponents((function(_this) {
        return function(subcomponentAddress_) {
          var subcomponentData, subcomponentNamespace;
          subcomponentNamespace = store_.openNamespace(subcomponentAddress_);
          subcomponentData = subcomponentNamespace.data();
          if ((subcomponentData.jsonTag != null) && subcomponentData.jsonTag) {
            outputData[subcomponentData.jsonTag] = subcomponentData.value;
          }
          return true;
        };
      })(this));
      if (!(inputData.namespaceType === "extensionPoint")) {
        immutablePropertiesAddress = address_.createSubpathAddress("properties.userImmutable");
        immutablePropertiesNamespace = store_.openNamespace(immutablePropertiesAddress);
        immutablePropertiesNamespace.visitExtensionPointSubcomponents((function(_this) {
          return function(immutablePropertyAddress_) {
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
          };
        })(this));
        mutablePropertiesAddress = address_.createSubpathAddress("properties.userMutable");
        mutablePropertiesNamespace = store_.openNamespace(mutablePropertiesAddress);
        mutablePropertiesNamespace.visitExtensionPointSubcomponents((function(_this) {
          return function(mutablePropertyAddress_) {
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
          };
        })(this));
      }
      namespacesAddress = address_.createSubpathAddress("namespaces");
      namespacesNamespace = store_.openNamespace(namespacesAddress);
      namespacesNamespace.visitExtensionPointSubcomponents((function(_this) {
        return function(subnamespaceAddress_) {
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
        };
      })(this));
      copyProperty("semanticBindings", inputData, outputData);
      return true;
    } catch (_error) {
      exception = _error;
      throw "Encapsule.app.lib.DragonEggCompiler.compileComponent failure: " + exception;
    }
  };

  compileDragonEgg = function(store_, address_) {
    var dataModelDeclaration, exception_, resultJSON;
    try {
      dataModelDeclaration = {};
      compileComponent(store_, address_, dataModelDeclaration);
      resultJSON = JSON.stringify(dataModelDeclaration);
      if (!((resultJSON != null) && resultJSON)) {
        throw "Cannot serialize generated onm data model declaration to JSON!";
      }
      return dataModelDeclaration;
    } catch (_error) {
      exception_ = _error;
      throw new Error("pyre.compileDragonEgg exception: " + exception_.message);
    }
  };

  module.exports = {
    compileDragonEgg: compileDragonEgg,
    compileComponent: compileComponent,
    copyProperty: copyProperty
  };

}).call(this);
