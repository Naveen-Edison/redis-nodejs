# redis-nodejs
Redis used in node js 

This is a complete and feature rich Redis client for node.js. It supports all Redis commands and focuses on high performance.

Install with:

npm install redis
Usage Example
var redis = require("redis"),
    client = redis.createClient();
 
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
 
client.on("error", function (err) {
    console.log("Error " + err);
});
 
client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});
This will display:

mjr:~/work/node_redis (master)$ node example.js
Reply: OK
Reply: 0
Reply: 0
2 replies:
    0: hashtest 1
    1: hashtest 2
mjr:~/work/node_redis (master)$
Note that the API is entirely asynchronous. To get data back from the server, you'll need to use a callback. From v.2.6 on the API supports camelCase and snake_case and all options / variables / events etc. can be used either way. It is recommended to use camelCase as this is the default for the Node.js landscape.

Promises
You can also use node_redis with promises by promisifying node_redis with bluebird as in:

var redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
It'll add a Async to all node_redis functions (e.g. return client.getAsync().then())

// We expect a value 'foo': 'bar' to be present
// So instead of writing client.get('foo', cb); you have to write:
return client.getAsync('foo').then(function(res) {
    console.log(res); // => 'bar'
});
 
// Using multi with promises looks like:
 
return client.multi().get('foo').execAsync().then(function(res) {
    console.log(res); // => 'bar'
});
Sending Commands
Each Redis command is exposed as a function on the client object. All functions take either an args Array plus optional callback Function or a variable number of individual arguments followed by an optional callback. Examples:

client.hmset(["key", "test keys 1", "test val 1", "test keys 2", "test val 2"], function (err, res) {});
// Works the same as
client.hmset("key", ["test keys 1", "test val 1", "test keys 2", "test val 2"], function (err, res) {});
// Or
client.hmset("key", "test keys 1", "test val 1", "test keys 2", "test val 2", function (err, res) {});
Note that in either form the callback is optional:

client.set("some key", "some val");
client.set(["some other key", "some val"]);
If the key is missing, reply will be null. Only if the Redis Command Reference states something else it will not be null.

client.get("missingkey", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
});
For a list of Redis commands, see Redis Command Reference

Minimal parsing is done on the replies. Commands that return a integer return JavaScript Numbers, arrays return JavaScript Array. HGETALL returns an Object keyed by the hash keys. All strings will either be returned as string or as buffer depending on your setting. Please be aware that sending null, undefined and Boolean values will result in the value coerced to a string!

Redis Commands
This library is a 1 to 1 mapping to Redis commands. It is not a cache library so please refer to Redis commands page for full usage details.

Example setting key to auto expire using SET command

// this key will expire after 10 seconds
client.set('key', 'value!', 'EX', 10);
