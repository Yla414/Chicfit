var splide = new Splide( '.splide' );
splide.mount();

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:20,
    nav:true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        500:{
            items:2
        },
        600:{
            items:2
        },
        900:{
            items: 3
        },
        1000:{
            items:3
        },
        1200:{
            items:4
        }
    }
})