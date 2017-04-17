/*
 *  Document   : base_pages_files.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Files Page
 */

var BasePagesFiles = function() {
    // Init files filtering custom functionality
    var initFilesFilter = function(){
        var $mediaFilter = jQuery('.js-media-filter');
        var $mediaItems  = jQuery('.js-media-filter-items');
        var $showCategory;

        // Alter navigation design based on screen size
        var $resizeTimeout, $windowW;

        jQuery(window).on('resize', function(){
            clearTimeout($resizeTimeout);

            $resizeTimeout = setTimeout(function(){
                $windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

                if ($windowW < 768) {
                    $mediaFilter.addClass('nav-stacked');
                } else {
                    $mediaFilter.removeClass('nav-stacked');
                }
            }, 150);
        });

        jQuery(window).trigger('resize');

        // When a media filter link is clicked
        $mediaFilter.find('a').on('click', function() {
            var $this = jQuery(this);

            // Get its data-category value
            $showCategory = $this.data('category');

            // Procceed only if the user clicked on an inactive category
            if ( ! $this.parent().hasClass('active')) {
                // Remove active class from all filter links
                $mediaFilter.find('li').removeClass('active');

                // Add the active class to the clicked link
                $this.parent().addClass('active');

                // If the value is 'all' hide the current visible items and show them all together, else hide them all and show only from the category we need
                if ($showCategory === 'all') {
                    $mediaItems
                        .find('.block')
                        .parent()
                        .hide(0, function(){
                            jQuery(this).show(0);
                        });
                } else {
                    $mediaItems
                        .find('.block')
                        .parent()
                        .hide(0, function(){
                            $mediaItems
                                .find('[data-category="' + $showCategory + '"]')
                                .parent('div')
                                .show(0);
                        });
                }
            }
        });
    };

    return {
        init: function () {
            // Init files filtering
            initFilesFilter();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BasePagesFiles.init(); });