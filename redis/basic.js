var redis = require('redis');

var client = redis.createClient();

client.on('error', function(err){

  console.log('Something went wrong ', err)

});

client.set('my test key', 'my test value', redis.print);

client.get('my test key', function(error, result) {

  if (error) throw error;

  console.log('GET result ->', result)

});

client.del('my test key', redis.print);


var arr = ['sdsdsd'];

client.rpush('my test key',arr, redis.print);


client.hset('HSET record', 'keys', 'value', redis.print);

client.hset('HSET record', 'second skey', 'second value', redis.print);

client.hgetall('HSET record', function(err, result) {

  console.log(JSON.stringify(result)); 

  // {"key":"value","second key":"second value"}

});

client.hdel('HSET record', 'keys', redis.print);