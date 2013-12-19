# pretty-seconds

a very simple function to stringify any huge number of seconds. give it million seconds and it tells you how many days, hours, minutes and seconds in a pretty string.

## installation
    
to install pretty-seconds, use [npm](http://github.com/isaacs/npm):

    $ npm install pretty-seconds
    
then in your node.js app, get reference to the function like that:
    
```javascript
var prettySeconds = require('pretty-seconds');
```

## quick examples

### make a pretty string out of 80 seconds

```javascript

// outputs "1 minute and 20 seconds"
echo prettySeconds(80);
```

### make a pretty string out of 86462 seconds

```javascript

// outputs "1 day, 1 minute and 2 seconds"
echo prettySeconds(86462);
```

you see, it's really pretty and respects grammar for singular and plural.

## api

### prettySeconds(seconds)

all this function does is some maths and string concenations to have a pretty string instead of a long number of seconds.
 
__arguments__

* seconds - any positive or negative integer you fancy

## license

MIT