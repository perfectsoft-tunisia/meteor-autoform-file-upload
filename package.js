Package.describe({
  name: 'perfectsofttunisia:autoform-file-upload',
  version: '0.0.1',
  summary: 'Upload image for autoform with dropzone',
  git: 'https://github.com/perfectsoft-tunisia/meteor-autoform-file-upload',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use(['ecmascript', 'templating', 'reactive-var'], 'client');

  api.use('aldeed:autoform@4.0.0 || 5.0.0 || 6.0.0', {weak: true});
  api.use('perfectsofttunisia:autoform@4.0.0 || 5.0.0 || 6.0.0', {weak: true});

  api.addFiles([
    'file-upload.html',
    'file-upload.js',
    'input-type-config.js'
  ], 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('perfectsofttunisia:autoform-file-upload');
  api.mainModule('autoform-file-upload-tests.js');
});
