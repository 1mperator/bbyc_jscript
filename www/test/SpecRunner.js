requirejs.config({
  baseUrl: '../app',  
  paths: {
    'app': '../app',        
    'spec': "../test/spec",
    'jasmine': '../test/lib/jasmine',
    'jasmine-html': '../test/lib/jasmine-html',
    'boot': '../test/lib/boot',    
  },
  shim: {    
    'jasmine': {
      exports: 'window.jasmineRequire'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'window.jasmineRequire'
    },
    'boot': {
      deps: ['jasmine', 'jasmine-html'],
      exports: 'window.jasmineRequire'
    }
  }
});

var specs = ['spec/modelSpec'];

requirejs(['boot'], function() {  

  //specs.push('spec/models/TodoSpec');
    
  require(specs, function(){
    window.onload();
  });
  

});