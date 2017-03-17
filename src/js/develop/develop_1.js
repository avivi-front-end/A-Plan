function slickInit(){
    var slick =$('.slick-init');
    if(slick.length>0){
        slick.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
        slick.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var img = $('.slick-active').data('img');
            if (img!=undefined){$('.slider').attr('style','background-image: url('+img+');');}
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
                        arrows:false,
                        centerMode: true,

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
            all.removeClass('active');
            $(this).addClass('active');
            reinitSlider(slider);
        })
    }
}
function slidePrev(slider){
   var act = slider.find('li.active');
   if(act.prev().length>0){
       act.removeClass('active');
       act.prev().addClass('active');
       reinitSlider(slider);
   }
}
function slideNext(slider){
    var act = slider.find('li.active');
    if(act.next().length>0){
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
    if($('section.map').hasClass('watched')){$('.scrollbutton').addClass('hide')}else{$('.scrollbutton').removeClass('hide')}
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
function getTest() {
    var but = $('.radio__checkbutton button');
    if(but.length>0){
        but.click(function(){
            $('.radio__checkbutton').addClass('hide');
            $('.radio__table').addClass('show');
        });
    }
}
$(document).ready(function(){
    scrollButtonLogic();
    slickInit();
    radioLogic();
    getKoloText();
    koloSlider();
    googleMap('map');
    getTest();
});
$(window).scroll(function () {
    checkActiveSection();
    checkToHIdeScrollButton();
})

