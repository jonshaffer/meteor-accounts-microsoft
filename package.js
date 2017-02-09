Package.describe({
  name: 'jonshaffer:accounts-microsoft',
  version: '1.0.1',
  summary: 'A login service for Microsoft accounts.',
  git: 'https://github.com/jonshaffer/meteor-accounts-microsoft',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use('underscore');
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('jonshaffer:microsoft@1.0.1', ['client', 'server']);

  api.addFiles('microsoft_login_button.css', 'client');

  api.addFiles('microsoft.js');
});
