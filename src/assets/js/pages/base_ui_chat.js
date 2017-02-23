/*
 *  Document   : base_ui_chat.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Chat Pages
 */

var BaseUIChat = function() {
    // Helper variables - set in initChat()
    var $lWindow, $lHeader, $lFooter, $cContainer, $cHead, $cTalk, $cPeople, $cform, $cTimeout;

    // Init chat
    var initChat = function() {
        // Set variables
        $lWindow    = jQuery(window);
        $lHeader    = jQuery('#header-navbar');
        $lFooter    = jQuery('#page-footer');
        $cContainer = jQuery('.js-chat-container');
        $cHead      = jQuery('.js-chat-head');
        $cTalk      = jQuery('.js-chat-talk');
        $cPeople    = jQuery('.js-chat-people');
        $cform      = jQuery('.js-chat-form');

        // Add word wraping to chat content
        $cTalk.css('word-wrap', 'break-word');

        // Chat layout mode
        switch ($cContainer.data('chat-mode')) {
            case 'full':
                // Init chat windows' height
                initChatWindows();

                // ..also on browser resize or orientation change
                jQuery(window).on('resize orientationchange', function(){
                    clearTimeout($cTimeout);

                    $cTimeout = setTimeout(function(){
                        initChatWindows();
                    }, 150);
                });
                break;
            case 'fixed':
                // Init chat windows' height with a specific height
                initChatWindows($cContainer.data('chat-height'));
                break;
            case 'popup':
                // Init chat windows' height with a specific height
                initChatWindows($cContainer.data('chat-height'));

                // Adjust chat container
                $cContainer.css({
                   'position': 'fixed',
                   'right': '10px',
                   'bottom': 0,
                   'display': 'inline-block',
                   'padding': 0,
                   'width': '70%',
                   'max-width': '420px',
                   'min-width': '300px',
                   'z-index': '1031'
                });
                break;
            default:
                return false;
        }

        // Enable scroll lock to chat talk window
        $cTalk.scrollLock('enable');

        // Init form submission
        $cform.on('submit', function(e){
            // Stop form submission
            e.preventDefault();

            // Get chat input
            var $chatInput  = jQuery('.js-chat-input', jQuery(this));

            // Add message
            chatAddMessage($chatInput.data('target-chat-id'), $chatInput.val(), 'self', $chatInput);
        });
    };

    // Init chat windows' height
    var initChatWindows = function($customHeight) {
        if ($customHeight) {
            $cHeight = $customHeight;
        } else {
            // Calculate height
            var $cHeight = $lWindow.height() -
                    $lHeader.outerHeight() -
                    $lFooter.outerHeight() -
                    $cHead.outerHeight() -
                    (parseInt($cContainer.css('padding-top')) + parseInt($cContainer.css('padding-bottom')));

            // Add a minimum height
            if ($cHeight < 200) {
                $cHeight = 200;
            }
        }

        // Set height to chat windows (+ people window if exists)
        if ($cPeople) {
            $cPeople.css('height', $cHeight);
        }

        $cTalk.css('height', $cHeight - $cform.outerHeight());
    };

    // Add a message to a chat window
    var chatAddMessage = function($chatId, $chatMsg, $chatMsgLevel, $chatInput) {
        // Get chat window
        var $chatWindow = jQuery('.js-chat-talk[data-chat-id="' + $chatId + '"]');

        // If message and chat window exists
        if ($chatMsg && $chatWindow.length) {
            var $chatBlockClasses = 'animated fadeIn push-50-l';
            var $chatMsgClasses   = 'bg-gray-lighter';

            // Post it to its related window (if message level is 'self', make it stand out)
            if ($chatMsgLevel === 'self') {
                $chatBlockClasses   = 'animated fadeInUp push-50-r';
                $chatMsgClasses     = 'bg-gray-light';
            }

            $chatWindow.append('<div class="block block-rounded block-transparent push-15 ' + $chatBlockClasses + '">'
                    + '<div class="block-content block-content-full block-content-mini ' + $chatMsgClasses + '">'
                    + jQuery('<div />').text($chatMsg).html()
                    + '</div>'
                    + '</div>');

            // Scroll the message list to the bottom
            $chatWindow.animate({ scrollTop: $chatWindow[0].scrollHeight }, 150);

            // If input is set, reset it
            if ($chatInput) {
                $chatInput.val('');
            }
        }
    };

    return {
        init: function() {
            // Init chat
            initChat();
        },
        addMessage: function($chatId, $chatMsg, $chatMsgLevel) {
            // Add message
            chatAddMessage($chatId, $chatMsg, $chatMsgLevel, false);
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseUIChat.init(); });