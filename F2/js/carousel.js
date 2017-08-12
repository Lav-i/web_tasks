(function($) {
  $.fn.carousel = function(id) {
    var imgs = null;
    var imgSize = 0;
    var index = 1;
    var pre = 0;
    var startX, stopX;
    var timer;

    $(document).ready(function() {
      imgs = $(".img_ul");
      imgSize = imgs.children().length;
      autoShow();
      slidingOnPC();
      slidingOnMobile();
      btnOnClick()
      $(".num_ul>li").hover(indexOnHover, autoShow);
    });

    function show() {
      imgs.children().eq(pre).fadeOut(500).css({
        "position": "absolute"
      });
      imgs.children().eq(index).fadeIn(2000).css({
        "position": "relative"
      });
      pre = index;
      index++;
      if (index == imgSize) {
        index = 0;
      }
    }

    function autoShow() {
      timer = setInterval(show, 3000);
    }

    function indexOnHover() {
      clearInterval(timer);
      imgs.children().eq(pre).fadeOut(500).css({
        "position": "absolute"
      });
      pre = $(".num_ul>li").index(this);
      imgs.children().eq(pre).fadeIn(2000).css({
        "position": "relative"
      });
      index = pre + 1;
      if (index == imgSize) {
        index = 0;
      }
    }

    function btnOnClick() {
      $("#btn_prev").click(function() {
        index = pre;
        pre--;
        if (pre == -1) {
          pre = imgSize - 1;
        }
        imgs.children().eq(index).fadeOut(500).css({
          "position": "absolute"
        });
        imgs.children().eq(pre).fadeIn(2000).css({
          "position": "relative"
        });
      });
      $("#btn_next").click(function() {
        imgs.children().eq(pre).fadeOut(500).css({
          "position": "absolute"
        });
        imgs.children().eq(index).fadeIn(2000).css({
          "position": "relative"
        });
        pre = index;
        index++;
        if (index == imgSize) {
          index = 0;
        }
      });
    }

    function slidingOnPC() {
      $(".img").on("mousedown", function(event) {
        event.preventDefault();
        startX = event.pageX;
      });
      $(".img").on("mouseup", function(event) {
        event.preventDefault();
        stopX = event.pageX;
        eventEnd();
      });
    }

    function slidingOnMobile() {
      $(".img").on("touchstart", function(event) {
        event.preventDefault();
        startX = event.originalEvent.changedTouches[0].clientX;
      });

      $(".img").on("touchend", function(event) {
        event.preventDefault();
        stopX = event.originalEvent.changedTouches[0].clientX;
        eventEnd();
      });
    }

    function eventEnd() {
      if (startX - stopX > 20) {
        $("#btn_next").click();
      } else if (startX - stopX < -20) {
        $("#btn_prev").click();
      }
    }
  };
})(jQuery);
