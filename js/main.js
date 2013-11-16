$(window).load(function() {
  $('.scroll-pane').jScrollPane({
    autoReinitialise: true,
    verticalGutter: 0
  });

  //Keeping it responsive while avoiding vertical scroll bars ..always
  var verticalResize = function() {
    var mh = $(window).outerHeight(true) - $('.header').outerHeight(true) - $('.footer').outerHeight(true);
    var dh = $('.hover-img').height();

    $('.content, .section, .hover-img-container, .carousel img').css({
      'max-height': mh,
      'height': dh
    });
  };
  verticalResize();
  $(window).on('resize', verticalResize);

  //looks nav link click functionality
  $('#looks').click(function(e) {
    e.preventDefault();
    
    $('.looks-one').animate({
      left: '-500px',
      opacity: 0.5
    }, 900);
    
    $('.looks-two').animate({
      right: '-500px',
      opacity: 0.5
    }, 1000);

    var href = $(this).attr('href');

    // Delay setting the location for one second
    setTimeout(function() {window.location = href}, 750);
    return false;
  });


  // changing background image on dropdown link hover
  $('.dropdown li a').mouseenter(function() {
    $('.hover-img-container').css('z-index', '1');

    $('.' + this.id + '-hover').stop(true).animate({
      'opacity': 1
    }, 150);
    
  });
  $('.dropdown li a').mouseleave(function() {
    $('.' + this.id + '-hover').stop(true,true).animate({
      'opacity': 0
    }, 150);
  });
  
  $('.dropdown').mouseleave(function() {
    $('.hover-img-container').css('z-index', '-1');
  });


  // remove tel: and replace with callto: when using desktop browser
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('a[href^="tel:"]').click(function() {
      $(this).attr('href', 
      $(this).attr('href').replace(/^tel:/, 'callto:'));
    });
  }


  // carousel functionalty
  if($('.carousel li').length > 1) {
    var sliderTime = 6000; //How long each slide shows
    var fadeSpeed = 2000;

    // slider fade in and out animation
    $('.carousel li:gt(0)').hide();

    var myInterval = function() {
      return setInterval(function(){
        $('.carousel li:first-child').stop(true, true).fadeOut(fadeSpeed)
           .next('li').stop(true, true).fadeIn(fadeSpeed)
           .end().appendTo('.carousel');
      }, sliderTime);
    }
    var intervalHandler = myInterval();

    // show previous slide
    $('.arrow-previous').click(function(e) {
      e.preventDefault();
      clearInterval(intervalHandler);
      
      $('.carousel li:first-child').stop(true, true).fadeOut(fadeSpeed)
        .next('li').stop(true, true).fadeIn(fadeSpeed)
        .before().prependTo('.carousel');

      intervalHandler = myInterval();
    });

    // show next slide
    $('.arrow-next').click(function(e) {
      e.preventDefault();
      clearInterval(intervalHandler);
      
      $('.carousel li:first-child').stop(true, true).fadeOut(fadeSpeed)
        .next('li').stop(true, true).fadeIn(fadeSpeed)
        .end().appendTo('.carousel');

      intervalHandler = myInterval();
    });
  }

});



