/*
 *  Document   : base_comp_rating.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Rating Page
 */

var BaseCompRating = function() {
    // jQuery Raty, for more examples you can check out https://github.com/wbotelhos/raty

    // Init Rating
    var initRating = function(){
        // Set Default options
        jQuery.fn.raty.defaults.starType    = 'i';
        jQuery.fn.raty.defaults.hints       = ['Bad', 'Poor', 'Regular', 'Good', 'Gorgeous'];

        // Init Raty on .js-rating class
        jQuery('.js-rating').each(function(){
            var $ratingEl = jQuery(this);

            $ratingEl.raty({
                score: $ratingEl.data('score') ? $ratingEl.data('score') : 0,
                number: $ratingEl.data('number') ? $ratingEl.data('number') : 5,
                cancel: $ratingEl.data('cancel') ? $ratingEl.data('cancel') : false,
                target: $ratingEl.data('target') ? $ratingEl.data('target') : false,
                targetScore: $ratingEl.data('target-score') ? $ratingEl.data('target-score') : false,
                precision: $ratingEl.data('precision') ? $ratingEl.data('precision') : false,
                cancelOff: $ratingEl.data('cancel-off') ? $ratingEl.data('cancel-off') : 'fa fa-fw fa-times text-danger',
                cancelOn: $ratingEl.data('cancel-on') ? $ratingEl.data('cancel-on') : 'fa fa-fw fa-times',
                starHalf: $ratingEl.data('star-half') ? $ratingEl.data('star-half') : 'fa fa-fw fa-star-half-o text-warning',
                starOff: $ratingEl.data('star-off') ? $ratingEl.data('star-off') : 'fa fa-fw fa-star text-gray',
                starOn: $ratingEl.data('star-on') ? $ratingEl.data('star-on') : 'fa fa-fw fa-star text-warning',
                click: function(score, evt) {
                    // Here you could add your logic on rating click
                    // console.log('ID: ' + this.id + "\nscore: " + score + "\nevent: " + evt);
                }
            });
        });
    };

    return {
        init: function () {
            // Init all Ratings
            initRating();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseCompRating.init(); });