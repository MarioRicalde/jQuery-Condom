# jQuery Condom (648 bytes minified!)
## Protecting your jQuery application with Namespaces.

`jQuery Condom` provides a namespace functionality which will allow you to create jQuery plugins on the fly; without touching the main `jQuery.fn` method. You have the same amount of control as if defining it from `jQuery.fn`.

This library is not meant to replace `jQuery.fn`, it's meant to work **with it**. 

The jQuery official Plugin Authoring guide states: `Under no circumstance should a single plugin ever claim more than one namespace in the jQuery.fn object.` [[source](http://docs.jquery.com/Plugins/Authoring#Plugin_Methods).]. And this library will help you follow that rule.

When you write a plugin (or any portion of code for that matter), you'll usually end up passing `jQuery` objects as `attributes` to methods; breaking the jQuery way (and sweet chains).

jQuery Condom helps you with this by granting you namespaces.

## Key Features:

* Inside a namespace function `$(this)` will return the object that invoked it.
* When you're on a namespace, you can override default jQuery Plugins without affecting the original functions.
* Really small (less than 1kb)
 

You can view a example of this here: [DEMO](http://jsfiddle.net/kuroir/PDNb9/9/)

## API

### jQuery.ns
Defines a namespace for .add to work on.

    $.ns('myNamespace')

### jQuery.ns().add
Adds the given method(s) into the namespace.

You can add methods in two different ways:

    // Chain
    $.ns('myNamespace').add('myFunc1', function(){
      // ..
    }).add('myFunc2', function(){
      // ..
    });
    
    // Object.
    $.ns('myNamespace').add({
      myFunc1: function() {},
      myFunc2: function() {}
    });

### jQuery.ns().methods
Return the available methods to the given namespace, this can be used to check if the namespace is defined previously.

    $.ns('myNamespace).methods();
    
### jQuery().ns()
Invoke the namespace. After this method, all the sucessful methods in the chain will be under that namespace.

    // You can call methods from that namespace, and even jQuery methods.
    $('.selector').ns('myNamespace').myFunc1().myFunc2().hover()
