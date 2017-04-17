/*
 *  Document   : app.js
 *  Author     : pixelcave
 *  Description: UI Framework Custom Functionality (available to all pages)
 *
 */

window.AppTheme = function () {
  // Helper variables - set in uiInit()
  var $lHtml, $lBody, $lPage, $lSidebar, $lSidebarScroll, $lSideOverlay, $lSideOverlayScroll, $lHeader, $lMain, $lFooter;
  
  /*
   ********************************************************************************************
   *
   * BASE UI FUNCTIONALITY
   *
   * Functions which handle vital UI functionality such as main navigation and layout
   * They are auto initialized in every page
   *
   *********************************************************************************************
   */
  
  // User Interface init
  var uiInit = function () {
    // Set variables
    $lHtml              = jQuery('html');
    $lBody              = jQuery('body');
    $lPage              = jQuery('#page-container');
    $lSidebar           = jQuery('#sidebar');
    $lSidebarScroll     = jQuery('#sidebar-scroll');
    $lSideOverlay       = jQuery('#side-overlay');
    $lSideOverlayScroll = jQuery('#side-overlay-scroll');
    $lHeader            = jQuery('#header-navbar');
    $lMain              = jQuery('#main-container');
    $lFooter            = jQuery('#page-footer');
    
    // Initialize Tooltips
    jQuery('[data-toggle="tooltip"], .js-tooltip').tooltip(
      {
        container: 'body',
        animation: false
      }
    );
    
    // Initialize Popovers
    jQuery('[data-toggle="popover"], .js-popover').popover(
      {
        container: 'body',
        animation: true,
        trigger  : 'hover'
      }
    );
    
    // Initialize Tabs
    jQuery('[data-toggle="tabs"] a, .js-tabs a').click(
      function (e) {
        e.preventDefault();
        jQuery(this).tab('show');
      }
    );
    
    // Init form placeholder (for IE9)
    jQuery('.form-control').placeholder();
  };
  
  // Layout functionality
  var uiLayout = function () {
    // Resizes #main-container min height (push footer to the bottom)
    var $resizeTimeout;
    
    if ($lMain.length) {
      uiHandleMain();
      
      jQuery(window).on(
        'resize orientationchange', function () {
          clearTimeout($resizeTimeout);
          
          $resizeTimeout = setTimeout(
            function () {
              uiHandleMain();
            }, 150
          );
        }
      );
    }
    
    // Init sidebar and side overlay custom scrolling
    uiHandleScroll('init');
    
    // Init transparent header functionality (solid on scroll - used in frontend)
    if ($lPage.hasClass('header-navbar-fixed') && $lPage.hasClass('header-navbar-transparent')) {
      jQuery(window).on(
        'scroll', function () {
          if (jQuery(this).scrollTop() > 20) {
            $lPage.addClass('header-navbar-scroll');
          }
          else {
            $lPage.removeClass('header-navbar-scroll');
          }
        }
      );
    }
    
    // Call layout API on button click
    jQuery('[data-toggle="layout"]').on(
      'click', function () {
        var $btn = jQuery(this);
        
        uiLayoutApi($btn.data('action'));
        
        if ($lHtml.hasClass('no-focus')) {
          $btn.blur();
        }
      }
    );
  };
  
  // Resizes #main-container to fill empty space if exists
  var uiHandleMain = function () {
    var $hWindow = jQuery(window).height();
    var $hHeader = $lHeader.outerHeight();
    var $hFooter = $lFooter.outerHeight();
    
    if ($lPage.hasClass('header-navbar-fixed')) {
      $lMain.css('min-height', $hWindow - $hFooter);
    }
    else {
      $lMain.css('min-height', $hWindow - ($hHeader + $hFooter));
    }
  };
  
  // Handles sidebar and side overlay custom scrolling functionality
  var uiHandleScroll = function ($mode) {
    var $windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
    // Init scrolling
    if ($mode === 'init') {
      // Init scrolling only if required the first time
      uiHandleScroll();
      
      // Handle scrolling on resize or orientation change
      var $sScrollTimeout;
      
      jQuery(window).on(
        'resize orientationchange', function () {
          clearTimeout($sScrollTimeout);
          
          $sScrollTimeout = setTimeout(
            function () {
              uiHandleScroll();
            }, 150
          );
        }
      );
    }
    else {
      // If screen width is greater than 991 pixels and .side-scroll is added to #page-container
      if ($windowW > 991 && $lPage.hasClass('side-scroll')) {
        // Turn scroll lock off (sidebar and side overlay - slimScroll will take care of it)
        jQuery($lSidebar).scrollLock('disable');
        jQuery($lSideOverlay).scrollLock('disable');
        
        // If sidebar scrolling does not exist init it..
        if ($lSidebarScroll.length && (!$lSidebarScroll.parent('.slimScrollDiv').length)) {
          $lSidebarScroll.slimScroll(
            {
              height     : $lSidebar.outerHeight(),
              color      : '#fff',
              size       : '5px',
              opacity    : .35,
              wheelStep  : 15,
              distance   : '2px',
              railVisible: false,
              railOpacity: 1
            }
          );
        }
        else { // ..else resize scrolling height
          $lSidebarScroll
            .add($lSidebarScroll.parent())
            .css('height', $lSidebar.outerHeight());
        }
        
        // If side overlay scrolling does not exist init it..
        if ($lSideOverlayScroll.length && (!$lSideOverlayScroll.parent('.slimScrollDiv').length)) {
          $lSideOverlayScroll.slimScroll(
            {
              height     : $lSideOverlay.outerHeight(),
              color      : '#000',
              size       : '5px',
              opacity    : .35,
              wheelStep  : 15,
              distance   : '2px',
              railVisible: false,
              railOpacity: 1
            }
          );
        }
        else { // ..else resize scrolling height
          $lSideOverlayScroll
            .add($lSideOverlayScroll.parent())
            .css('height', $lSideOverlay.outerHeight());
        }
      }
      else {
        // Turn scroll lock on (sidebar and side overlay)
        jQuery($lSidebar).scrollLock('enable');
        jQuery($lSideOverlay).scrollLock('enable');
        
        // If sidebar scrolling exists destroy it..
        if ($lSidebarScroll.length && $lSidebarScroll.parent('.slimScrollDiv').length) {
          $lSidebarScroll
            .slimScroll({destroy: true});
          $lSidebarScroll
            .attr('style', '');
        }
        
        // If side overlay scrolling exists destroy it..
        if ($lSideOverlayScroll.length && $lSideOverlayScroll.parent('.slimScrollDiv').length) {
          $lSideOverlayScroll
            .slimScroll({destroy: true});
          $lSideOverlayScroll
            .attr('style', '');
        }
      }
    }
  };
  
  // Layout API
  var uiLayoutApi = function ($mode) {
    var $windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
    // Mode selection
    switch ($mode) {
      case 'sidebar_pos_toggle':
        $lPage.toggleClass('sidebar-l sidebar-r');
        break;
      case 'sidebar_pos_left':
        $lPage
          .removeClass('sidebar-r')
          .addClass('sidebar-l');
        break;
      case 'sidebar_pos_right':
        $lPage
          .removeClass('sidebar-l')
          .addClass('sidebar-r');
        break;
      case 'sidebar_toggle':
        if ($windowW > 991) {
          $lPage.toggleClass('sidebar-o');
        }
        else {
          $lPage.toggleClass('sidebar-o-xs');
        }
        break;
      case 'sidebar_open':
        if ($windowW > 991) {
          $lPage.addClass('sidebar-o');
        }
        else {
          $lPage.addClass('sidebar-o-xs');
        }
        break;
      case 'sidebar_close':
        if ($windowW > 991) {
          $lPage.removeClass('sidebar-o');
        }
        else {
          $lPage.removeClass('sidebar-o-xs');
        }
        break;
      case 'sidebar_mini_toggle':
        if ($windowW > 991) {
          $lPage.toggleClass('sidebar-mini');
        }
        break;
      case 'sidebar_mini_on':
        if ($windowW > 991) {
          $lPage.addClass('sidebar-mini');
        }
        break;
      case 'sidebar_mini_off':
        if ($windowW > 991) {
          $lPage.removeClass('sidebar-mini');
        }
        break;
      case 'side_overlay_toggle':
        $lPage.toggleClass('side-overlay-o');
        break;
      case 'side_overlay_open':
        $lPage.addClass('side-overlay-o');
        break;
      case 'side_overlay_close':
        $lPage.removeClass('side-overlay-o');
        break;
      case 'side_overlay_hoverable_toggle':
        $lPage.toggleClass('side-overlay-hover');
        break;
      case 'side_overlay_hoverable_on':
        $lPage.addClass('side-overlay-hover');
        break;
      case 'side_overlay_hoverable_off':
        $lPage.removeClass('side-overlay-hover');
        break;
      case 'header_fixed_toggle':
        $lPage.toggleClass('header-navbar-fixed');
        break;
      case 'header_fixed_on':
        $lPage.addClass('header-navbar-fixed');
        break;
      case 'header_fixed_off':
        $lPage.removeClass('header-navbar-fixed');
        break;
      case 'side_scroll_toggle':
        $lPage.toggleClass('side-scroll');
        uiHandleScroll();
        break;
      case 'side_scroll_on':
        $lPage.addClass('side-scroll');
        uiHandleScroll();
        break;
      case 'side_scroll_off':
        $lPage.removeClass('side-scroll');
        uiHandleScroll();
        break;
      default:
        return false;
    }
  };
  
  // Main navigation functionality
  var uiNav = function () {
    // When a submenu link is clicked
    jQuery('[data-toggle="nav-submenu"]').unbind("click").on(
      'click', function (e) {
        // Get link
        var $link = jQuery(this);
        
        // Get link's parent
        var $parentLi = $link.parent('li');
        
        if ($parentLi.hasClass('open')) { // If submenu is open, close it..
          $parentLi.removeClass('open');
        }
        else { // .. else if submenu is closed, close all other (same level) submenus first before open it
          $link
            .closest('ul')
            .find('> li')
            .removeClass('open');
          
          $parentLi
            .addClass('open');
        }
        
        // Remove focus from submenu link
        if ($lHtml.hasClass('no-focus')) {
          $link.blur();
        }
        
        return false;
      }
    );
  };
  
  // Blocks options functionality
  var uiBlocks = function () {
    // Init default icons fullscreen and content toggle buttons
    uiBlocksApi(false, 'init');
    
    // Call blocks API on option button click
    jQuery('[data-toggle="block-option"]').on(
      'click', function () {
        uiBlocksApi(jQuery(this).closest('.block'), jQuery(this).data('action'));
      }
    );
  };
  
  // Blocks API
  var uiBlocksApi = function ($block, $mode) {
    // Set default icons for fullscreen and content toggle buttons
    var $iconFullscreen       = 'si si-size-fullscreen';
    var $iconFullscreenActive = 'si si-size-actual';
    var $iconContent          = 'si si-arrow-up';
    var $iconContentActive    = 'si si-arrow-down';
    
    if ($mode === 'init') {
      // Auto add the default toggle icons to fullscreen and content toggle buttons
      jQuery('[data-toggle="block-option"][data-action="fullscreen_toggle"]').each(
        function () {
          var $this = jQuery(this);
          
          $this.html(
            '<i class="'
            + (jQuery(this).closest('.block').hasClass('block-opt-fullscreen') ? $iconFullscreenActive : $iconFullscreen)
            + '"></i>'
          );
        }
      );
      
      jQuery('[data-toggle="block-option"][data-action="content_toggle"]').each(
        function () {
          var $this = jQuery(this);
          
          $this.html('<i class="' + ($this.closest('.block').hasClass('block-opt-hidden') ? $iconContentActive : $iconContent) + '"></i>');
        }
      );
    }
    else {
      // Get block element
      var $elBlock = ($block instanceof jQuery) ? $block : jQuery($block);
      
      // If element exists, procceed with blocks functionality
      if ($elBlock.length) {
        // Get block option buttons if exist (need them to update their icons)
        var $btnFullscreen = jQuery('[data-toggle="block-option"][data-action="fullscreen_toggle"]', $elBlock);
        var $btnToggle     = jQuery('[data-toggle="block-option"][data-action="content_toggle"]', $elBlock);
        
        // Mode selection
        switch ($mode) {
          case 'fullscreen_toggle':
            $elBlock.toggleClass('block-opt-fullscreen');
            
            // Enable/disable scroll lock to block
            if ($elBlock.hasClass('block-opt-fullscreen')) {
              jQuery($elBlock).scrollLock('enable');
            }
            else {
              jQuery($elBlock).scrollLock('disable');
            }
            
            // Update block option icon
            if ($btnFullscreen.length) {
              if ($elBlock.hasClass('block-opt-fullscreen')) {
                jQuery('i', $btnFullscreen)
                  .removeClass($iconFullscreen)
                  .addClass($iconFullscreenActive);
              }
              else {
                jQuery('i', $btnFullscreen)
                  .removeClass($iconFullscreenActive)
                  .addClass($iconFullscreen);
              }
            }
            break;
          case 'fullscreen_on':
            $elBlock.addClass('block-opt-fullscreen');
            
            // Enable scroll lock to block
            jQuery($elBlock).scrollLock('enable');
            
            // Update block option icon
            if ($btnFullscreen.length) {
              jQuery('i', $btnFullscreen)
                .removeClass($iconFullscreen)
                .addClass($iconFullscreenActive);
            }
            break;
          case 'fullscreen_off':
            $elBlock.removeClass('block-opt-fullscreen');
            
            // Disable scroll lock to block
            jQuery($elBlock).scrollLock('disable');
            
            // Update block option icon
            if ($btnFullscreen.length) {
              jQuery('i', $btnFullscreen)
                .removeClass($iconFullscreenActive)
                .addClass($iconFullscreen);
            }
            break;
          case 'content_toggle':
            $elBlock.toggleClass('block-opt-hidden');
            
            // Update block option icon
            if ($btnToggle.length) {
              if ($elBlock.hasClass('block-opt-hidden')) {
                jQuery('i', $btnToggle)
                  .removeClass($iconContent)
                  .addClass($iconContentActive);
              }
              else {
                jQuery('i', $btnToggle)
                  .removeClass($iconContentActive)
                  .addClass($iconContent);
              }
            }
            break;
          case 'content_hide':
            $elBlock.addClass('block-opt-hidden');
            
            // Update block option icon
            if ($btnToggle.length) {
              jQuery('i', $btnToggle)
                .removeClass($iconContent)
                .addClass($iconContentActive);
            }
            break;
          case 'content_show':
            $elBlock.removeClass('block-opt-hidden');
            
            // Update block option icon
            if ($btnToggle.length) {
              jQuery('i', $btnToggle)
                .removeClass($iconContentActive)
                .addClass($iconContent);
            }
            break;
          case 'refresh_toggle':
            $elBlock.toggleClass('block-opt-refresh');
            
            // Return block to normal state if the demostration mode is on in the refresh option button - data-action-mode="demo"
            if (jQuery('[data-toggle="block-option"][data-action="refresh_toggle"][data-action-mode="demo"]', $elBlock).length) {
              setTimeout(
                function () {
                  $elBlock.removeClass('block-opt-refresh');
                }, 2000
              );
            }
            break;
          case 'state_loading':
            $elBlock.addClass('block-opt-refresh');
            break;
          case 'state_normal':
            $elBlock.removeClass('block-opt-refresh');
            break;
          case 'close':
            $elBlock.hide();
            break;
          case 'open':
            $elBlock.show();
            break;
          default:
            return false;
        }
      }
    }
  };
  
  // Material inputs helper
  var uiForms = function () {
    jQuery('.form-material.floating > .form-control').each(
      function () {
        var $input  = jQuery(this);
        var $parent = $input.parent('.form-material');
        
        setTimeout(
          function () {
            if ($input.val()) {
              $parent.addClass('open');
            }
          }, 150
        );
        
        $input.on(
          'change', function () {
            if ($input.val()) {
              $parent.addClass('open');
            }
            else {
              $parent.removeClass('open');
            }
          }
        );
      }
    );
  };
  
  // Set active color themes functionality
  var uiHandleTheme = function () {
    var $cssTheme = jQuery('#css-theme');
    var $cookies  = $lPage.hasClass('enable-cookies') ? true : false;
    
    // If cookies are enabled
    if ($cookies) {
      var $theme = Cookies.get('colorTheme') ? Cookies.get('colorTheme') : false;
      
      // Update color theme
      if ($theme) {
        if ($theme === 'default') {
          if ($cssTheme.length) {
            $cssTheme.remove();
          }
        }
        else {
          if ($cssTheme.length) {
            $cssTheme.attr('href', $theme);
          }
          else {
            jQuery('#css-main')
              .after('<link rel="stylesheet" id="css-theme" href="' + $theme + '">');
          }
        }
      }
      
      $cssTheme = jQuery('#css-theme');
    }
    
    // Set the active color theme link as active
    jQuery('[data-toggle="theme"][data-theme="' + ($cssTheme.length ? $cssTheme.attr('href') : 'default') + '"]')
      .parent('li')
      .addClass('active');
    
    // When a color theme link is clicked
    jQuery('[data-toggle="theme"]').on(
      'click', function () {
        var $this  = jQuery(this);
        var $theme = $this.data('theme');
        
        // Set this color theme link as active
        jQuery('[data-toggle="theme"]')
          .parent('li')
          .removeClass('active');
        
        jQuery('[data-toggle="theme"][data-theme="' + $theme + '"]')
          .parent('li')
          .addClass('active');
        
        // Update color theme
        if ($theme === 'default') {
          if ($cssTheme.length) {
            $cssTheme.remove();
          }
        }
        else {
          if ($cssTheme.length) {
            $cssTheme.attr('href', $theme);
          }
          else {
            jQuery('#css-main')
              .after('<link rel="stylesheet" id="css-theme" href="' + $theme + '">');
          }
        }
        
        $cssTheme = jQuery('#css-theme');
        
        // If cookies are enabled, save the new active color theme
        if ($cookies) {
          Cookies.set('colorTheme', $theme, {expires: 7});
        }
      }
    );
  };
  
  // Scroll to element animation helper
  var uiScrollTo = function () {
    jQuery('[data-toggle="scroll-to"]').on(
      'click', function () {
        var $this         = jQuery(this);
        var $target       = $this.data('target');
        var $speed        = $this.data('speed') ? $this.data('speed') : 1000;
        var $headerHeight = ($lHeader.length && $lPage.hasClass('header-navbar-fixed')) ? $lHeader.outerHeight() : 0;
        
        jQuery('html, body').animate(
          {
            scrollTop: jQuery($target).offset().top - $headerHeight
          }, $speed
        );
      }
    );
  };
  
  // Toggle class helper
  var uiToggleClass = function () {
    jQuery('[data-toggle="class-toggle"]').on(
      'click', function () {
        var $el = jQuery(this);
        
        jQuery($el.data('target').toString()).toggleClass($el.data('class').toString());
        
        if ($lHtml.hasClass('no-focus')) {
          $el.blur();
        }
      }
    );
  };
  
  // Add the correct copyright year
  var uiYearCopy = function () {
    var $date     = new Date();
    var $yearCopy = jQuery('.js-year-copy');
    
    if ($date.getFullYear() === 2016) {
      $yearCopy.html('2016');
    }
    else {
      $yearCopy.html('2016-' + $date.getFullYear().toString());
    }
  };
  
  // Manage page loading screen functionality
  var uiLoader = function ($mode) {
    var $lpageLoader = jQuery('#page-loader');
    
    if ($mode === 'show') {
      if ($lpageLoader.length) {
        $lpageLoader.fadeIn(250);
      }
      else {
        $lBody.prepend('<div id="page-loader"></div>');
      }
    }
    else if ($mode === 'hide') {
      if ($lpageLoader.length) {
        $lpageLoader.fadeOut(250);
      }
    }
    
    return false;
  };
  
  /*
   ********************************************************************************************
   *
   * UI HELPERS (ON DEMAND)
   *
   * Third party plugin inits or various custom user interface helpers to extend functionality
   * They need to be called in a page to be initialized. They are included here to be easy to
   * init them on demand on multiple pages (usually repeated init code in common components)
   *
   ********************************************************************************************
   */
  
  /*
   * Print Page functionality
   *
   * App.initHelper('print-page');
   *
   */
  var uiHelperPrint = function () {
    // Store all #page-container classes
    var $pageCls = $lPage.prop('class');
    
    // Remove all classes from #page-container
    $lPage.prop('class', '');
    
    // Print the page
    window.print();
    
    // Restore all #page-container classes
    $lPage.prop('class', $pageCls);
  };
  
  /*
   * Custom Table functionality such as section toggling or checkable rows
   *
   * App.initHelper('table-tools');
   *
   */
  
  // Table sections functionality
  var uiHelperTableToolsSections = function () {
    // For each table
    jQuery('.js-table-sections').each(
      function () {
        var $table = jQuery(this);
        
        // When a row is clicked in tbody.js-table-sections-header
        jQuery('.js-table-sections-header > tr', $table).on(
          'click', function (e) {
            var $row   = jQuery(this);
            var $tbody = $row.parent('tbody');
            
            if (!$tbody.hasClass('open')) {
              jQuery('tbody', $table).removeClass('open');
            }
            
            $tbody.toggleClass('open');
          }
        );
      }
    );
  };
  
  // Checkable table functionality
  var uiHelperTableToolsCheckable = function () {
    // For each table
    jQuery('.js-table-checkable').each(
      function () {
        var $table = jQuery(this);
        
        // When a checkbox is clicked in thead
        jQuery('thead input:checkbox', $table).on(
          'click', function () {
            var $checkedStatus = jQuery(this).prop('checked');
            
            // Check or uncheck all checkboxes in tbody
            jQuery('tbody input:checkbox', $table).each(
              function () {
                var $checkbox = jQuery(this);
                
                $checkbox.prop('checked', $checkedStatus);
                uiHelperTableToolscheckRow($checkbox, $checkedStatus);
              }
            );
          }
        );
        
        // When a checkbox is clicked in tbody
        jQuery('tbody input:checkbox', $table).on(
          'click', function () {
            var $checkbox = jQuery(this);
            
            uiHelperTableToolscheckRow($checkbox, $checkbox.prop('checked'));
          }
        );
        
        // When a row is clicked in tbody
        jQuery('tbody > tr', $table).on(
          'click', function (e) {
            if (e.target.type !== 'checkbox'
                && e.target.type !== 'button'
                && e.target.tagName.toLowerCase() !== 'a'
                && !jQuery(e.target).parent('label').length) {
              var $checkbox      = jQuery('input:checkbox', this);
              var $checkedStatus = $checkbox.prop('checked');
              
              $checkbox.prop('checked', !$checkedStatus);
              uiHelperTableToolscheckRow($checkbox, !$checkedStatus);
            }
          }
        );
      }
    );
  };
  
  // Checkable table functionality helper - Checks or unchecks table row
  var uiHelperTableToolscheckRow = function ($checkbox, $checkedStatus) {
    if ($checkedStatus) {
      $checkbox
        .closest('tr')
        .addClass('active');
    }
    else {
      $checkbox
        .closest('tr')
        .removeClass('active');
    }
  };
  
  /*
   * jQuery Appear, for more examples you can check out https://github.com/bas2k/jquery.appear
   *
   * App.initHelper('appear');
   *
   */
  var uiHelperAppear = function () {
    // Add a specific class on elements (when they become visible on scrolling)
    jQuery('[data-toggle="appear"]').each(
      function () {
        var $windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var $this    = jQuery(this);
        var $class   = $this.data('class') ? $this.data('class') : 'animated fadeIn';
        var $offset  = $this.data('offset') ? $this.data('offset') : 0;
        var $timeout = ($lHtml.hasClass('ie9') || $windowW < 992) ? 0 : ($this.data('timeout') ? $this.data('timeout') : 0);
        
        $this.appear(
          function () {
            setTimeout(
              function () {
                $this
                  .removeClass('visibility-hidden')
                  .addClass($class);
              }, $timeout
            );
          }, {accY: $offset}
        );
      }
    );
  };
  
  /*
   * jQuery Appear + jQuery countTo, for more examples you can check out https://github.com/bas2k/jquery.appear and https://github.com/mhuggins/jquery-countTo
   *
   * App.initHelper('appear-countTo');
   *
   */
  var uiHelperAppearCountTo = function () {
    // Init counter functionality
    jQuery('[data-toggle="countTo"]').each(
      function () {
        var $this     = jQuery(this);
        var $after    = $this.data('after');
        var $before   = $this.data('before');
        var $speed    = $this.data('speed') ? $this.data('speed') : 1500;
        var $interval = $this.data('interval') ? $this.data('interval') : 15;
        
        $this.appear(
          function () {
            $this.countTo(
              {
                speed          : $speed,
                refreshInterval: $interval,
                onComplete     : function () {
                  if ($after) {
                    $this.html($this.html() + $after);
                  }
                  else if ($before) {
                    $this.html($before + $this.html());
                  }
                }
              }
            );
          }
        );
      }
    );
  };
  
  /*
   * jQuery SlimScroll, for more examples you can check out http://rocha.la/jQuery-slimScroll
   *
   * App.initHelper('slimscroll');
   *
   */
  var uiHelperSlimscroll = function () {
    // Init slimScroll functionality
    jQuery('[data-toggle="slimscroll"]').each(
      function () {
        var $this     = jQuery(this);
        var $height   = $this.data('height') ? $this.data('height') : '200px';
        var $size     = $this.data('size') ? $this.data('size') : '5px';
        var $position = $this.data('position') ? $this.data('position') : 'right';
        var $color    = $this.data('color') ? $this.data('color') : '#000';
        var $avisible = $this.data('always-visible') ? true : false;
        var $rvisible = $this.data('rail-visible') ? true : false;
        var $rcolor   = $this.data('rail-color') ? $this.data('rail-color') : '#999';
        var $ropacity = $this.data('rail-opacity') ? $this.data('rail-opacity') : .3;
        
        $this.slimScroll(
          {
            height       : $height,
            size         : $size,
            position     : $position,
            color        : $color,
            alwaysVisible: $avisible,
            railVisible  : $rvisible,
            railColor    : $rcolor,
            railOpacity  : $ropacity
          }
        );
      }
    );
  };
  
  /*
   ********************************************************************************************
   *
   * All the following helpers require each plugin's resources (JS, CSS) to be included in order to work
   *
   ********************************************************************************************
   */
  
  /*
   * Magnific Popup functionality, for more examples you can check out http://dimsemenov.com/plugins/magnific-popup/
   *
   * App.initHelper('magnific-popup');
   *
   */
  var uiHelperMagnific = function () {
    // Simple Gallery init
    jQuery('.js-gallery').each(
      function () {
        jQuery(this).magnificPopup(
          {
            delegate: 'a.img-link',
            type    : 'image',
            gallery : {
              enabled: true
            }
          }
        );
      }
    );
    
    // Advanced Gallery init
    jQuery('.js-gallery-advanced').each(
      function () {
        jQuery(this).magnificPopup(
          {
            delegate: 'a.img-lightbox',
            type    : 'image',
            gallery : {
              enabled: true
            }
          }
        );
      }
    );
  };
  
  /*
   * CKEditor init, for more examples you can check out http://ckeditor.com/
   *
   * App.initHelper('ckeditor');
   *
   */
  var uiHelperCkeditor = function () {
    // Disable auto init when contenteditable property is set to true
    CKEDITOR.disableAutoInline = true;
    
    // Init inline text editor
    if (jQuery('#js-ckeditor-inline').length) {
      CKEDITOR.inline('js-ckeditor-inline');
    }
    
    // Init full text editor
    if (jQuery('#js-ckeditor').length) {
      CKEDITOR.replace('js-ckeditor');
    }
  };
  
  /*
   * Summernote init, for more examples you can check out http://summernote.org/
   *
   * App.initHelper('summernote');
   *
   */
  var uiHelperSummernote = function () {
    // Init text editor in air mode (inline)
    jQuery('.js-summernote-air').summernote(
      {
        airMode: true
      }
    );
    
    // Init full text editor
    jQuery('.js-summernote').summernote(
      {
        height   : 350,
        minHeight: null,
        maxHeight: null
      }
    );
  };
  
  /*
   * Slick init, for more examples you can check out http://kenwheeler.github.io/slick/
   *
   * App.initHelper('slick');
   *
   */
  var uiHelperSlick = function () {
    // Get each slider element (with .js-slider class)
    jQuery('.js-slider').each(
      function () {
        var $slider = jQuery(this);
        
        // Get each slider's init data
        var $sliderArrows    = $slider.data('slider-arrows') ? $slider.data('slider-arrows') : false;
        var $sliderDots      = $slider.data('slider-dots') ? $slider.data('slider-dots') : false;
        var $sliderNum       = $slider.data('slider-num') ? $slider.data('slider-num') : 1;
        var $sliderAuto      = $slider.data('slider-autoplay') ? $slider.data('slider-autoplay') : false;
        var $sliderAutoSpeed = $slider.data('slider-autoplay-speed') ? $slider.data('slider-autoplay-speed') : 3000;
        
        // Init slick slider
        $slider.slick(
          {
            arrows       : $sliderArrows,
            dots         : $sliderDots,
            slidesToShow : $sliderNum,
            autoplay     : $sliderAuto,
            autoplaySpeed: $sliderAutoSpeed
          }
        );
      }
    );
  };
  
  /*
   * Bootstrap Datepicker init, for more examples you can check out https://github.com/eternicode/bootstrap-datepicker
   *
   * App.initHelper('datepicker');
   *
   */
  var uiHelperDatepicker = function () {
    // Init datepicker (with .js-datepicker and .input-daterange class)
    jQuery('.js-datepicker').add('.input-daterange').datepicker(
      {
        weekStart     : 1,
        autoclose     : true,
        todayHighlight: true
      }
    );
  };
  
  /*
   * Bootstrap Colorpicker init, for more examples you can check out http://mjolnic.com/bootstrap-colorpicker/
   *
   * App.initHelper('colorpicker');
   *
   */
  var uiHelperColorpicker = function () {
    // Get each colorpicker element (with .js-colorpicker class)
    jQuery('.js-colorpicker').each(
      function () {
        var $colorpicker = jQuery(this);
        
        // Get each colorpicker's init data
        var $colorpickerMode   = $colorpicker.data('colorpicker-mode') ? $colorpicker.data('colorpicker-mode') : 'hex';
        var $colorpickerinline = $colorpicker.data('colorpicker-inline') ? true : false;
        
        // Init colorpicker
        $colorpicker.colorpicker(
          {
            'format': $colorpickerMode,
            'inline': $colorpickerinline
          }
        );
      }
    );
  };
  
  /*
   * Masked Inputs, for more examples you can check out http://digitalbush.com/projects/masked-input-plugin/
   *
   * App.initHelper('masked-inputs');
   *
   */
  var uiHelperMaskedInputs = function () {
    // Init Masked Inputs
    // a - Represents an alpha character (A-Z,a-z)
    // 9 - Represents a numeric character (0-9)
    // * - Represents an alphanumeric character (A-Z,a-z,0-9)
    jQuery('.js-masked-date').mask('99/99/9999');
    jQuery('.js-masked-date-dash').mask('99-99-9999');
    jQuery('.js-masked-phone').mask('(999) 999-9999');
    jQuery('.js-masked-phone-ext').mask('(999) 999-9999? x99999');
    jQuery('.js-masked-taxid').mask('99-9999999');
    jQuery('.js-masked-ssn').mask('999-99-9999');
    jQuery('.js-masked-pkey').mask('a*-999-a999');
    jQuery('.js-masked-time').mask('99:99');
  };
  
  /*
   * Tags Inputs, for more examples you can check out https://github.com/xoxco/jQuery-Tags-Input
   *
   * App.initHelper('tags-inputs');
   *
   */
  var uiHelperTagsInputs = function () {
    // Init Tags Inputs (with .js-tags-input class)
    jQuery('.js-tags-input').tagsInput(
      {
        height             : '36px',
        width              : '100%',
        defaultText        : 'Add tag',
        removeWithBackspace: true,
        delimiter          : [',']
      }
    );
  };
  
  /*
   * Select2, for more examples you can check out https://github.com/select2/select2
   *
   * App.initHelper('select2');
   *
   */
  var uiHelperSelect2 = function () {
    // Init Select2 (with .js-select2 class)
    jQuery('.js-select2').select2();
  };
  
  /*
   * Highlight.js, for more examples you can check out https://highlightjs.org/usage/
   *
   * App.initHelper('highlightjs');
   *
   */
  var uiHelperHighlightjs = function () {
    // Init Highlight.js
    hljs.initHighlightingOnLoad();
  };
  
  /*
   * Bootstrap Notify, for more examples you can check out http://bootstrap-growl.remabledesigns.com/
   *
   * App.initHelper('notify');
   *
   */
  var uiHelperNotify = function () {
    // Init notifications (with .js-notify class)
    jQuery('.js-notify').on(
      'click', function () {
        var $notify      = jQuery(this);
        var $notifyMsg   = $notify.data('notify-message');
        var $notifyType  = $notify.data('notify-type') ? $notify.data('notify-type') : 'info';
        var $notifyFrom  = $notify.data('notify-from') ? $notify.data('notify-from') : 'top';
        var $notifyAlign = $notify.data('notify-align') ? $notify.data('notify-align') : 'right';
        var $notifyIcon  = $notify.data('notify-icon') ? $notify.data('notify-icon') : '';
        var $notifyUrl   = $notify.data('notify-url') ? $notify.data('notify-url') : '';
        
        jQuery.notify(
          {
            icon   : $notifyIcon,
            message: $notifyMsg,
            url    : $notifyUrl
          },
          {
            element        : 'body',
            type           : $notifyType,
            allow_dismiss  : true,
            newest_on_top  : true,
            showProgressbar: false,
            placement      : {
              from : $notifyFrom,
              align: $notifyAlign
            },
            offset         : 20,
            spacing        : 10,
            z_index        : 1033,
            delay          : 5000,
            timer          : 1000,
            animate        : {
              enter: 'animated fadeIn',
              exit : 'animated fadeOutDown'
            }
          }
        );
      }
    );
  };
  
  /*
   * Draggable items with jQuery, for more examples you can check out https://jqueryui.com/sortable/
   *
   * App.initHelper('draggable-items');
   *
   */
  var uiHelperDraggableItems = function () {
    // Init draggable items functionality (with .js-draggable-items class)
    jQuery('.js-draggable-items > .draggable-column').sortable(
      {
        connectWith: '.draggable-column',
        items      : '.draggable-item',
        dropOnEmpty: true,
        opacity    : .75,
        handle     : '.draggable-handler',
        placeholder: 'draggable-placeholder',
        tolerance  : 'pointer',
        start      : function (e, ui) {
          ui.placeholder.css(
            {
              'height'       : ui.item.outerHeight(),
              'margin-bottom': ui.item.css('margin-bottom')
            }
          );
        }
      }
    );
  };
  
  /*
   * Easy Pie Chart, for more examples you can check out http://rendro.github.io/easy-pie-chart/
   *
   * App.initHelper('easy-pie-chart');
   *
   */
  var uiHelperEasyPieChart = function () {
    // Init Easy Pie Charts (with .js-pie-chart class)
    jQuery('.js-pie-chart').easyPieChart(
      {
        barColor  : jQuery(this).data('bar-color') ? jQuery(this).data('bar-color') : '#777777',
        trackColor: jQuery(this).data('track-color') ? jQuery(this).data('track-color') : '#eeeeee',
        lineWidth : jQuery(this).data('line-width') ? jQuery(this).data('line-width') : 3,
        size      : jQuery(this).data('size') ? jQuery(this).data('size') : '80',
        animate   : 750,
        scaleColor: jQuery(this).data('scale-color') ? jQuery(this).data('scale-color') : false
      }
    );
  };
  
  /*
   * Bootstrap Maxlength, for more examples you can check out https://github.com/mimo84/bootstrap-maxlength
   *
   * App.initHelper('maxlength');
   *
   */
  var uiHelperMaxlength = function () {
    // Init Bootstrap Maxlength (with .js-maxlength class)
    jQuery('.js-maxlength').each(
      function () {
        var $input = jQuery(this);
        
        $input.maxlength(
          {
            alwaysShow       : $input.data('always-show') ? true : false,
            threshold        : $input.data('threshold') ? $input.data('threshold') : 10,
            warningClass     : $input.data('warning-class') ? $input.data('warning-class') : 'label label-warning',
            limitReachedClass: $input.data('limit-reached-class') ? $input.data('limit-reached-class') : 'label label-danger',
            placement        : $input.data('placement') ? $input.data('placement') : 'bottom',
            preText          : $input.data('pre-text') ? $input.data('pre-text') : '',
            separator        : $input.data('separator') ? $input.data('separator') : '/',
            postText         : $input.data('post-text') ? $input.data('post-text') : ''
          }
        );
      }
    );
  };
  
  /*
   * Bootstrap Datetimepicker, for more examples you can check out https://github.com/Eonasdan/bootstrap-datetimepicker
   *
   * App.initHelper('datetimepicker');
   *
   */
  var uiHelperDatetimepicker = function () {
    // Init Bootstrap Datetimepicker (with .js-datetimepicker class)
    jQuery('.js-datetimepicker').each(
      function () {
        var $input = jQuery(this);
        
        $input.datetimepicker(
          {
            format         : $input.data('format') ? $input.data('format') : false,
            useCurrent     : $input.data('use-current') ? $input.data('use-current') : false,
            locale         : moment.locale('' + ($input.data('locale') ? $input.data('locale') : '') + ''),
            showTodayButton: $input.data('show-today-button') ? $input.data('show-today-button') : false,
            showClear      : $input.data('show-clear') ? $input.data('show-clear') : false,
            showClose      : $input.data('show-close') ? $input.data('show-close') : false,
            sideBySide     : $input.data('side-by-side') ? $input.data('side-by-side') : false,
            inline         : $input.data('inline') ? $input.data('inline') : false,
            icons          : {
              time    : 'si si-clock',
              date    : 'si si-calendar',
              up      : 'si si-arrow-up',
              down    : 'si si-arrow-down',
              previous: 'si si-arrow-left',
              next    : 'si si-arrow-right',
              today   : 'si si-size-actual',
              clear   : 'si si-trash',
              close   : 'si si-close'
            }
          }
        );
      }
    );
  };
  
  /*
   * Ion Range Slider, for more examples you can check out https://github.com/IonDen/ion.rangeSlider
   *
   * App.initHelper('rangeslider');
   *
   */
  var uiHelperRangeslider = function () {
    // Init Ion Range Slider (with .js-rangeslider class)
    jQuery('.js-rangeslider').each(
      function () {
        var $input = jQuery(this);
        
        $input.ionRangeSlider(
          {
            input_values_separator: ';'
          }
        );
      }
    );
  };
  
  /*
   * SimpleMDE init, for more examples you can check out https://github.com/NextStepWebs/simplemde-markdown-editor
   *
   * App.initHelper('simplemde');
   *
   */
  var uiHelperSimpleMDE = function () {
    // Init markdown editor (with .js-simplemde class)
    jQuery('.js-simplemde').each(
      function () {
        var el = jQuery(this);
        
        new SimpleMDE({element: el[0]});
      }
    );
  };
  
  return {
    init       : function ($func) {
      switch ($func) {
        case 'uiInit':
          uiInit();
          break;
        case 'uiLayout':
          uiLayout();
          break;
        case 'uiNav':
          uiNav();
          break;
        case 'uiBlocks':
          uiBlocks();
          break;
        case 'uiForms':
          uiForms();
          break;
        case 'uiHandleTheme':
          uiHandleTheme();
          break;
        case 'uiToggleClass':
          uiToggleClass();
          break;
        case 'uiScrollTo':
          uiScrollTo();
          break;
        case 'uiYearCopy':
          uiYearCopy();
          break;
        case 'uiLoader':
          uiLoader('hide');
          break;
        default:
          // Init all vital functions
          uiInit();
          uiLayout();
          uiNav();
          uiBlocks();
          uiForms();
          uiHandleTheme();
          uiToggleClass();
          uiScrollTo();
          uiYearCopy();
          uiLoader('hide');
      }
    },
    layout     : function ($mode) {
      uiLayoutApi($mode);
    },
    loader     : function ($mode) {
      uiLoader($mode);
    },
    blocks     : function ($block, $mode) {
      uiBlocksApi($block, $mode);
    },
    initHelper : function ($helper) {
      switch ($helper) {
        case 'print-page':
          uiHelperPrint();
          break;
        case 'table-tools':
          uiHelperTableToolsSections();
          uiHelperTableToolsCheckable();
          break;
        case 'appear':
          uiHelperAppear();
          break;
        case 'appear-countTo':
          uiHelperAppearCountTo();
          break;
        case 'slimscroll':
          uiHelperSlimscroll();
          break;
        case 'magnific-popup':
          uiHelperMagnific();
          break;
        case 'ckeditor':
          uiHelperCkeditor();
          break;
        case 'summernote':
          uiHelperSummernote();
          break;
        case 'slick':
          uiHelperSlick();
          break;
        case 'datepicker':
          uiHelperDatepicker();
          break;
        case 'colorpicker':
          uiHelperColorpicker();
          break;
        case 'tags-inputs':
          uiHelperTagsInputs();
          break;
        case 'masked-inputs':
          uiHelperMaskedInputs();
          break;
        case 'select2':
          uiHelperSelect2();
          break;
        case 'highlightjs':
          uiHelperHighlightjs();
          break;
        case 'notify':
          uiHelperNotify();
          break;
        case 'draggable-items':
          uiHelperDraggableItems();
          break;
        case 'easy-pie-chart':
          uiHelperEasyPieChart();
          break;
        case 'maxlength':
          uiHelperMaxlength();
          break;
        case 'datetimepicker':
          uiHelperDatetimepicker();
          break;
        case 'rangeslider':
          uiHelperRangeslider();
          break;
        case 'simplemde':
          uiHelperSimpleMDE();
          break;
        default:
          return false;
      }
    },
    initHelpers: function ($helpers) {
      if ($helpers instanceof Array) {
        for (var $index in $helpers) {
          AppTheme.initHelper($helpers[$index]);
        }
      }
      else {
        AppTheme.initHelper($helpers);
      }
    }
  };
}();

// Create an alias for App (you can use OneUI in your pages instead of App if you like)
window.OneUI = window.AppTheme;
