/*
 *  Document   : base_comp_animations.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Animations Page
 */

var BaseCompAnimations = function() {
    // Animation toggle functionality
    var initAnimationToggle = function(){
        var $animationClass, $button, $currentSection;

        // On button click
        jQuery('.js-animation-section button').on('click', function(){
            $button         = jQuery(this);
            $animationClass = $button.data('animation-class');
            $currentSection = $button.parents('.js-animation-section');

            // Update class preview
            jQuery('.js-animation-preview', $currentSection).html($animationClass);

            // Update animation object classes
            jQuery('.js-animation-object', $currentSection)
                .removeClass()
                .addClass('js-animation-object animated ' + $animationClass);
        });
    };

    return {
        init: function() {
            // Init animation toggle
            initAnimationToggle();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseCompAnimations.init(); });