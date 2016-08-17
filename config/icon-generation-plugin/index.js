'use strict';

function IconGenerationPlugin() {
    var spliconGenerator = require('splashicon-generator');

    var options = {
        ICON_FILE: 'src/assets/icon/icon-template.png',
        SPLASH_FILE: '',
        ICON_PLATFORMS: [{
            name: 'browser-icons',
            iconsPath: 'src/assets/icon/',
            isAdded: true,
            icons: [
                { name: 'favicon.ico', size: 16 },
                { name: 'favicon-16x16.png', size: 16 },
                { name: 'favicon-32x32.png', size: 32 },
                { name: 'favicon-96x96.png', size: 96 }
            ]},
            {
                name: 'android-icons',
                iconsPath: 'src/assets/icon/',
                isAdded: true,
                icons: [
                    { name: 'android-icon-144x144.png', size: 144, density: 'xxhdpi' },
                    { name: 'android-icon-192x192.png', size: 192, density: 'xxxhdpi' },
                    { name: 'android-icon-36x36.png', size: 36, density: 'ldpi' },
                    { name: 'android-icon-48x48.png', size: 48, density: 'mdpi' },
                    { name: 'android-icon-72x72.png', size: 72, density: 'hdpi' },
                    { name: 'android-icon-96x96.png', size: 96, density: 'xhdpi'}
                ]},
                {
                    name: 'apple-icons',
                    iconsPath: 'src/assets/icon/',
                    isAdded: true,
                    icons: [
                        { name: 'apple-icon-114x114.png', size: 114 },
                        { name: 'apple-icon-120x120.png', size: 120 },
                        { name: 'apple-icon-144x144.png', size: 144 },
                        { name: 'apple-icon-152x152.png', size: 152 },
                        { name: 'apple-icon-180x180.png', size: 180 },
                        { name: 'apple-icon-precomposed.png', size: 192 },
                        { name: 'apple-icon.png', size: 192 },
                        { name: 'apple-icon-57x57.png', size: 57 },
                        { name: 'apple-icon-60x60.png', size: 60 },
                        { name: 'apple-icon-72x72.png', size: 72 },
                        { name: 'apple-icon-76x76.png', size: 76 }
                    ]},

                    {
                        name: 'ms-icons',
                        iconsPath: 'src/assets/icon/',
                        isAdded: true,
                        icons: [
                            { name: 'ms-icon-144x144.png', size: 144 },
                            { name: 'ms-icon-70x70.png', size: 70 },
                            { name: 'ms-icon-150x150.png', size: 150 },
                            { name: 'ms-icon-310x310.png', size: 310 }
                        ]}
        ]
    }

    spliconGenerator.generate(options)
    .then(function() {
        done()
    })
}

module.exports = IconGenerationPlugin;
