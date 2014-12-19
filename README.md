geo-ndjson-es-loader
=================

Pipe ndjson (geojson) into elastic search, with polygon mappings configured.

Install
--------

    npm install shp-to-es-loader -g

Usage
------

    cat data | geo-ndjson-es-loader http://localhost:9200/newindex  "properties.SOMETHINGID"

Where the args are:

  - the es index that will be *Created*, also provide the user/pass
  - a primary key that can be user from the Feature to prevent dupes.

The program will:

  - Create the index
  - put the generic [mapping](./mapping.json) file as the default mapping. This preserves the geoshape.
  - loads all the Features into that index
  - make your life easier.

