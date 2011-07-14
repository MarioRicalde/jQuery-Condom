# jQuery Condom (252 bytes minified!)
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

## API

### jQuery.ns
Defines a namespace. This statement is needed to define new methods via `add()`

```javascript
$.ns('myNamespace')
```

### jQuery.ns().add
Adds the given method(s) into the namespace. You can override **any** method, even jQuery ones **without** affecting the global functionality. 

You can add methods in two different ways.

#### Chained Way
```javascript
$.ns('myNamespace').add('myFunc1', function(){
  // ..
}).add('myFunc2', function(){
  // ..
});
```
    
#### Object Way
```javascript
$.ns('myNamespace').add({
  myFunc1: function() {},
  myFunc2: function() {}
});
```


### jQuery.ns().methods
Return the available methods to the given namespace, this can be used to check if the namespace is defined previously. Useful when distributing your libraries that have common namespace names. 

```javascript
$.ns('myNamespace').methods();
```

  
### jQuery([selector]).ns([namespace])
Invoke the namespace with a given selector. Note that the methods called after the `.ns` declaration will only work for the given namespace; so for instance `.hover()` on global is not the same as `.hover()` in `myNamespace`.

```javascript
// You can call methods from that namespace, and even jQuery methods.
$('.selector').ns('myNamespace').myFunc1().myFunc2().hover()
```

### NEW! Store the namespace as a jQuery Object!

```javascript
my$ = $.ns('myNamespace');
my$('.sel').myFunc1().hover();
my$('.new-sel').myFunc1();
```

### NEW! Add a NameSpace to ANY plugin!

Adding jQuery Condom functionality to any plugin is really easy! all you need to do is add `.ns('theNamespace')` before `.fn` declaration!

```javascript
// Before
$.fn.myPlugin = function() { ... }

// After
$.ns('yay').fn.myPlugin = function() { ... }

```
