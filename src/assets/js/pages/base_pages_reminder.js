/*
 *  Document   : base_pages_reminder.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Reminder Page
 */

var BasePagesReminder = function() {
    // Init Reminder Form Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
    var initValidationReminder = function(){
        jQuery('.js-validation-reminder').validate({
            errorClass: 'help-block text-right animated fadeInDown',
            errorElement: 'div',
            errorPlacement: function(error, e) {
                jQuery(e).parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                jQuery(e).closest('.form-group').removeClass('has-error').addClass('has-error');
                jQuery(e).closest('.help-block').remove();
            },
            success: function(e) {
                jQuery(e).closest('.form-group').removeClass('has-error');
                jQuery(e).closest('.help-block').remove();
            },
            rules: {
                'reminder-email': {
                    required: true,
                    email: true
                }
            },
            messages: {
                'reminder-email': {
                    required: 'Please enter a valid email address'
                }
            }
        });
    };

    return {
        init: function () {
            // Init Reminder Form Validation
            initValidationReminder();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BasePagesReminder.init(); });