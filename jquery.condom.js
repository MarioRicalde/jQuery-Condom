/* 
 * jQuery Condom (Use namespaces to protect your global integrity.) 
 * Version 0.0.3
 * 
 * Copyright (c) 2011 Mario "Kuroir" Ricalde (http://kuroir.com)  
 *   & Micha Niskin (micha@thinkminimo.com) 
 * Licensed jointly under the GPL and MIT licenses, 
 * choose which one suits your project best! 
 */ 
(function($) { 
  var methods = {}; 
  $.ns = function(ns) { 
    // Define namespace if it doesn't exist.
    methods[ns] =  methods[ns] || {}; 

    // Get reference to a namespaced jQ object
    function nsfun(selector, context) {
      return $(selector, context).ns(ns);
    }
    
    // Allows you to add methods ala jQuery.fn (useful to namespace premade plugins)
    nsfun.fn = methods[ns];

    // If `key` is an object val is ignored and `key` is returned. Otherwise,
    // an object is returned with obj[key] set to `val`.
    function asObj(key, val) {
      var obj = $.type(key) == "object" ? key : {};
      if (obj !== key)
        obj[key] = val;
      return obj;
    }

    // Add a method.
    nsfun.add = function(fname, fn) { 
      $.each(asObj(fname, fn), function(fname, fn) { 
        methods[ns][fname] = function() { return fn.apply(this, arguments) }; 
      }); 
      return this; 
    };

    // Monkey-patch a jQuery instance method.
    nsfun.patch = function(fname, fn) {
      $.each(asObj(fname, fn), function(fname, fn) { 
        methods[ns][fname] = (function(orig) {
          return function() { 
            return fn.apply(this, [orig].concat($.makeArray(arguments))); 
          }; 
        })($.fn[fname]);
      }); 
      return this; 
    };

    // Get methods.
    nsfun.methods = function() { 
      return $.extend({}, methods[ns]); 
    };

    return nsfun;
  };
  // The only function that touches $.fn
  $.fn.ns = function(ns) { 
    if (methods[ns]) $.extend(this, methods[ns]); 
    return this; 
  }; 
})(jQuery);
