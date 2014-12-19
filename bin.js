#!/usr/bin/env node

var loader = require('./index');
var es_mapping = require('./mapping.json');

var es_point = process.argv[2];
var primary_key = process.argv[3]

if (!es_point) return console.log('please provide an elasticsearch endpoint')
if (!primary_key) return console.log('please provide a path to a primary key');


loader.setup(es_point, es_mapping, function(err){
  if (err) return console.log('setup error', err);
  process.stdin
    .pipe(loader.load(es_point, primary_key))
    .pipe(process.stdout)

})