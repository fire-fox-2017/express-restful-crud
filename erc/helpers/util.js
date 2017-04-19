'use strict';

var models = require('../models/index');
var util = {};
var db=require('../models');



util.changeFormat = function(source, callback){
  for (var i = 0; i < source.length; i++) {
    source[i].createdAt = new Date(source[i].createdAt).toUTCString()
  }
    callback(source)
}


module.exports = util;
