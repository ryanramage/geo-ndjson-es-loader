var fs = require('fs');
var url = require('url');
var async = require('async');

var ndj = require('ndjson');
var through = require('through2');
var pumpify = require('pumpify')

var es_mapping = require('./mapping.json');
var req = require('request');
var selectn = require('selectn');



exports.setup = function(api_url, mapping, cb){
  async.series([
    create_index.bind(null, api_url),
    timeout,
    create_mapping.bind(null, api_url, mapping),
    timeout
  ], cb);
}


exports.load = function(api_url, primary_key, cb) {



  return pumpify.obj(ndj.parse(), through.obj(function(data, enc, next){
    var pk = selectn(primary_key, data);
    var to = url.resolve(api_url + '/', './FeatureCollectionPoly/' + pk);
    req({
      json:true,
      body: data,
      method: 'PUT',
      url: to
    }, function(err, resp, body){
      next(null, JSON.stringify(data) + '\n')
    })
  }))

}



function timeout(cb){
  setTimeout(cb, 3000);
}

function create_index(api_url, cb) {
  console.log('create index', api_url);
  req.put(api_url, function(err, resp, body){
    console.log(err, body);
    cb(null);
  })
}

function create_mapping(api_url, mapping, cb){
  console.log('create mapping', api_url);
  var to = url.resolve(api_url, '/_mapping/FeatureCollectionPoly');
  req({
    json:true,
    body: mapping,
    method: 'PUT',
    url: to
  }, function(err, resp, body){
    console.log(err, body);
    cb(null);
  })
}



