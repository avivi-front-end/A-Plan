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
}
function radioLogic(){
    var radio = $('.radio__table__row__radio input[type=radio]');
    if(radio.length>0){
        radio.on('change', function () {
            $(this).closest('.radio__table__row').addClass('act');
        });
    }
}
function getKoloText() {
    if($('.kolo').length>0){
        var html = $('.kolo li.active').find('.kolo__txt').html();
        $('.scripted-text').html(html);
    }

}

$(document).ready(function(){
    slickInit();
    radioLogic();
    getKoloText();
});

