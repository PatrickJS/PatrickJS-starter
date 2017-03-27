/*
 *  Document   : base_pages_coming_soon_v2.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Coming Soon v2 Page
 */

var BasePagesComingSoonv2 = function() {
    // Init Countdown.js, for more examples you can check out https://github.com/hilios/jQuery.countdown
    var initCounter = function(){
        jQuery('.js-countdown').countdown((new Date().getFullYear() + 1) + '/02/20', function(event) {
            jQuery(this).html(event.strftime('<div class="row items-push text-center">'
                    + '<div class="col-xs-6 col-sm-3"><div class="font-s48 font-w700 text-white">%-D</div><div class="font-w600 text-gray">DAYS</div></div>'
                    + '<div class="col-xs-6 col-sm-3"><div class="font-s48 font-w700 text-white">%H</div><div class="font-w600 text-gray">HOURS</div></div>'
                    + '<div class="col-xs-6 col-sm-3"><div class="font-s48 font-w700 text-white">%M</div><div class="font-w600 text-gray">MINUTES</div></div>'
                    + '<div class="col-xs-6 col-sm-3"><div class="font-s48 font-w700 text-white">%S</div><div class="font-w600 text-gray">SECONDS</div></div>'
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
jQuery(function(){ BasePagesComingSoonv2.init(); });