var jjStorefront = (function (jQuery) {
    if (!jQuery) {
        alert(app.resources["MISSING_LIB"]);
        return null;
    }

    if (!window.console) console = {log: function() {}};

    return {

        // custom functions here
            assignGlobalVars : function () {
                window.gridContainer = $('#branded .content .storefront-categories .gridify');
            },

            initHero : function () {
                $('#branded .content .hero').owlCarousel({
                    singleItem: true,
                    autoPlay: true,
                    stopOnHover: true,
                    navigation: true,
                    navigationText: false,
                    pagination: false,
                    theme: 'jj-theme',
                    transitionStyle: 'fade'
                });
            },

            brandHover : function () {
                $('#branded .content .storefront-brands .brand').each(function(){
                    var width = $(this).find('.image').width(),
                        height = $(this).find('.image').height(),
                        newWidth = width + 10,
                        newHeight = height + 10;

                        $(this).find('.image').css('background-size', newWidth + 'px ' + newHeight + 'px');

                        $(this).hover(function(){
                            TweenMax.to($(this).find('.overlay'), 0.4, {opacity: 1});
                            TweenMax.to($(this).find('.image'), 0.4, {backgroundSize:  width + 'px ' + height + 'px'});
                            TweenMax.to($(this).find('.text'), 0.4, {delay: 0.2, opacity: 1, bottom: 15, right: 15});
                        }, function(){
                            TweenMax.to($(this).find('.overlay'), 0.3, {opacity: 0});
                            TweenMax.to($(this).find('.image'), 0.3, {backgroundSize: newWidth + 'px ' + newHeight + 'px'});    
                            TweenMax.to($(this).find('.text'), 0.3, {opacity: 0, bottom: 10, right: 10, overwrite: true});
                        });
                });
            },

            categoryHover : function () {
                $('#branded .content .storefront-categories .gridify .box .content').each(function(){
                    $(this).hover(function(){
                        TweenMax.to($(this).find('.text'), 0.6, {bottom: 0, backgroundColor: 'rgba(250, 250, 250, 0.8)'});
                        TweenMax.to($(this).find('.overlay'), 0.6, {opacity: 1});
                        TweenMax.staggerTo($(this).find('.slidein > *'), 0.6, {opacity: 1}, 0.08);
                    }, function(){
                        TweenMax.to($(this).find('.text'), 0.4, {bottom: -80, backgroundColor: 'rgba(250, 250, 250, 0.0)',});
                        TweenMax.to($(this).find('.overlay'), 0.4, {opacity: 0});
                        TweenMax.staggerTo($(this).find('.slidein > *').get().reverse(), 0.3, {opacity: 0}, 0.08);

                    });
                });
            },

            gridifyInit : function () {
                gridContainer.isotope({
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: 270
                    },
                    animationEngine: 'best-available',
                    animationOptions: {
                        duration: 300,
                        ease: 'swing'
                    },
                    getSortData: {
                        grid : function ($elem) {
                            return parseInt($elem.data('pos-grid'), 10);
                        }
                    } 
                });
            },

            gridifyMixed : function () {
                gridContainer.removeClass('large small').addClass('mixed');
                gridContainer.isotope('reLayout');
                gridContainer.isotope({sortBy: 'orginal-order'});
            },

            gridifyLarge : function () {
                gridContainer.removeClass('mixed small').addClass('large');
                gridContainer.isotope('reLayout');
                gridContainer.isotope({sortBy: 'grid'});
            },

            gridifySmall : function () {
                gridContainer.removeClass('mixed large').addClass('small');
                gridContainer.isotope('reLayout');
                gridContainer.isotope({sortBy: 'grid'});
            },

            controls : function () {
                $('#branded .content .storefront-misc .controls a').click(function(e){
                    e.preventDefault();
                    $('#branded .content .storefront-misc .controls a').removeClass('active');
                    $(this).addClass('active');

                    if ($(this).hasClass('mixed')) {
                        jjStorefront.gridifyMixed();
                    } else if ($(this).hasClass('large')) {
                        jjStorefront.gridifyLarge();
                    } else if ($(this).hasClass('small')) {
                        jjStorefront.gridifySmall();
                    }
                });
            }
        // end custom functions
    };
})(jQuery);

jQuery(document).ready(function () {
    jjStorefront.assignGlobalVars();
    jjStorefront.initHero();
    jjStorefront.brandHover();
    jjStorefront.categoryHover();
    jjStorefront.controls();
});

jQuery(window).load(function(){
    jjStorefront.gridifyInit();
});