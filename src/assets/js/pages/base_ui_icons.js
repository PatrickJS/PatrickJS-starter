/*
 *  Document   : base_ui_icons.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Icons Page
 */

var BaseUIIcons = function() {
    // Icon search functionality
    var initIconSearch = function(){
        // Set variables
        var $searchItems = jQuery('.js-icon-list > div');
        var $searchValue = '';

        // When user types
        jQuery('.js-icon-search').on('keyup', function(){
            $searchValue = jQuery(this).val().toLowerCase();

            if ($searchValue.length > 2) { // If more than 2 characters, search the icons
                $searchItems.hide();

                jQuery('code', $searchItems)
                    .each(function(){
                        if (jQuery(this).text().match($searchValue)) {
                            jQuery(this).parent('div').show();
                        }
                    });
            } else if ($searchValue.length === 0) { // If text deleted show all icons
                $searchItems.show();
            }
        });
    };

    return {
        init: function() {
            // Init icon search
            initIconSearch();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseUIIcons.init(); });