$(window).load(function() {
  

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
    var fadeSpeed = 800;

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

(function($) {
    // This is the connector function.
    // It connects one item from the navigation carousel to one item from the
    // stage carousel.
    // The default behaviour is, to connect items with the same index from both
    // carousels. This might _not_ work with circular carousels!
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };

    $(function() {
        // Setup the carousels. Adjust the options for both carousels here.
        var carouselStage      = $('.carousel-stage').jcarousel();
        var carouselNavigation = $('.carousel-navigation').jcarousel();

        // We loop through the items of the navigation carousel and set it up
        // as a control for an item from the stage carousel.
        carouselNavigation.jcarousel('items').each(function() {
            var item = $(this);

            // This is where we actually connect to items.
            var target = connector(item, carouselStage);

            item
                .on('jcarouselcontrol:active', function() {
                    carouselNavigation.jcarousel('scrollIntoView', this);
                    $(item.prevAll('li')
                    .get()
                    .reverse())
                    .appendTo('.carousel-navigation ul');

                    //subtle slide back up to featured images
                    $('body').animate({
                      scrollTop: 0
                    }, 'slow');
                })
                .on('jcarouselcontrol:inactive', function() {
                    item.removeClass('active');
                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage
                });
        });

        // Setup controls for the stage carousel
        $('.prev-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });
    });
})(jQuery);





