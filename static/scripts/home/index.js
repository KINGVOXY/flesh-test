let height = $(window).height();
let posAbout = $("#about").offset().top;
let posWorks = $("#works").offset().top;
let posBlog = $("#blog").offset().top;
let posContact = $("#contact").offset().top;
let secNum = -1;

function addAndRmvClass(ele, addClass, rmClass) {
    $(ele).addClass(addClass);
    $(ele).removeClass(rmClass);
}

function activeNav(num) {
    for(i = 0; i < 5; i++) {
        $(".nav-item").eq(i).removeClass("active");    
    }
    $(".nav-item").eq(num).addClass("active");
}

function scrollToSec(pos) {
    $("html,body").animate({
        scrollTop: pos
    }, {
        queue: false
    });
}

function scrollBeh() {
    console.log("yaa");
    const nowTop = $(this).scrollTop();
    if (nowTop >= height) {
        addAndRmvClass("#header", "navbar-light", "navbar-dark");
        addAndRmvClass("#navbarDark", "bg-res-light", "bg-res-dark");
        addAndRmvClass(".nav-link > i", "text-dark", "text-light");
    } else {
        addAndRmvClass("#header", "navbar-dark", "navbar-light");
        addAndRmvClass("#navbarDark", "bg-res-dark", "bg-res-light");
        addAndRmvClass(".nav-link > i", "text-light", "text-dark");
    }

    if (nowTop < height) { // top
        if (secNum != 0) {
            activeNav(0);
            $("#greet").removeClass("op-0");
            $("#greet").addClass("fadeIn");
        }
        secNum = 0;
    } else if (nowTop < posWorks-height/2) { // about
        if (secNum != 1) {
            activeNav(1);
            $("#introBox").removeClass("op-0");
            $("#introBox").addClass("fadeIn");
        }
        secNum = 1;
    } else if (nowTop >= posWorks-height/2 && nowTop < posBlog-height/2) { // works
        if (secNum != 2) {
            activeNav(2);
            $("#worksList").removeClass("op-0");
            $("#worksList").addClass("fadeRight");
        }
        secNum = 2;
    } else if (nowTop >= posBlog-height/2 && nowTop < posContact-height/2) { // blog
        if (secNum != 3) {
            activeNav(3);
            $("#articleBox").removeClass("op-0");
            $("#articleBox").addClass("fadeUp");
        }
        secNum = 3;
    } else { // contact
        if (secNum != 4) {
            activeNav(4);
            $("#twicon").addClass("poyon");

        }
        secNum = 4;
    }
}

// 画面サイズ変更時のイベント
$(window).resize(function () {
    width = $(window).width() // 幅を取得
    height = $(window).height() // 高さを取得
    posAbout = $("#about").offset().top;
    posWorks = $("#works").offset().top;
    posBlog = $("#blog").offset().top;
    posContact = $("#contact").offset().top;
})

// スクロール位置でヘッダーの色を変える
$(window).scroll(scrollBeh);

scrollBeh();

$(".nav-link").eq(0).click(() => scrollToSec(0));
$(".nav-link").eq(1).click(() => scrollToSec(posAbout));
$(".nav-link").eq(2).click(() => scrollToSec(posWorks));
$(".nav-link").eq(3).click(() => scrollToSec(posBlog));
$(".nav-link").eq(4).click(() => scrollToSec(posContact));
$("#logoLink").click(() => scrollToSec(0));
$("#greet").click(() => scrollToSec(posAbout));
