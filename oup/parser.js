#!/usr/bin/env node

// ##EZPAARSE

/*jslint maxlen: 180*/

/**
 * parser for acs platform
 * http://analogist.couperin.org/platforms/acs/
 */
'use strict';
var Parser = require('../.lib/parser.js');

module.exports = new Parser(function analyseEC(parsedUrl) {
  var result = {};
  var path   = parsedUrl.pathname;

  var match;

  if (path == '/content/current') {
    // /content/current
    result.title_id = parsedUrl.host.split('.')[0]; // petrology.oxfordjournals.org.biblioplanets.gate.inist.fr
    result.rtype = 'TOC';
    result.mime  = 'MISC';
  } else if ((match = /^\/content\/(.*)\.short$/.exec(path)) !== null) {
    // /content/early/2014/01/11/petrology.egt077.short
    result.title_id = parsedUrl.host.split('.')[0]; // petrology
    result.rtype  = 'ABS';
    result.mime   = 'HTML';
    result.doi    = '10.1093/' + match[1].split('/').pop().replace('.', '/'); // 10.1093/petrology/egt077
  } else if ((match = /^\/content\/(.*)\.full$/.exec(path)) !== null) {
    // http://petrology.oxfordjournals.org.biblioplanets.gate.inist.fr/content/early/2014/01/11/petrology.egt077.full
    result.title_id = parsedUrl.host.split('.')[0]; // petrology
    result.rtype  = 'ARTICLE';
    result.mime   = 'HTML';
    result.doi    = '10.1093/' + match[1].split('/').pop().replace('.', '/'); // 10.1093/petrology/egt077
  } else if ((match = /^\/content\/(.*)\.full.pdf(|\+html)$/.exec(path)) !== null) {
    // http://petrology.oxfordjournals.org.biblioplanets.gate.inist.fr/content/early/2014/01/11/petrology.egt077.full.pdf+html
    result.title_id = parsedUrl.host.split('.')[0]; // petrology
    result.rtype  = 'ARTICLE';
    result.mime   = 'PDF';
    result.doi    = '10.1093/' + match[1].split('/').pop().replace('.', '/'); // 10.1093/petrology/egt077
  } else if ((match = /^\/content\/(.*)\/suppl\/(.*)$/.exec(path)) !== null) {
    // http://petrology.oxfordjournals.org.biblioplanets.gate.inist.fr/content/55/2/241/suppl/DC1
    result.title_id    = parsedUrl.host.split('.')[0]; // petrology
    result.rtype  = 'SUPPL';
    result.mime   = 'MISC';
    result.unitid = match[2]; // DC1
  } else if ((match = /\.figures-only$/.exec(path)) !== null) {
    // /content/113/3/403.figures-only
    result.title_id = parsedUrl.host.split('.')[0]; // aob.oxfordjournals.org.gate1.inist.fr
    result.rtype = 'FIGURES';
    result.mime  = 'MISC';
  }
  return result;
});
