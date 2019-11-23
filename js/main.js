/**
 * User: Nemanja Tomin (nemanja93tomin@gmail.com)
 * Web:  www.tomin-nemanja.startmeup.co.rs
 * Date: 11/13/2019
 * Time: 11:55 AM
 */
"use strict";
(function() {
    var mobileMenuTrigger = $('.navigation-trigger a:last-child');
    var articleWrapper = $('.article-wrapper');
    var articleInner = articleWrapper.find('.article-inner');
    var articleImg = articleWrapper.find('.article-image');
    var halfTitle = $('.title-block');
    var loadMoreButton = $('.load-more-button').find('a');
    var toggleRow = $('.toggle-row');
    var initials = $('.comment-content').find('h5');
    var initialsFlex = $('.comment-content-flex').find('h5');

    if(utilities.IsExisty($('.owl-carousel'))){
        $('.owl-carousel').owlCarousel({
            nav               : true,
            navText           : ["<", ">"],
            navSpeed          : 1400,
            dotsSpeed         : 1400,
            dragEndSpeed      : 1400,
            dots              : true,
            items             : 1,
            singleItem        : true,
            autoplay          : true,
            autoplayTimeout   : 4500,
            autoplaySpeed     : 1400,
            loop              : true,
            autoplayHoverPause: true
        });
    }

    /**
     * events
     */

    var headerContainer = $('.head-content-wrapper');
    var footerContainer = $('.footer-content-wrapper');

    headerContainer.load('header.html', function() {
        var mobileMenuTrigger = $('.navigation-trigger a:last-child');
        if(utilities.IsExisty(mobileMenuTrigger)){
            mobileMenuTrigger.click(function(ev) {
                var linksContainer = $('.mobile-links-list-container');
                var currentState = linksContainer.css('display');
                linksContainer.slideToggle();
                var icon = $(this).find('i');
                switch(currentState) {
                    case 'none':
                        icon.removeClass();
                        icon.addClass('fa fa-times');
                        return false;
                        break;
                    case 'block':
                        icon.removeClass();
                        icon.addClass('fa fa-bars');
                        break;
                }

            });
        }
    });

    footerContainer.load('footer.html');
    utilities.MoveExistingImagesToContainerBackgroundCover();

    $(window).load(function() {

        $(this).trigger('resize');


        articleImg.each(function() {
            var imgUrl = $(this).attr('style').split(';')[0].replace('background-image: url("', '').replace('");', '');
            $(this).wrap('<a href="' + imgUrl + '" data-lightbox="minimo" data-title="minimo slika"></a>');
        });

    });

    $(window).resize($.throttle(250, function() {
        utilities.EqualizeElementsHeightByRow(articleInner);
        utilities.EqualizeElementsHeightByRow(halfTitle);
    }));

    loadMoreButton.click(function() {
        if($(this).html() === 'Load more '){
            $(this).html('Show less ');
        }
        else {
            $(this).html('Load more ');
        }
        $(this).toggleClass('opened');
        toggleRow.toggleClass('opened');
    });

    initials.each(function() {
       var name = $(this).html().split(' ');
       var finalInitials = (name[0][0] + name[1][0]);
       var commentImage = $(this).closest('.comment-inner').find('.avatar-image');
       if(!commentImage.find('img').length){
           commentImage.html(finalInitials);
       }
    });

    initialsFlex.each(function() {
        var name = $(this).html().split(' ');
        var finalInitials = (name[0][0] + name[1][0]);
        var commentImage = $(this).closest('.comment-inner-flex').find('.avatar-image-flex');
        if(!commentImage.find('img').length){
            commentImage.html(finalInitials);
        }
    });
}());
