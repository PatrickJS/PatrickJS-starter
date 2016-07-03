/**
 * Configuration for head elements added during the creation of index.html.
 *
 * All href attributes are added the publicPath (if exists) by default.
 * You can explicitly hint to prefix a publicPath by setting a boolean value to a key that has
 * the same name as the attribute you want to operate on, but prefix with =
 *
 * Example:
 * { name: "msapplication-TileImage", content: "/img/ms-icon-144x144.png", "=content": true },
 * Will prefix the publicPath to content.
 *
 * { rel: "apple-touch-icon", sizes: "57x57", href: "/img/apple-touch-icon-57x57.png", "=href": false },
 * Will not prefix the publicPath on href (href attributes are added by default
 *
 */
module.exports = {
  link: [
    /** <link> tags for "apple-touch-icon" (AKA Web Clips). **/
    { rel: "apple-touch-icon", sizes: "57x57", href: "/img/apple-touch-icon-57x57.png" },
    { rel: "apple-touch-icon", sizes: "60x60", href: "/img/apple-touch-icon-60x60.png" },
    { rel: "apple-touch-icon", sizes: "72x72", href: "/img/apple-touch-icon-72x72.png" },
    { rel: "apple-touch-icon", sizes: "76x76", href: "/img/apple-touch-icon-76x76.png" },
    { rel: "apple-touch-icon", sizes: "114x114", href: "/img/apple-touch-icon-114x114.png" },
    { rel: "apple-touch-icon", sizes: "120x120", href: "/img/apple-touch-icon-120x120.png" },
    { rel: "apple-touch-icon", sizes: "144x144", href: "/img/apple-touch-icon-144x144.png" },

    /** <link> tags for android web app icons
    { rel: "icon", type: "image/png", sizes: "192x192", href: "/img/android-icon-192x192.png" },
    */
    /** <link> tags for favicons **/
    { rel: "icon", type: "image/png", sizes: "32x32",   href: "/img/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "96x96",   href: "/img/favicon-96x96.png" },
    { rel: "icon", type: "image/png", sizes: "196x196", href: "/img/favicon-196x196.png" },
    { rel: "icon", type: "image/png", sizes: "16x16",   href: "/img/favicon-16x16.png" },

    /** <link> tags for a Web App Manifest **/
    { rel: "manifest", href: "/assets/manifest.json" }
  ],
  meta: [
    { name: "msapplication-TileColor", content: "#00bcd4" },
    { name: "msapplication-TileImage", content: "/img/mstile-144x144.png", "=content": true },
    { name: "theme-color", content: "#00bcd4" }
  ]
};
