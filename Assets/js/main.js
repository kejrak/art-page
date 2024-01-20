
/**
  * Hamburger menu
*/
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}



(function () {
    "use strict";


    /**
    * Hide preview
     */

    const element = document.getElementById("hideLi");
    const hidden = element.getAttribute("hidden");
    const { gsap, imagesLoaded } = window;

    function hidepreview(x) {
        if (x.matches) { // If media query matches
            element.setAttribute("hidden", "hidden");
        } else {
            element.removeAttribute("hidden");
        }
    }

    const x = window.matchMedia("(max-width: 768px)")
    hidepreview(x) // Call listener function at run time
    x.addListener(hidepreview)


    /**
    * Slideshow
    */

    var slideshowDuration = 4000;
    var slideshow = $('.slideshow');

    function slideshowSwitch(slideshow, index, auto) {
        if (slideshow.data('wait')) return;

        var slides = slideshow.find('.slide');
        var pages = slideshow.find('.slider-pagination');
        var activeSlide = slides.filter('.is-active');
        var activeSlideImage = activeSlide.find('.image-container');
        var newSlide = slides.eq(index);
        var newSlideImage = newSlide.find('.image-container');
        var newSlideContent = newSlide.find('.slide-content');
        var newSlideElements = newSlide.find('.caption > *');
        if (newSlide.is(activeSlide)) return;

        newSlide.addClass('is-new');
        var timeout = slideshow.data('timeout');
        clearTimeout(timeout);
        slideshow.data('wait', true);
        var transition = slideshow.attr('data-transition');
        if (transition == 'fade') {
            newSlide.css({
                display: 'block',
                zIndex: 2
            });
            newSlideImage.css({
                opacity: 0
            });

            TweenMax.to(newSlideImage, 1, {
                alpha: 1,
                onComplete: function () {
                    newSlide.addClass('is-active').removeClass('is-new');
                    activeSlide.removeClass('is-active');
                    newSlide.css({ display: '', zIndex: '' });
                    newSlideImage.css({ opacity: '' });
                    slideshow.find('.slider-pagination').trigger('check');
                    slideshow.data('wait', false);
                    if (auto) {
                        timeout = setTimeout(function () {
                            slideshowNext(slideshow, false, true);
                        }, slideshowDuration);
                        slideshow.data('timeout', timeout);
                    }
                }
            });
        } else {
            if (newSlide.index() > activeSlide.index()) {
                var newSlideRight = 0;
                var newSlideLeft = 'auto';
                var newSlideImageRight = -slideshow.width() / 8;
                var newSlideImageLeft = 'auto';
                var newSlideImageToRight = 0;
                var newSlideImageToLeft = 'auto';
                var newSlideContentLeft = 'auto';
                var newSlideContentRight = 0;
                var activeSlideImageLeft = -slideshow.width() / 4;
            } else {
                var newSlideRight = '';
                var newSlideLeft = 0;
                var newSlideImageRight = 'auto';
                var newSlideImageLeft = -slideshow.width() / 8;
                var newSlideImageToRight = '';
                var newSlideImageToLeft = 0;
                var newSlideContentLeft = 0;
                var newSlideContentRight = 'auto';
                var activeSlideImageLeft = slideshow.width() / 4;
            }

            newSlide.css({
                display: 'block',
                width: 0,
                right: newSlideRight,
                left: newSlideLeft
                , zIndex: 2
            });

            newSlideImage.css({
                width: slideshow.width(),
                right: newSlideImageRight,
                left: newSlideImageLeft
            });

            newSlideContent.css({
                width: slideshow.width(),
                left: newSlideContentLeft,
                right: newSlideContentRight
            });

            activeSlideImage.css({
                left: 0
            });

            TweenMax.set(newSlideElements, { y: 20, force3D: true });
            TweenMax.to(activeSlideImage, 1, {
                left: activeSlideImageLeft,
                ease: Power3.easeInOut
            });

            TweenMax.to(newSlide, 1, {
                width: slideshow.width(),
                ease: Power3.easeInOut
            });

            TweenMax.to(newSlideImage, 1, {
                right: newSlideImageToRight,
                left: newSlideImageToLeft,
                ease: Power3.easeInOut
            });

            TweenMax.staggerFromTo(newSlideElements, 0.8, { alpha: 0, y: 60 }, { alpha: 1, y: 0, ease: Power3.easeOut, force3D: true, delay: 0.6 }, 0.1, function () {
                newSlide.addClass('is-active').removeClass('is-new');
                activeSlide.removeClass('is-active');
                newSlide.css({
                    display: '',
                    width: '',
                    left: '',
                    zIndex: ''
                });

                newSlideImage.css({
                    width: '',
                    right: '',
                    left: ''
                });

                newSlideContent.css({
                    width: '',
                    left: ''
                });

                newSlideElements.css({
                    opacity: '',
                    transform: ''
                });

                activeSlideImage.css({
                    left: ''
                });

                slideshow.find('.slider-pagination').trigger('check');
                slideshow.data('wait', false);
                if (auto) {
                    timeout = setTimeout(function () {
                        slideshowNext(slideshow, false, true);
                    }, slideshowDuration);
                    slideshow.data('timeout', timeout);
                }
            });
        }
    }

    function slideshowNext(slideshow, previous, auto) {
        var slides = slideshow.find('.slide');
        var activeSlide = slides.filter('.is-active');
        var newSlide = null;
        if (previous) {
            newSlide = activeSlide.prev('.slide');
            if (newSlide.length === 0) {
                newSlide = slides.last();
            }
        } else {
            newSlide = activeSlide.next('.slide');
            if (newSlide.length == 0)
                newSlide = slides.filter('.slide').first();
        }

        slideshowSwitch(slideshow, newSlide.index(), auto);
    }

    function homeSlideshowParallax() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > windowHeight) return;
        var inner = slideshow.find('.slideshow-inner');
        var newHeight = windowHeight - (scrollTop / 2);
        var newTop = scrollTop * 0.8;

        inner.css({
            transform: 'translateY(' + newTop + 'px)', height: newHeight
        });
    }

    $(document).ready(function () {
        $('.slide').addClass('is-loaded');

        $('.slideshow .arrows .arrow').on('click', function () {
            slideshowNext($(this).closest('.slideshow'), $(this).hasClass('prev'));
        });

        $('.slideshow .slider-pagination .item').on('click', function () {
            slideshowSwitch($(this).closest('.slideshow'), $(this).index());
        });

        $('.slideshow .slider-pagination').on('check', function () {
            var slideshow = $(this).closest('.slideshow');
            var pages = $(this).find('.item');
            var index = slideshow.find('.slides .is-active').index();
            pages.removeClass('is-active');
            pages.eq(index).addClass('is-active');
        });

        var timeout = setTimeout(function () {
            slideshowNext(slideshow, false, true);
        }, slideshowDuration);

        slideshow.data('timeout', timeout);
    });

    if ($('.slideshow').length > 1) {
        $(window).on('scroll', homeSlideshowParallax);
    }




    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 500
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 20
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
    let selectHeader = select('#header')
    let selectNavMenu = select('.nav-menu')
    let selectHamburger = select('.hamburger')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 500) {
                selectHeader.classList.add('header-scrolled')
            }
            else {
                selectHeader.classList.remove('header-scrolled')
                selectNavMenu.classList.remove('active')
                selectHamburger.classList.remove('active')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)


    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            let header = select('#header')
            let offset = header.offsetHeight

            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            else if (!header.classList.contains('header-scrolled')) {
                header.classList.add('header-scrolled')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });


    /**
     * Hero type effect
     */
    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function (direction) {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                });
            }
        })
    }
    /**
       * Porfolio isotope and filter
       */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item',
                filter: '.filter-vyber',
                masonry: {
                    columnWidth: 50,
                    fitWidth: true,
                }
            });

            let portfolioFilters = select('#portfolio-flters li', true);

            on('click', '#portfolio-flters li', function (e) {
                e.preventDefault();
                portfolioFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                aos_init();
            }, true);
        }
    });


    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox',

    });

    portfolioLightbox.on('open', () => {
        selectHeader.classList.remove("header-scrolled");
    });

    portfolioLightbox.on('close', () => {
        selectHeader.classList.add("header-scrolled");
    })


    /**
     * Initiate portfolio details lightbox 
     */
    const portfolioDetailsLightbox = GLightbox({
        selector: '.portfolio-details-lightbox',
        width: '90%',
        height: '90vh'
    });

    /**
      * Portfolio details slider
      */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });


    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

})()




