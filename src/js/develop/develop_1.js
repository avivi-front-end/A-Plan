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


$(document).ready(function(){
    slickInit();
});

