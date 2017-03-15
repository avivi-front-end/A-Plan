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
            slidesToScroll: 1
        });
    }
    var slick3 =$('.partners__slider');
    if(slick3.length>0){
        slick3.slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1
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

$(document).ready(function(){
    slickInit();
    radioLogic();
    getKoloText();
    koloSlider();
    googleMap('map');
});

