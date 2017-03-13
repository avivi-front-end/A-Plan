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

$(document).ready(function(){
    slickInit();
    radioLogic();
    getKoloText();
    koloSlider();
});

