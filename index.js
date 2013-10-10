var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

var params = function(fn) {
  var arg, argDecl, args, fnText, _fn, _i, _len;
  params = [];
  if (typeof fn === 'function' && fn.length) {
    fnText = fn.toString().replace(STRIP_COMMENTS, '');
    argDecl = fnText.match(FN_ARGS);
    args = argDecl[1].split(FN_ARG_SPLIT);
    _fn = function(arg) {
      return arg.replace(FN_ARG, function(all, underscore, name) {
        return params.push(name);
      });
    };
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      arg = args[_i];
      _fn(arg);
    }
  }
  return params;
};




exports = module.exports = params