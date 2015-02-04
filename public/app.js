(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("javascripts/library_card", function(exports, require, module) {
var LibraryCard = React.createClass({displayName: "LibraryCard",
  render: function() {
    var stars = [];
    var starCount = this.props.data.stars || 0;
    var class_name = "no-star"
    for (var i=1; i <= 5; i++) {
      if (i <= starCount) {
        class_name = "star"
      }
      stars.push(React.createElement("span", {className: class_name}, " ★ "));
      class_name = "no-star";
    }

    return (
      React.createElement("div", {className: "library-card"}, 
        React.createElement("div", {className: "link"}, 
          React.createElement("a", {href: this.props.data.link, target: "_blank"}, 
            React.createElement("div", {className: "name"}, this.props.data.name), 
            React.createElement("div", {className: "license"}, "(", this.props.data.license, ")")
          )
        ), 
        React.createElement("div", {className: "stars"}, 
          stars
        ), 
        React.createElement("div", {className: "screenshot"}, 
          React.createElement("a", {href: this.props.data.link, target: "_blank"}, 
            React.createElement("img", {src: this.props.data.screenshot})
          )
        ), 
        React.createElement("div", {className: "comment"}, this.props.data.comment)
      )
    );
  }
});

module.exports = LibraryCard;
});

require.register("javascripts/library_list", function(exports, require, module) {
// tutorial10.js
var LibraryCard = require('./library_card');
var LibraryList = React.createClass({displayName: "LibraryList",
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    var libraryNodes = this.state.data.sort(function(a,b) {
      return b.stars - a.stars;
    }).map(function (library) {
      return (
        React.createElement(LibraryCard, {data: library})
      );
    });
    return (
      React.createElement("div", {className: "libraryNodes"}, 
        libraryNodes
      )
    );
  }
});

React.render(
  React.createElement(LibraryList, {url: "libraries.json"}),
  document.getElementById('library')
);

module.exports = LibraryList;
});


//# sourceMappingURL=app.js.map