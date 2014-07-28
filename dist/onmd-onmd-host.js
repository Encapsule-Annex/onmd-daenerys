
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

  Encapsule.app.lib.ONMjsDataModelHost = (function() {
    function ONMjsDataModelHost(parentBackchannel_) {
      var bcError, bcLog, exception;
      try {
        this.parentBackchannel = parentBackchannel_;
        this.status = "offline";
        bcLog = function(message_) {
          return (typeof console !== "undefined" && console !== null) && console && (console.log != null) && console.log && console.log("ONMjsDataModelHost:: " + message_) || false;
        };
        bcError = function(message_) {
          var message;
          return message = (typeof console !== "undefined" && console !== null) && console && (console.error != null) && console.error && console.error("ONMjsDataModelHost:: " + message_) || false;
        };
        this.backchannel = new Encapsule.code.lib.base.BackChannel(bcLog, bcError);
        this.backchannelModelView = new ONMjs.observers.BackchannelView(this.backchannel);
        this.observers = {
          path: new ONMjs.observers.SelectedPathModelView(this.backchannel),
          navigator: new ONMjs.observers.NavigatorModelView(this.backchannel),
          namespace: new ONMjs.observers.SelectedNamespaceModelView(this.backchannel),
          json: new ONMjs.observers.SelectedJsonModelView(this.backchannel)
        };
        this.model = void 0;
        this.store = void 0;
        this.addressStore = void 0;
        this.observerId1 = void 0;
        this.observerId2 = void 0;
        this.attachObservers = (function(_this) {
          return function() {
            var exception;
            try {
              if ((_this.observerId1 != null) && _this.observerId1) {
                throw "Observers are already attached.";
              }
              _this.observerId1 = _this.store.registerObserver(_this.addressStore.objectStoreCallbacks, _this.addressStore);
              _this.observers.path.attachToCachedAddress(_this.addressStore);
              _this.observers.navigator.attachToStore(_this.store);
              _this.observerId2 = _this.observers.navigator.attachToCachedAddress(_this.addressStore);
              _this.observers.navigator.setCachedAddressSink(_this.addressStore);
              _this.observers.namespace.attachToCachedAddress(_this.addressStore);
              _this.observers.json.attachToCachedAddress(_this.addressStore);
              return true;
            } catch (_error) {
              exception = _error;
              throw "Encapsule.app.lib.ONMjsDataModelHost.attachObservers failure: " + exception;
            }
          };
        })(this);
        this.detachObservers = (function(_this) {
          return function() {
            var errors, exception;
            try {
              if (!((_this.observerId1 != null) && _this.observerId1)) {
                return false;
              }
              errors = 0;
              try {
                _this.observers.json.detachFromCachedAddress();
              } catch (_error) {
                exception = _error;
                errors++;
                _this.backchannel.error(exception);
              }
              try {
                _this.observers.namespace.detachFromCachedAddress();
              } catch (_error) {
                exception = _error;
                errors++;
                _this.backchannel.error(exception);
              }
              try {
                _this.observers.navigator.setCachedAddressSink(void 0);
              } catch (_error) {
                exception = _error;
                errors++;
                _this.backchannel.error(exception);
              }
              try {
                _this.observers.navigator.detachFromCachedAddress(_this.addressStore, _this.observerId2);
              } catch (_error) {
                exception = _error;
                errors++;
                _this.backchannel.error(exception);
              }
              try {
                _this.observers.navigator.detachFromStore();
              } catch (_error) {
                exception = _error;
                errors++;
                _this.backchannel.error(exception);
              }
              try {
                _this.observers.path.detachFromCachedAddress();
              } catch (_error) {
                exception = _error;
                errors++;
                _this.backchannel.error(exception);
              }
              try {
                _this.store.unregisterObserver(_this.observerId1);
              } catch (_error) {
                exception = _error;
                errors++;
                _this.backchannel.error(exception);
              }
              _this.observerId1 = _this.observerId2 = void 0;
              if (errors) {
                throw "" + errors + " occurred during detach observers attempt.";
              }
              return true;
            } catch (_error) {
              exception = _error;
              throw "Encapsule.app.lib.ONMjsDataModelHost.detachObservers failure: " + exception;
            }
          };
        })(this);
        this.updateModel = (function(_this) {
          return function(store_, address_, dataModelDeclaration_) {
            var exception;
            try {
              _this.detachObservers();
              if (!((dataModelDeclaration_ != null) && dataModelDeclaration_)) {
                _this.model = void 0;
                _this.store = void 0;
                _this.addressStore = void 0;
                _this.status = "offline";
                _this.backchannel.clearLog();
                _this.backchannel.log("<h1>offline</h1>");
                return true;
              }
              _this.backchannel.clearLog();
              _this.backchannel.log("<h1>ONMjs boot</h1>");
              _this.backchannel.log("ONMjs data model declaration object has been updated.");
              _this.backchannel.log("... creating ONMjs.Model class instance...");
              _this.model = new ONMjs.Model(dataModelDeclaration_);
              _this.backchannel.log("... creating ONMjs.Store class instance...");
              _this.store = new ONMjs.Store(_this.model);
              _this.backchannel.log("... creating ONMjs.AddressStore class instance...");
              _this.addressStore = new ONMjs.AddressStore(_this.store, _this.model.createRootAddress());
              _this.backchannel.log("... attaching generic observers to new runtime data...");
              _this.attachObservers();
              _this.backchannel.log("<h1>ONMjs online</h1>");
              return _this.backchannel.log("data model '" + dataModelDeclaration_.jsonTag + "' is online.");
            } catch (_error) {
              exception = _error;
              return _this.backchannel.error("ONMjsDataModelHost failure: " + exception);
            }
          };
        })(this);
      } catch (_error) {
        exception = _error;
        throw "Encapsule.app.lib.ONMjsDataModelHost failure: " + exception;
      }
    }

    return ONMjsDataModelHost;

  })();

}).call(this);
