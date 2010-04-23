//  Show Blueprint Grid for Wiley Book Shop
//  Copyright (c) 2010 Pol Llovet & Chris Jaeger
//  
//  License -> MIT LICENSE: http://en.wikipedia.org/wiki/MIT_License
//  
//  FILE: params.js
//  This script shows the blueprint grid if you use a ?showgrid=anything get param
//  It does this by just adding the .showgrid class to the container if that param is present
// 
// This requires jQuery

//// 
// Extend the bling method to parse out the url parameters.  
//
// @author Unknown, from the internets
// 
// @api public
//
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

//// 
// Perform the class append on document ready
//
// @author Pol Llovet
// 
// @api public
//
$(document).ready(function() {
  if($.getUrlVar('showgrid') != undefined){
    $('.container').addClass('showgrid')
  }
})