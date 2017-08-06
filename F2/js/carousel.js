var imgs = $(".img_ul");
var imgSize = imgs.children().length;
var index = 1;
var pre = 0;
var startX, stopX;

function show() {
  imgs.children().eq(index).fadeIn("slow");
  imgs.children().eq(pre).hide();
  pre = index;
  index++;
  if (index == imgSize) {
    index = 0;
  }
}

var timer = setInterval("show()", 3000);

$(".num_ul>li").hover(function() {
    clearInterval(timer);
    imgs.children().eq(pre).hide();
    pre = $(".num_ul>li").index(this);
    imgs.children().eq(pre).fadeIn("slow");
    index = pre + 1;
    if (index == imgSize) {
      index = 0;
    }
  },
  function() {
    timer = setInterval("show()", 3000);
  });

$("#prev").click(function() {
  index = pre;
  pre--;
  if (pre == -1) {
    pre = imgSize - 1;
  }
  imgs.children().eq(index).hide();
  imgs.children().eq(pre).fadeIn("slow");
});

$("#next").click(function() {
  imgs.children().eq(pre).hide();
  imgs.children().eq(index).fadeIn("slow");
  pre = index;
  index++;
  if (index == imgSize) {
    index = 0;
  }
});

$(".img").on("mousedown", function(event) {
  event.preventDefault();
  startX = event.pageX;
});

$(".img").on("mouseup", function(event) {
  event.preventDefault();
  stopX = event.pageX;
  eventEnd();
});

$(".img").on("touchstart", function(event) {
  event.preventDefault();
  startX = event.originalEvent.changedTouches[0].clientX;
});

$(".img").on("touchend", function(event) {
  event.preventDefault();
  stopX = event.originalEvent.changedTouches[0].clientX;
  eventEnd();
});

function eventEnd() {
  if (startX - stopX > 20) {
    $("#next").click();
  } else if (startX - stopX < -20) {
    $("#prev").click();
  }
}
