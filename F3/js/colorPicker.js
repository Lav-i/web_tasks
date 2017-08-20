$(function() {
  $(".container").colorPicker();
});

(function($) {
  $.fn.colorPicker = function() {

    $(function() {
      init(); //初始化画布以及设置监听器
    });

    //初始化各项变量的初值
    var ribbonY = 0;
    var mapX = 0;
    var mapY = 0;
    var mainColor = "#ff0000"; //红色
    var r = 255, //取值范围（0,255）
      g = 0, //取值范围（0,255）
      b = 0, //取值范围（0,255）
      h = 0, //取值范围（0,1）
      s = 1, //取值范围（0,1）
      l = 0.5; //取值范围（0,1）

    //初始化函数
    function init() {
      installRB(); //初始化色带
      installCM(); //初始化色图

      //设置监听器
      $("#ribbon").on("mousedown", ribbonListener);
      $("#colorMap").on("mousedown", mapListener);
      $("#h").on("input porporpertychange", hListener);
      $("#s").on("input porporpertychange", sListener);
      $("#l").on("input porporpertychange", lListener);
      $("#r").on("input porporpertychange", rListener);
      $("#g").on("input porporpertychange", gListener);
      $("#b").on("input porporpertychange", bListener);

      //
      $("#ribbonBox").draggable({
        axis: "y", //只能在Y轴方向拖拽
        containment: "parent", //只能在父容器内拖拽
        drag: function(event, ui) {
          ribbonY = ui.position.top;
          h = ribbonY / 300; //根据坐标计算出色相
          $("#h").val(h.toFixed(2));

          toCSSColor(ribbonY); //计算css color
          s = 1; //重置s
          $("#s").val(1); //重置s
          installCM(); //重新设置色图
          toRGB(); //将RGB值传输到对应的位置
        }
      });
    }

    function installCM() {
      //根据rgb值转化为十六进制，设置画布主色调
      mainColor = "#" + format(r.toString(16), 2) + format(g.toString(16), 2) + format(b.toString(16), 2);
      var colorMap = document.getElementById("colorMap");
      var cxt = colorMap.getContext("2d");
      var grd = cxt.createLinearGradient(0, 0, 300, 300);

      //设置渐变颜色
      grd.addColorStop(0, "#ffffff");
      grd.addColorStop(0.5, mainColor);
      grd.addColorStop(1, "#000000");
      cxt.fillStyle = grd;
      cxt.fillRect(0, 0, 300, 300);
    }

    //用于补齐6位16进制数的位数
    function format(num, len) {
      var l = num.length;
      if (num.length < len) {
        for (var i = 0; i < len - l; i++) {
          num = "0" + num;
        }
      }
      return num;
    }

    function installRB() {
      var ribbon = document.getElementById("ribbon");
      var ribbonCont = ribbon.getContext("2d");
      var ribbonLG = ribbonCont.createLinearGradient(0, 0, 25, 300);

      //初始化色带颜色
      ribbonLG.addColorStop(0, "#ff0000");
      ribbonLG.addColorStop(0.167, "#ffff00");
      ribbonLG.addColorStop(0.333, "#00ff00");
      ribbonLG.addColorStop(0.5, "#00ffff");
      ribbonLG.addColorStop(0.667, "#0000ff");
      ribbonLG.addColorStop(0.833, "#ff00ff");
      ribbonLG.addColorStop(1, "#ff0000");
      ribbonCont.fillStyle = ribbonLG;
      ribbonCont.fillRect(0, 0, 25, 300);
    }

    function ribbonListener(event) {
      event.preventDefault();
      ribbonY = event.offsetY; //获取鼠标在色带上的坐标
      h = ribbonY / 300; //根据坐标计算出色相
      $("#h").val(h.toFixed(2));
      $("#ribbonBox").css("top", ribbonY - 5);

      toCSSColor(ribbonY); //计算CSS color
      s = 1; //重置s
      $("#s").val(1); //重置s
      installCM(); //重新设置色图
      toRGB(); //将RGB值传输到对应的位置

    }

    function mapListener(event) {
      event.preventDefault();

      //获取鼠标在色图上的坐标，计算出明度
      mapX = event.offsetX;
      mapY = event.offsetY;
      $("#mapBox").css({
        "left": mapX + 10,
        "top": mapY - 5
      });
      l = 1 - (mapX + mapY - 0.232) / 599.536;
      $("#l").val(l.toFixed(2)); //将明度传输到对应位置
      toRGB(); //将RGB值传输到对应的位置
    }

    //获取输入的h值，改变光标在色带上的位置，并重新设置色图
    function hListener() {
      h = Number($("#h").val());
      $("#ribbonBox").css("top", h * 300);
      toRGB();
      installCM();
    }

    //获取输入的s值
    //但是我觉得在色带上体现不出来s的值
    //只能重新设置色图
    function sListener() {
      s = Number($("#s").val());
      toRGB();
      installCM();
    }

    //获取输入的l值，重新设置色图光标的位置
    function lListener() {
      l = Number($("#l").val());
      mapX = mapY = (1 - l) * 299.768;
      $("#mapBox").css({
        "left": mapX + 10,
        "top": mapY - 5
      });
      toRGB();
    }

    //获取输入的r值，重新设置色图，并把对应的hsl输出到对应位置
    function rListener() {
      r = Number($("#r").val());
      installCM();
      toHSL(r, g, b);
    }

    //获取输入的g值，重新设置色图，并把对应的hsl输出到对应位置
    function gListener() {
      g = Number($("#g").val());
      installCM();
      toHSL(r, g, b);
    }

    //获取输入的b值，重新设置色图，并把对应的hsl输出到对应位置
    function bListener() {
      b = Number($("#b").val());
      installCM();
      toHSL(r, g, b);
    }

    //根据hsl值计算出对应的rgb值，并输出到位
    function toRGB() {
      var q, p;
      var t = new Array();
      if (s == 0) {
        r = g = b = l;
      } else {
        if (l < 0.5) q = l * (1.0 + s);
        if (l >= 0.5) q = l + s - l * s;
        p = 2.0 * l - q;
        t[0] = h + 0.3333333;
        t[1] = h;
        t[2] = h - 0.3333333;
        for (var i = 0; i < 3; i++) {
          if (t[i] < 0) t[i] += 1.0;
          if (t[i] > 1) t[i] -= 1.0;
          if ((t[i] * 6) < 1) {
            t[i] = p + ((q - p) * 6.0 * t[i]);
          } else if ((t[i] * 2.0) < 1) {
            t[i] = q;
          } else if ((t[i] * 3.0) < 2) {
            t[i] = p + (q - p) * ((2.0 / 3.0) - t[i]) * 6.0;
          } else t[i] = p;
        }
        r = t[0];
        g = t[1];
        b = t[2];
      }
      r = ((r > 1) ? 1 : ((r < 0) ? 0 : r)); //取值范围(0,1)
      g = ((g > 1) ? 1 : ((g < 0) ? 0 : g)); //取值范围(0,1)
      b = ((b > 1) ? 1 : ((b < 0) ? 0 : b)); //取值范围(0,1)
      r = parseInt(r * 255);
      g = parseInt(g * 255);
      b = parseInt(b * 255);
      $("#r").val(r);
      $("#g").val(g);
      $("#b").val(b);
    }

    //根据rgb值计算出对应的hsl值，并输出到位
    function toHSL(r, g, b) {
      r = r / 255;
      g = g / 255;
      b = b / 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      l = (max + min) / 2;
      if (max == min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h = h / 6;
      }
      if (l >= 0 && l <= 0.5) {
        s = d / (2 * l);
      } else if (l > 0.5) {
        s = d / (2 - 2 * l);
      }

      $("#h").val(h.toFixed(2));
      $("#s").val(s.toFixed(2));
      $("#l").val(l.toFixed(2));

      //根据计算出的hsl值，重新设置色带色图
      $("#ribbonBox").css("top", h * 300);
      mapX = mapY = (1 - l) * 299.768;
      $("#mapBox").css({
        "left": mapX + 10,
        "top": mapY - 5
      });
    }

    function toCSSColor(ribbonY) {
      //在色带上计算出完整的十六进制颜色代码
      if (ribbonY >= 0 && ribbonY < 50) {
        r = "ff";
        g = parseInt(ribbonY * 5.1);
        b = "00";
      } else if (ribbonY >= 50 && ribbonY < 100) {
        ribbonY = ribbonY - 50;
        r = parseInt(255 - ribbonY * 5.1);
        g = "ff"
        b = "00"
      } else if (ribbonY >= 100 && ribbonY <= 150) {
        ribbonY = ribbonY - 100;
        r = "00";
        g = "ff";
        b = parseInt(ribbonY * 5.1);
      } else if (ribbonY >= 150 && ribbonY <= 200) {
        ribbonY = ribbonY - 150
        r = "00";
        g = parseInt(255 - ribbonY * 5.1);
        b = "ff";
      } else if (ribbonY >= 200 && ribbonY <= 250) {
        ribbonY = ribbonY - 200
        r = parseInt(ribbonY * 5.1);
        g = "00";
        b = "ff";
      } else if (ribbonY >= 50 && ribbonY <= 300) {
        ribbonY = ribbonY - 250
        r = "ff";
        g = "00";
        b = parseInt(255 - ribbonY * 5.1);
      }
    }


  }
})(jQuery);
