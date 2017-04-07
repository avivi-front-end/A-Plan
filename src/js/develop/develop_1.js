function checkBackground() {
    if( $('.slick-active')[0].hasAttribute('data-img')){
        $('.video').remove();
        var img = $('.slick-active').data('img');
        if (img!=undefined){$('.slider').attr('style','background-image: url('+img+');');}
    }else if($('.slick-active')[0].hasAttribute('data-video')){
        $('.video').remove();
        var vid = $('.slick-active').data('video');
        var html = '<video class="video"  playsinline autoplay muted loop><source src="'+vid+'" type="video/mp4"></video>';
        $('section.slider').prepend(html);
        $('.video').load();
    }
}
function slickInit(){
    var slick =$('.slick-init');
    if(slick.length>0){
        slick.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
        slick.on('afterChange', function(event, slick, currentSlide, nextSlide){
            checkBackground();

        });
    }
    var slick2 =$('.about__slider');
    if(slick2.length>0){
        slick2.slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1130,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 940,
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
    }
    var slick3 =$('.partners__slider');
    if(slick3.length>0){
        slick3.slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,


                    }
                }
            ]
        });
    }
    var slick4 =$('.why__slider');
    if(slick4.length>0){
        slick4.slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }
    var slick6 = $('.slider-wrap-about.mobile .about__left');
    if(slick6.length>0){
        slick6.slick({
            infinite: true,
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }
}
function radioLogic(){
    var radio = $('.radio__table__row__radio input[type=radio]');
    if(radio.length>0){

        radio.on('change', function () {
            $(this).closest('.radio__table__row').addClass('act');
            $(this).closest('.radio__table__row__radio').find('label').removeClass('active');
            if($(this).prop('checked')){
                $(this).closest('label').addClass('active');
            }
            if($('.radio__table__row.act').length == $('.radio__table__row').length){
                $.fancybox.open({
                    src:'#test-result',
                    opts:{}
                });
            }
        });
    }
}
function getKoloText() {
    if($('.kolo').length>0){
        $('.scripted-text').removeClass('show');
        var html = $('.kolo li.active').find('.kolo__txt').html();
        setTimeout(function () {
            $('.scripted-text').html(html);
            $('.scripted-text').addClass('show');
        },200);

    }

}
function koloSlider(){
    var slider = $('.koleso__slider');
    if(slider.length>0){
        var all = slider.find('li');
        $('.koleso__wraper .slick-prev').click(function () {
            slidePrev(slider);
        });
        $('.koleso__wraper .slick-next').click(function () {
            slideNext(slider);
        });
        all.click(function(){
            var ind = $('.kolo li.active').index();
            var ths = $(this).index();
            all.removeClass('active');
            $(this).addClass('active');
            var i = ths - ind;
            var j = Math.abs(i);
            console.log(i);
            if(i>0){
                $('.kolo').append($('.kolo li:lt('+j+')'));
            }else if(i!=0){
                j=j*-1;
                $('.kolo').prepend($('.kolo li').slice(j));
            }
            reinitSlider(slider);
        })
    }
}
function slidePrev(slider){
   var act = slider.find('li.active');
   if(act.prev().length>0){
       $('.kolo').prepend($('.kolo li:last-child'));
       act.removeClass('active');
       act.prev().addClass('active');
       reinitSlider(slider);
   }
}
function slideNext(slider){
    var act = slider.find('li.active');
    if(act.next().length>0){
        $('.kolo').append($('.kolo li:first-child'));
        act.removeClass('active');
        act.next().addClass('active');
        reinitSlider(slider);
    }
}
function reinitSlider(slider){
    var all = slider.find('li');
    all.removeClass('left0 left1 left2 left3 left4 left5 left6 left7 left8 left9 left10 left11 left12');
    var act = slider.find('li.active');
    var ind = act.index();
    all.each(function(index){
        var equal = 6-ind+index;
        $(this).addClass('left'+equal);
    });
    getKoloText();
}
function googleMap(mapWrap){
    function initialize() {
        var myLatlng = new google.maps.LatLng(cordX,cordY);
        var myOptions = {
            zoom: 16,
            scrollwheel: false,
            center: myLatlng,
            disableDefaultUI: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            }
        }
        var map = new google.maps.Map(document.getElementById(mapWrap), myOptions);
        var contentString = '<div class="marker-test">'+googleText+'</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', toggleBounce);
        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
    }
    initialize();
}
function checkActiveSection(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var sections = $('section');
    var wH = $(window).height() + scrollTop;
    sections.each(function(){
        var center = (($(this).outerHeight())/2) + $(this).offset().top;
        if(center > scrollTop && center < wH){
            sections.removeClass('watched');
            $(this).addClass('watched');
        }
    });
}
function checkToHIdeScrollButton() {
    if($('section.map').hasClass('watched')){
        $('.scrollbutton').addClass('hide');
        if($(window).width() < 992){$('.cw_body').addClass('hide');}
    }else{
        $('.scrollbutton').removeClass('hide');
        if($(window).width() < 992){$('.cw_body').removeClass('hide');}
    }
}
function checkToHIdeTopScrollButton() {
    if($('section.slider').hasClass('watched')){
        $('.topscrollbutton').addClass('hide');

    }else{
        $('.topscrollbutton').removeClass('hide')
    }
}
function scrollButtonLogic() {
    $('.scrollbutton').click(function () {
        if($('section.watched').next('section').length>0){
            var target = $('section.watched').next('section').offset().top;
        }else{
            var target = $('section').eq(1).offset().top;
        }

        $(scroller).stop().animate({scrollTop:target},800);
    });
}
function topScrollButtonLogic() {
    $('.topscrollbutton').click(function () {
        $(scroller).stop().animate({scrollTop:0},800);
    });
}
function getTest() {
    var but = $('.radio__checkbutton button');
    if(but.length>0){
        but.click(function(){
            $('.radio__checkbutton').addClass('hide');
            $('.radio__table').addClass('show');
        });
    }
}
function oneHeightInvest(){
    var cols = $('.invest__table li');
    if(cols.length>0){
        cols.find('.invest__row').each(function () {
            var maH = 0;
            var ind = $(this).index();
            cols.each(function () {
                var h = $(this).find('.invest__row').eq(ind).height();
                if (h>maH) maH = h;
            });
            cols.each(function () {
                $(this).find('.invest__row').eq(ind).height(maH);
            })
        });
    }
}
function oneHeightAplan(){
    var cols = $('.descwhy__col');
    if(cols.length>0){
        cols.find('.descwhy__row').each(function () {
            var maH = 0;
            var ind = $(this).index() - 1;

            cols.each(function () {
                var h = $(this).find('.descwhy__row').eq(ind).height();
                if (h>maH) maH = h;
            });
            cols.each(function () {
                $(this).find('.descwhy__row').eq(ind).height(maH);
            })
        });
    }
}
function initOnResize(){
    var slick = $('.slider-ul');
    if(slick.length>0 ){
        slick.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }
}
function stylerSelect() {
    var sel = $('.calc__item select');
    if(sel.length>0){
        sel.styler();
    }
}
function newRange(){
    var circle = $('.range__right');
    if(circle.length>0){
        var obj = {};
        var drag = false;
        var maxW = $('.range').width();
        obj.elem = $('.range__active');

        circle.on('mousedown touchstart', function (e) {
            if (e.which != 1) {   return; }
            obj.downX = e.pageX;
            drag = true;
            obj.elemW = $('.range__active').width();

        });
        circle.on('touchstart', function () {

            var touch = event.targetTouches[0];
            obj.downX = touch.pageX;
            drag = true;
            obj.elemW = $('.range__active').width();

        });
        document.onmousemove = function(e) {
            if ( drag ) {
                var moveX = e.pageX - obj.downX;
                var calc = moveX + obj.elemW;
                if(calc < maxW && calc >=0){
                    obj.elem.width(calc);
                    calculate();
                }
            }
        }
        document.addEventListener('touchmove', function() {

            if ( drag ) {

                var touch = event.targetTouches[0];
                var moveX =touch.pageX - obj.downX;
                var calc = moveX + obj.elemW;
                if(calc < maxW && calc >=0){
                    obj.elem.width(calc);
                    calculate();
                }
            }
        });
        document.onmouseup = function(e) {
            drag =false;
        }
        document.addEventListener('touchend',function(e) {
            drag =false;
        });
    }
}
function checkCalc() {
    var btns= $('.calc__button');
    if(btns.length>0){
        btns.click(function () {
            if(!$(this).hasClass('active')){
                btns.removeClass('active');
                $(this).addClass('active');
                var ind = $(this).index();
                $('.ippfiz option').eq(ind).prop('selected',true);
                $('.ippfiz').trigger('refresh');
                calculate();
            }
        });
        $('select.period').on('change', function () {  calculate();  });
        $('select.procent').on('change', function () {  calculate();  });
        $('select.ippfiz').on('change', function () {

            var ind = $(this).find('option:selected').index();
            $('.calc__button').removeClass('active');
            $('.calc__button').eq(ind).addClass('active');

            calculate();
        });
    }
}
function calculate() {
    var select= $('.ippfiz');
    if(select.length>0){
        var startLimit;
        $('.ippfiz option').each(function () {
            if($(this).prop('selected')){
                startLimit =parseInt($(this).val());
                var num = startLimit.toLocaleString();
                $('.calc__info-min .num').text(num);
            }
        });
        var maxW = $('.range').width();
        var elemW = $('.range__active').width();
        var maxLimit = 10000000;
        var x = ((maxLimit - startLimit)*elemW)/maxW;
        var investSum = parseInt(x + startLimit);
        var invest = investSum.toLocaleString();
        $('.calc__info-total .num').text(invest);
        var p = 0.174;
        var j= 30.4;
        var k= 365;
        var n ;
        var formula = 0;
        $('select.period option').each(function () {
            if($(this).prop('selected')){ n = parseInt($(this).val());}
        });
        $('select.procent option').each(function () {
            if($(this).prop('selected')){
                formula = parseInt($(this).val());
            }
        });
        if (formula == 0){
            var result = 1+((p*j)/k);
            var sum = investSum * (Math.pow(result, n));
        }else{
            var sum = investSum * p/k*j * n + investSum;
        }
        var month = sum/n;
        var percent = ((sum-investSum)/investSum)*100;
        $('.nums__total .num').text(parseInt(sum).toLocaleString());
        $('.nums__month .num').text(parseInt(month).toLocaleString());
        $('.percentage .num').text(percent.toFixed(2).toLocaleString());

    }
}
function butterClick(){
    var butter = $('.butter');
    if(butter.length >0){
        var menu = $('.slider__menu--mobile ul');
        butter.click(function(){
            $(this).toggleClass('active');
            if($(this).hasClass('active')){
                menu.slideDown();
            }else{
                menu.slideUp();
            }
        });

    }
}
function desctopBurger() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var needTop = $('section.slider').outerHeight() + $('section.slider').offset().top;
    var needBot = $('.footer').offset().top - $(window).height();
    if(scrollTop > needTop && scrollTop < needBot){
        $('.slider__menu--mobile').css('display','block');
    }else{
        $('.slider__menu--mobile').css('display','none');
    }
}
$(document).ready(function(){
    desctopBurger();
    butterClick();
    checkToHIdeTopScrollButton();
    calculate();
    checkCalc();
    newRange();
    stylerSelect();
    initOnResize();
    oneHeightInvest();
    oneHeightAplan();
    scrollButtonLogic();
    topScrollButtonLogic();
    slickInit();
    radioLogic();
    getKoloText();
    koloSlider();
    googleMap('map');
    getTest();
    if($('.slick-init').length > 0)checkBackground();
});
$(window).scroll(function () {
    checkActiveSection();
    checkToHIdeScrollButton();
    checkToHIdeTopScrollButton();
    desctopBurger();
})
function debouncer( func , timeout ) {
    var timeoutID , timeout = timeout || 200;
    return function () {
        var scope = this , args = arguments;
        clearTimeout( timeoutID );
        timeoutID = setTimeout( function () {
            func.apply( scope , Array.prototype.slice.call( args ) );
        } , timeout );
    }
}


$( window ).resize( debouncer( function ( e ) {
    oneHeightInvest();
} ) );
