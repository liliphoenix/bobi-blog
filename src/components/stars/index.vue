<template>
  <div>
    <canvas ref="star" id="star"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stars: Array(),
      stars_count: 300,
      context: null,
    };
  },
  mounted() {
    this.ini();
    this.makeStars();
    this.interval();
  },
  methods: {
    // 初始化
    interval() {
      setInterval(()=>{
        this.drawStars();
      }, 50);
    },
    ini() {
      const star = document.querySelector("#star")
      star.style.width = window.innerWidth+'px';
      star.style.height = window.innerHeight+'px';
      this.context = star.getContext("2d");
    },
    makeStars() {
      //随机生成星星数据
      const star = document.querySelector("#star")
      for (var i = 0; i < this.stars_count; i++) {
        let x = Math.random() * star.offsetWidth;
        let y = Math.random() * star.offsetHeight;
        let radius = Math.random() * 0.8;
        let color =
          "rgba(" +
          Math.random() * 255 +
          "," +
          Math.random() * 255 +
          "," +
          Math.random() * 255 +
          ",0.8)";
        let speed = Math.random() * 0.5;
        let arr = { x: x, y: y, radius: radius, color: color, speed: speed }; //（x,y,大小，颜色，速度）
        this.stars.push(arr); //随机生成的星星数据存在这里
      }
    },
    drawStars() {
      //把星星画到画布上
      const star = document.querySelector("#star")
      this.context.fillStyle = "#0e1729";
      this.context.fillRect(0, 0, star.width, star.height);
      for (var i = 0; i < this.stars.length; i++) {
        var x = this.stars[i]["x"] - this.stars[i]["speed"];
        if (x < -2 * this.stars[i]["radius"]) x = star.width;
        this.stars[i]["x"] = x;
        var y = this.stars[i]["y"];
        var radius = this.stars[i]["radius"];
        this.context.beginPath();
        this.context.arc(x, y, radius * 2, 0, 2 * Math.PI);
        this.context.fillStyle =
          "rgba(" +
          Math.random() * 255 +
          "," +
          Math.random() * 255 +
          "," +
          Math.random() * 255 +
          ",0.8)";
        this.context.fill();
      }
    },
  },
};
</script>

<style lang="less" scoped>
canvas {
  position: fixed; /*设置定位*/
  top: 0;
  left: 0;
  z-index: -1; /*使画布基于最低层*/
  background: #0e1729; /*画布背景色*/
}
</style>