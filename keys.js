console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.c52b0418f12a41c881124f86c978ea5b,
  secret: process.env.eefd1f85179b465eab1ce4bad1aa3c94
};