const makeDir = require('make-dir');
var ncp = require('ncp').ncp;
var colors = require('colors');

function buildForMac() {
  (async () => {
    const path = await makeDir('build');

    console.log('Created directory \'build\' at path: ' + path);
  })();

  ncp('dist/mac/', 'build', function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('\n\n');
    console.log('Native Kit is built for macOS now.'.brightGreen)
    console.log('\n\n');
    console.log('You can use the ' + 'build'.brightGreen + ' directory directly to your project. \n\nFiles you need to include in your project are:\n\n' + '1. build => css => all.css'.brightCyan + '\n' + '2. build => scripts => nativekit.js'.brightCyan + '\n' + 'Don\'t delete the fonts directory.'.brightMagenta + '\n\nDon\'t forget to support the project if you like it! Go ahead contribute to it or ' + 'star it on Github'.brightYellow + ' or better if you can spare some change, then donate at the following URL: \n' + 'https://www.paypal.me/kumarpriyansh'.brightYellow + '\n\nVisit the Native Kit website for documentation at: \n' + 'https://www.nativekit.co'.brightYellow + '\n\nThank you for using Native Kit.');
  });
}

function buildForWin() {
  (async () => {
    const path = await makeDir('build');

    console.log('Created directory \'build\' at path: ' + path);
  })();

  ncp('dist/windows/', 'build', function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('\n\n');
    console.log('Native Kit is built for Windows 10 now.'.brightGreen)
    console.log('\n\n');
    console.log('You can use the ' + 'build'.brightGreen + ' directory directly to your project. \n\nFiles you need to include in your project are:\n\n' + '1. build => css => all.css'.brightCyan + '\n' + '2. build => scripts => nativekit.js'.brightCyan + '\n' + 'Don\'t delete the fonts directory.'.brightMagenta + '\n\nDon\'t forget to support the project if you like it! Go ahead contribute to it or ' + 'star it on Github'.brightYellow + ' or better if you can spare some change, then donate at the following URL: \n' + 'https://www.paypal.me/kumarpriyansh'.brightYellow + '\n\nVisit the Native Kit website for documentation at: \n' + 'https://www.nativekit.co'.brightYellow + '\n\nThank you for using Native Kit.');
  });
}

function build() {
  (async () => {
    const path = await makeDir('build');

    console.log('Created directory \'build\' at path: ' + path);
  })();

  ncp('dist/', 'build', function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('\n\n');
    console.log('Native Kit is built for both macOS and Windows10 now.'.brightGreen)
    console.log('\n\n');
    console.log('You can use the ' + 'build'.brightGreen + ' directory directly to your project. \n\nFiles you need to include in your project are:\n\n' + '1. build => (mac/windows) => css => all.css'.brightCyan + '\n' + '2. build => (mac/windows) => scripts => nativekit.js'.brightCyan + '\n' + 'Don\'t delete the fonts directory.'.brightMagenta + '\n\nDon\'t forget to support the project if you like it! Go ahead contribute to it or ' + 'star it on Github'.brightYellow + ' or better if you can spare some change, then donate at the following URL: \n' + 'https://www.paypal.me/kumarpriyansh'.brightYellow + '\n\nVisit the Native Kit website for documentation at: \n' + 'https://www.nativekit.co'.brightYellow + '\n\nThank you for using Native Kit.');
  });
}

for (var i = 0; i < process.argv.length; i++) {
  switch (process.argv[i]) {
    case 'buildForMac':
      buildForMac();
      break;

    case 'buildForWin':
      buildForWin();
      break;

    case 'build':
      build();
      break;
  }
}

module.exports.buildForMac = buildForMac;
module.exports.buildForWin = buildForWin;
module.exports.build = build;