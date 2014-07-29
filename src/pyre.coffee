###
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

###
#
#
#


copyProperty = (propertyName_, dataReferenceSource_, dataReferenceDestination_) ->
    try
        dataReferenceDestination_[propertyName_] = dataReferenceSource_[propertyName_]
    catch exception
        throw "failed to copy property #{propertyName_}"



compileComponent = (store_, address_, parentDataReference_) ->
    try
        componentNamespace = store_.openNamespace(address_)
        inputData = componentNamespace.data()
        outputData = parentDataReference_

        copyProperty("jsonTag", inputData, outputData)
        copyProperty("namespaceType", inputData, outputData)
        copyProperty("____label", inputData, outputData)
        copyProperty("____description", inputData, outputData)

        metaPropertiesAddress = address_.createSubpathAddress("metaProperties")
        metaPropertiesNamespace = store_.openNamespace(metaPropertiesAddress)
        metaPropertiesNamespace.visitExtensionPointSubcomponents( (subcomponentAddress_) =>
            subcomponentNamespace = store_.openNamespace(subcomponentAddress_)
            subcomponentData = subcomponentNamespace.data()
            if subcomponentData.jsonTag? and subcomponentData.jsonTag
                outputData[subcomponentData.jsonTag] = subcomponentData.value
            true
            )

        if not (inputData.namespaceType == "extensionPoint")
            # \ BEGIN: if not extension point

            immutablePropertiesAddress = address_.createSubpathAddress("properties.userImmutable")
            immutablePropertiesNamespace = store_.openNamespace(immutablePropertiesAddress)
            immutablePropertiesNamespace.visitExtensionPointSubcomponents( (immutablePropertyAddress_) =>
               immutablePropertyNamespace = store_.openNamespace(immutablePropertyAddress_)
               immutablePropertyData = immutablePropertyNamespace.data()
               if immutablePropertyData.jsonTag? and immutablePropertyData.jsonTag
                   namespaceProperties = outputData.namespaceProperties? and outputData.namespaceProperties or outputData.namespaceProperties = {}
                   immutableProperties = namespaceProperties.userImmutable? and namespaceProperties.userImmutable or namespaceProperties.userImmutable = {}
                   propertyReference = immutableProperties[immutablePropertyData.jsonTag] = {}
                   propertyReference.defaultValue = immutablePropertyData.value
                   copyProperty("____type", immutablePropertyData, propertyReference)
                   copyProperty("____description", immutablePropertyData, propertyReference)
                   metaPropertiesAddress = immutablePropertyAddress_.createSubpathAddress("metaProperties")
                   metaPropertiesNamespace = store_.openNamespace(metaPropertiesAddress)
                   metaPropertiesNamespace.visitExtensionPointSubcomponents( (metaPropertyAddress_) =>
                       metaPropertyNamespace = store_.openNamespace(metaPropertyAddress_)
                       metaPropertyData = metaPropertyNamespace.data()
                       if metaPropertyData.jsonTag? and metaPropertyData.jsonTag
                           propertyReference[metaPropertyData.jsonTag] = metaPropertyData.value
                       )
                )
                            
            mutablePropertiesAddress = address_.createSubpathAddress("properties.userMutable")
            mutablePropertiesNamespace = store_.openNamespace(mutablePropertiesAddress)
            mutablePropertiesNamespace.visitExtensionPointSubcomponents( (mutablePropertyAddress_) =>
                mutablePropertyNamespace = store_.openNamespace(mutablePropertyAddress_)
                mutablePropertyData = mutablePropertyNamespace.data()
                if mutablePropertyData.jsonTag? and mutablePropertyData.jsonTag
                    namespaceProperties = outputData.namespaceProperties? and outputData.namespaceProperties or outputData.namespaceProperties = {}
                    mutableProperties = namespaceProperties.userMutable? and namespaceProperties.userMutable or namespaceProperties.userMutable = {}
                    propertyReference = mutableProperties[mutablePropertyData.jsonTag] = {}
                    propertyReference.defaultValue = mutablePropertyData.value
                    copyProperty("____type", mutablePropertyData, propertyReference)
                    copyProperty("____description", mutablePropertyData, propertyReference)
                    metaPropertiesAddress = mutablePropertyAddress_.createSubpathAddress("metaProperties")
                    metaPropertiesNamespace = store_.openNamespace(metaPropertiesAddress)
                    metaPropertiesNamespace.visitExtensionPointSubcomponents( (metaPropertyAddress_) =>
                        metaPropertyNamespace = store_.openNamespace(metaPropertyAddress_)
                        metaPropertyData = metaPropertyNamespace.data()
                        if metaPropertyData.jsonTag? and metaPropertyData.jsonTag
                            propertyReference[metaPropertyData.jsonTag] = metaPropertyData.value
                        )
                )
            # / END: if not extension point
                            
        namespacesAddress = address_.createSubpathAddress("namespaces")
        namespacesNamespace = store_.openNamespace(namespacesAddress)
        namespacesNamespace.visitExtensionPointSubcomponents( (subnamespaceAddress_) =>
            subNamespacesData = outputData.subNamespaces? and outputData.subNamespaces and outputData.subNamespaces.length and outputData.subNamespaces or outputData.subNamespaces = []
            subnamespaceNamespace = store_.openNamespace(subnamespaceAddress_)
            subnamespaceData = subnamespaceNamespace.data()
            switch subnamespaceData.namespaceType
                when "child"
                    namespaceDeclaration = {}
                    compileComponent(store_, subnamespaceAddress_, namespaceDeclaration)
                    subNamespacesData.push namespaceDeclaration
                    break
                when "extensionPoint"
                    namespaceDeclaration = {}
                    compileComponent(store_, subnamespaceAddress_, namespaceDeclaration)
                    subNamespacesData.push namespaceDeclaration
                    break
                when "component"
                    namespaceDeclaration = {}
                    compileComponent(store_, subnamespaceAddress_, namespaceDeclaration)
                    outputData.componentArchetype = namespaceDeclaration
                    break
                else
                    break
            true
            )

        copyProperty("semanticBindings", inputData, outputData)
        true

    catch exception
        throw "Encapsule.app.lib.DragonEggCompiler.compileComponent failure: #{exception}"




compileDragonEgg = (store_, address_) ->
    try
        dataModelDeclaration = {}
        compileComponent(store_, address_, dataModelDeclaration)
        resultJSON = JSON.stringify(dataModelDeclaration)
        if not (resultJSON? and resultJSON)
            throw "Cannot serialize generated onm data model declaration to JSON!"
        dataModelDeclaration

    catch exception_
        throw new Error("pyre.compileDragonEgg exception: " + exception_.message)



module.exports = {
    # API
    compileDragonEgg: compileDragonEgg,
    # Exported for visibility to test routines.
    compileComponent: compileComponent,
    copyProperty: copyProperty
};

