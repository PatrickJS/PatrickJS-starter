/*
 *  Document   : base_pages_coming_soon.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Coming Soon Page
 */

var BasePagesComingSoon = function() {
    // Init Countdown.js, for more examples you can check out https://github.com/hilios/jQuery.countdown
    var initCounter = function(){
        jQuery('.js-countdown').countdown((new Date().getFullYear() + 2) + '/01/15', function(event) {
            jQuery(this).html(event.strftime('<div class="row items-push text-center">'
                    + '<div class="col-xs-3"><div class="font-s36 font-w700 text-white">%-D</div><div class="font-s12 font-w700 text-white-op">DAYS</div></div>'
                    + '<div class="col-xs-3"><div class="font-s36 font-w700 text-white">%H</div><div class="font-s12 font-w700 text-white-op">HOURS</div></div>'
                    + '<div class="col-xs-3"><div class="font-s36 font-w700 text-white">%M</div><div class="font-s12 font-w700 text-white-op">MINUTES</div></div>'
                    + '<div class="col-xs-3"><div class="font-s36 font-w700 text-white">%S</div><div class="font-s12 font-w700 text-white-op">SECONDS</div></div>'
                    + '</div>'
            ));
        });
    };

    return {
        init: function () {
            // Init Countdown
            initCounter();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BasePagesComingSoon.init(); });