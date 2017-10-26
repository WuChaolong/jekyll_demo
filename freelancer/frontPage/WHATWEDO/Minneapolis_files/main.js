
$(document).ready(function(){

  $(window).scroll();

  var page_url = window.location.href;
  var page_hash = window.location.hash;

  if (page_hash) {
    $('html, body').animate({
      scrollTop:40
    }, function() {
      scroll_to_elem(page_hash);
    });
  }

  $('.main-content a[href*=#]:not([href=#])').on('click', function(e) {
    var hash = $(this.hash);
    if (hash) {
      e.preventDefault();
      scroll_to_elem(hash);
    }
  });

  $('.partner-logo img').each(function(){
    var $this = $(this);
    var $imgW = $this.width();
    var $imgH = $this.height();
    var $ratio = Math.floor($imgW / $imgH);
    $this.addClass('ratio-' + $ratio);
  });

  /******* Home page animation system ********/
  var states = [
    {'stateNum':'state0','stateName':''},
    {'stateNum':'state1','stateName':'Hunt'},
    {'stateNum':'state2','stateName':'Gather'},
    {'stateNum':'state3','stateName':'Build'}
  ];
  var currentState = 0;
  var previousState = -1;
  var animLength = 1500;

  $('head').append('<style>.animating * {transition-duration: ' + animLength + 'ms;}</style>');

  $('.trigger').on('click', function(e){

    e.preventDefault();

    var $trig = $(this);
    var $direction = $(this).attr('data-direction');

    if ($('#main-content').hasClass('static')) {
      // $trig.attr('disabled','disabled');
      do_state_change($direction, $trig);
    }

  });

  $('.intro-slide .icon-badge a[data-state]').on('click', function(e){

    e.preventDefault();

    var $trig = $(this);
    var $state = parseInt($(this).attr('data-state'));

    if ($('#main-content').hasClass('static')) {
      // $trig.attr('disabled','disabled');
      do_state_change($state, $trig);
    }

  });

  // $(window).bind('mousewheel', function(event) {
  //   if (event.originalEvent.wheelDelta >= 0) {
  //     if ($('.body-index #main-content').hasClass('static')) {
  //       do_state_change('up');
  //     }
  //   }
  //   else {
  //     if ($('.body-index #main-content').hasClass('static')) {
  //       // do_state_change('down');
  //     }
  //   }
  // });

  function do_state_change(direction, trigger) {

    previousState = currentState;
    if (direction == 'up') {
      if (currentState < (states.length - 1)) {
        currentState++;
      }
    } else if (direction == 'down') {
      if (currentState > 0) {
        currentState--;
      }
    } else {
      currentState = direction;
    }

    // console.log(currentState);

    if (currentState !== previousState) {
      $('#main-content').removeClass (function (index, css) {
        return (css.match (/(^|\s)state\S+/g) || []).join(' ');
      }).addClass(states[currentState].stateNum).toggleClass('animating static');

      setTimeout(function(){
        $('#main-content').toggleClass('animating static');
        if (trigger) {
          trigger.removeAttr('disabled');
        }
      }, animLength);
    }

  }

  /******* END Home page animation system ********/

  /******* MAIN MENU behavior *********/
  $('.menu-trigger').click( function(e) {
    e.stopPropagation();
    $('body').toggleClass('menu-open');
  });

  $('.main-content').click(function(){
    $('body').removeClass('menu-open');
  });

  $('.main-navigation a').click(function(e){
    e.preventDefault();
    $('body').removeClass('menu-open');
    var $link = $(this).attr('href');
    setTimeout(function(){
      window.location.href = $link;
    }, 300);
  });
  /******* END MAIN MENU behavior *********/

  /******* SERVICES BEHAVIOR **********/


//   $(".services-list-item-envelope").hover(
//     function () {
//       $(this).addClass('backpack-active').removeClass('backpack-static');
//     },
//     function () {
//       $(this).addClass('backpack-static').removeClass('backpack-active');
//     }
// );
  $(".services-list-item").hover(
    function () {
      $(this).addClass('backpack-active').removeClass('backpack-static');
    },
    function () {
      $(this).addClass('backpack-static').removeClass('backpack-active');
    }
);

$(".services-list-item").hover(
  function() {
      $(".services-list-item-envelope", this).toggleClass('envelope-hover');
    }
);

  /******* END SERVICES BEHAVIOR **********/

  /******* BIO behavior (OLD) *********/
  $('.badge-doug').click( function(e) {
    e.stopPropagation();
    $('body').addClass('doug-selected').removeClass('romeo-selected');
  });

  $('.badge-romeo').click( function(e) {
    e.stopPropagation();
    $('body').addClass('romeo-selected').removeClass('doug-selected');
  });

  $('.main-content').click(function(){
    $('body').removeClass('doug-selected romeo-selected');
  });
  /******* END MAIN MENU behavior *********/

  /******* PROCESS and CASE STUDY behavior *******/
  var sections = $('.process-group .process-section, .case-study-group .case-study-section');
  var viewports = $('.intro-viewport');
  var workViewports = $('.skills-viewport');
  // var badges = $('.process-badges');
  var skills = $('.skills-list');

  skills.each(function(i) {
    var $kids = $(this).children();
    $kids.each(function(i) {
      $(this).css('transition-delay', ((i+1)*50) + 'ms');
    });
  });

  // highlight section on scroll
  $(window).scroll(function() {

    page_at_top();
    // scale_logo();

    sections.each(function(i) {
      var $this = $(this);
      if ($this.isOnScreen()) {
        $this.addClass('active');
        $this.parent().addClass('section-' + (i + 1));
      } else {
        // $this.removeClass('active');
        // $this.parent().removeClass('section-' + (i + 1));
      }
    });

    // skills.each(function(i) {
    //   var $this = $(this);
    //   if ($this.isOnScreen()) {
    //     $this.addClass('active');
    //     $this.parent().addClass('skills-' + (i + 1));
    //   } else {
    //     $this.removeClass('active');
    //     $this.parent().removeClass('skills-' + (i + 1));
    //   }
    // });

    viewports.each(function(i) {
      var $this = $(this);
      if ($this.isOnScreen()) {
        $this.addClass('active');
      } else {
        // $this.removeClass('active');
      }
    });
    workViewports.each(function(i) {
      var $this = $(this);
      if ($this.isOnScreen()) {
        $this.addClass('active');
      } else {
        // $this.removeClass('active');
      }
    });

    // if (badges.length > 0) {
    //   if (badges.isOnScreen()) {
    //     badges.addClass('active');
    //   } else {
    //     badges.removeClass('active');
    //   }
    // }

  });

  /******* END WHAT WE DO behavior *******/

  /******* FORM VALIDATION *******/

  $('input[type="text"], input[type="email"], textarea, select').jvFloat();

  $('button[type="submit"]').on('click', function() {
    $('.ajax-form-messages')
      .removeClass('visible')
      .children()
        .remove();
  });

  $.validator.messages.required = '!';

  $('#contact-us-form')
    .prop('action', '/proc/ajax-contact-process.php')
    .validate({
      messages: {
        'contact[email]': {
          required: '!',
          email: '!'
        }
      },
      // errorPlacement: function(error, element){
      //   error.insertAfter(element);
      //   setTimeout(function() {
      //     error.addClass('visible');
      //   }, 10);
      // },
      submitHandler: function(form,event) {
        ajaxSubmit(form);
        event.preventDefault();
      }
    });

  $('#request-case-study-form')
    .prop('action', '/proc/ajax-request-process.php')
    .validate({
      messages: {
        'request[email]': {
          required: '!',
          email: '!'
        }
      },
      submitHandler: function(form,event) {
        ajaxSubmit(form);
        event.preventDefault();
      }
    });

  function ajaxSubmit(form) {

    var $form = $(form);
    var $btn = $form.find('button[type="submit"]');
    $btn.addClass('processing');

    $.ajax({
      type        : $form.attr('method'),
      url         : $form.attr('action'),
      data        : $form.serialize(),
      dataType    : 'json',
      encode      : true
    })
      .done(function(data) {
        // console.log(data);

        if ( ! data.success) {

          setTimeout(function(){
            $btn.removeClass('processing');
          }, 100);
          $.each(data.errors, function(i, val){
            $('.ajax-form-messages').append('<div>' + val + '</div>');
          });
          $('.ajax-form-messages').addClass('visible');


        } else {

          checkIfInView($form);
          $form.addClass('success');
          setTimeout(function(){
            $btn.removeClass('processing');
          }, 100);
          $form.prepend('<div class="form-alert-success"><span class="msg-icon"></span>' + data.message + '</div>');
          setTimeout(function(){
            $('.form-alert-success').addClass('visible');
          }, 200);

        }
      });

  }

  function checkIfInView(element){
    var offset = element.offset().top - $(window).scrollTop();
    if(offset > window.innerHeight){
      // Not in view so scroll to it
      $('html,body').animate({scrollTop: offset}, 300);
      return false;
    }
    return true;
  }

// RUN bxSlider Plugin

  $(document).ready(function(){
  $('.bxslider').bxSlider();
});

  /******* END FORM VALIDATION *******/

  // var $cs = $('.case-study-intro')
  // var $cs_height = $cs.height();
  // var $w_height = $(window).height();
  // var $ratio = $w_height / $cs_height;
  // $cs.find('.case-study-screens').css('width', ($ratio * 60) + '%');

});

var resizeTimer;

$(window).on('resize', function(e) {

  $('body').addClass('resizing');

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {

    // Run code here, resizing has "stopped"
    $('body').removeClass('resizing');

  }, 250);

});

$(window).load(function() {
  $('.partner-slider').flexslider({
    selector: ".partner-list > li",
    controlNav: false,
    directionNav: false,
    animationSpeed: 1500,
    // slideshow: false,
  });

  page_at_top();
});

function scroll_to_elem( hash ) {
  var headerHeight = $('.site-header').outerHeight();
  $('html, body').animate({
    scrollTop: $(hash).offset().top - (headerHeight - 1)
  }, 600);
}

function page_at_top() {
  var pos = $(window).scrollTop();
  if (pos <= 20) {
    $('body').addClass('at-top');
  } else {
    $('body').removeClass('at-top');
  }
}

function scale_logo() {
  var pos = $(window).scrollTop();
  var logo = $('.body-index .logo');
  var topmax = 20;
  var scalemax = 1.5;
  if (pos > 0) {
    var top = parseFloat(logo.css('top'));
    console.log(top);
    logo.css( {'top': (pos/2) + '%'} );
  }
}
