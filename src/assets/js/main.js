new WOW().init();
wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    animateClass: 'animH', // default
    offset: 0, // default
    mobile: true, // default
    live: true // default
})
wow.init();


// All Sliader
$(document).ready(function () {
    "use strict";

    var mydir = $("html").attr("dir");

    if (mydir == 'rtl') {
        var isRTL = true
    }
    else {
        var isRTL = false
    }

    // Home Slider
    $('.home-slider').slick({
        slidesToShow: 1,
        centerMode: false,
        arrows: false,
        dots: false,
        rtl: isRTL,
        fade: true,
        cssEase: 'linear',
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    // News Slider
    $('.news-slider').slick({
        centerMode: false,
        dots: false,
        arrows: true,
        // autoplay: true,
        // autoplaySpeed: 2000,
        // centerPadding: '60px',
        slidesToShow: 3,
        rtl: isRTL,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        // Get the target tab pane
        var targetTab = $(e.target).attr('href');
        // Find the Slick slider within the target tab pane and reinitialize it
        $(targetTab).find('.news-slider').slick('setPosition');
    });

    // $('.news-slider').slick();

    // Counter Slider
    $('.counter-slider').slick({
        centerMode: false,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        // centerPadding: '60px',
        slidesToShow: 4,
        rtl: isRTL,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Gallery Slider
    $('.gallery-slider').slick({
        centerMode: true,
        arrows: true,
        dots: false,
        rtl: isRTL,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '24px',
                    centerMode: false,
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerMode: false,
                    centerPadding: '24px',
                    slidesToShow: 1
                }
            }
        ]
    });

    // Video Slider
    $('.video-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        rtl: isRTL,
        fade: true,
        asNavFor: '.video-slider-nav'
    });
    $('.video-slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        rtl: isRTL,
        arrows: false,
        asNavFor: '.video-slider',
        dots: false,
        focusOnSelect: true,
        verticalSwiping: true,
        responsive: [{
            breakpoint: 992,
            settings: {
                vertical: false,
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
                vertical: false,
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 580,
            settings: {
                vertical: false,
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 380,
            settings: {
                vertical: false,
                slidesToShow: 2,
            }
        }
        ]
    });

    //Nav
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 50) {
            $(".sticky").addClass("active");
        } else {
            $(".sticky").removeClass("active");
        }
    });

    //Header Search
    if ($('#search-trigger-desktop').length) {
        $('#search-trigger-desktop').on('click', function () {
            $('.header-site-search').addClass('search-open');
        });
        $('#search-close').on('click', function () {
            $('.header-site-search').removeClass('search-open');
        });
    }


    // Mobile Menu
    if ($('.mobile-menu').length) {

        $('.mobile-menu .menu-box');

        var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
        $('.sticky-header .main-menu').append(mobileMenuContent);

        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function () {
            $('body').addClass('mobile-menu-visible');
        });

        //Menu Toggle Btn
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () {
            $('body').removeClass('mobile-menu-visible');
        });
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () {
            $('body').removeClass('mobile-menu-visible');
        });

    }

    $(".mobile-menu .sub-menu").hide();
    $(".mobile-menu .menu-item-has-children > a").click(function (e) {
        // Close all open windows
        $(".sub-menu").stop().slideUp(300);
        // Toggle this window open/close
        $(this).next(".sub-menu").stop().animate({
            height: "toggle"
        });
        e.stopPropagation();
        e.preventDefault();
    });

    $(".user-name .user-dropdown").hide();
    $(".user-name .inner-block").click(function (e) {
        // Close all open windows
        $(".user-name .user-dropdown").stop().slideUp(300);
        // Toggle this window open/close
        $(this).next(".user-name .user-dropdown").stop().animate({
            height: "toggle"
        });
        e.stopPropagation();
        e.preventDefault();
    });

    $(".dropdown-not").hide();
    $(".btn-not").click(function (e) {
        // Close all open windows
        $(".dropdown-not").stop().slideUp(300);
        // Toggle this window open/close
        $(this).next(".dropdown-not").stop().animate({
            height: "toggle"
        });
        e.stopPropagation();
        e.preventDefault();
    });
    
    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");
        if (target === "#profile") {
            $(".search-more").hide();
            $(".btn-search-more").click(function (e) {
                $(".search-more").stop().slideUp(300);
                $(this).next(".search-more").stop().slideToggle(300);
                e.stopPropagation();
                e.preventDefault();
            });
        }
    });

    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var targetTab = $(e.target).attr('href');
        if (!targetTab) {
            targetTab = $(e.target).attr('data-bs-target');
        }
        
        if (!targetTab) {
            targetTab = $(e.target).closest('a[data-bs-toggle="tab"]').attr('href');
        }
        
        // Hide search-more within all tabs
        $(".search-more").hide();
    
        // Show search-more within the target tab
        $(targetTab).find(".search-more").hide();
    
        // Click handler for btn-search-more within the target tab
        $(targetTab).find(".btn-search-more").click(function (e) {
            // Toggle search-more within the clicked tab
            $(targetTab).find(".search-more").stop().slideToggle(300);
            e.stopPropagation();
            e.preventDefault();
        });
    });



    // FancyBox
    $('[data-fancybox="galleryPhoto"], [data-fancybox="galleryVideo"], [data-fancybox], [data-fancybox="gallerySingle]').fancybox();


    // niceSelect
    $('select.niceSelect').niceSelect();

    // DatePicker
    $(".datepicker").datepicker();

    // Password
    $(".toggle-password").click(function () {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    $('.file-upload').on('change', function (event) {
        var name = event.target.files[0].name;
        $('.file-name').text(name);
    })
});