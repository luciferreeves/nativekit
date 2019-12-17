const makeDir = require('make-dir');
var ncp = require('ncp').ncp;
 
function buildForMac() {
    (async () => {
        const path = await makeDir('build');
     
        console.log('Created directory \'build\' at path: ' + path);
    })();

    ncp('dist/mac/', 'build', function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('Native Kit is built for macOS now. You can use the \'build\' directory directly to your project. \n\nFiles you need to include in your project are:\n\n1. build => css => all.css\n2. build => scripts => nativekit.js\nDon\'t delete the fonts directory.\n\nDon\'t forget to support the project if you like it! Go ahead contribute to it or star it on Github or better if you can spare some change, then donate at the following URL: \nhttps://www.paypal.me/kumarpriyansh\n\nVisit the Native Kit website for documentation at: \nhttps://www.nativekit.co.\n\nThank you for using Native Kit.');
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
        console.log('Native Kit is built for Windows 10 now. You can use the \'build\' directory directly to your project. \n\nFiles you need to include in your project are:\n\n1. build => css => all.css\n2. build => scripts => nativekit.js\nDon\'t delete the fonts directory.\n\nDon\'t forget to support the project if you like it! Go ahead contribute to it or star it on Github or better if you can spare some change, then donate at the following URL: \nhttps://www.paypal.me/kumarpriyansh\n\nVisit the Native Kit website for documentation at: \nhttps://www.nativekit.co.\n\nThank you for using Native Kit.');
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
        console.log('Native Kit is built for both macOS and Windows 10 now. You can use the \'build\' directory directly to your project. \n\nFiles you need to include in your project are:\n\n1. build => (mac/windows) => css => all.css\n2. build => (mac/windows) => scripts => nativekit.js\nDon\'t delete the fonts directory.\n\nDon\'t forget to support the project if you like it! Go ahead contribute to it or star it on Github or better if you can spare some change, then donate at the following URL: \nhttps://www.paypal.me/kumarpriyansh\n\nVisit the Native Kit website for documentation at: \nhttps://www.nativekit.co.\n\nThank you for using Native Kit.');
    });
}

for (var i=0; i<process.argv.length;i++) {
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