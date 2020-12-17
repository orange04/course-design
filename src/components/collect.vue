<template>
  <div class="content">
    <div class="top">
      <div class="background">
        <img
          src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/blog/JavascriptCover.jpg"
        />
      </div>
      <div class="self-inf">
        <div class="head">
          <img alt="hh" src="../assets/tem.png" />
        </div>
        <div class="name">
          Runtus
        </div>
      </div>
    </div>

    <div class="favorite">
      <p>收藏</p>
    </div>
    <div class="search-bar">
      <div class="each" id="ea1">
        <div class="XJ">
          <img src="../assets/XJ.png" />
        </div>
        <div class="SC">
          新建文件夹
        </div>
      </div>
      <div class="each" id="ea2" @click="turn2">
        <div class="XJ">
          <img src="../assets/WJJ.png" />
        </div>
        <div class="SC" id="XJ1">
          文件夹1
        </div>
      </div>
      <div class="each" id="ea3" @click="turn3">
        <div class="XJ">
          <img src="@/assets/WJJ.png" />
        </div>
        <div class="SC" id="XJ2">
          文件夹2
        </div>
      </div>
    </div>
    <div id="content">
      <vue-waterfall-easy :imgsArr="imgsArr"></vue-waterfall-easy>
    </div>
  </div>
</template>

<script>
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  name: "headbar",
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      imgsArr_1: [
        {
          src:
            "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/highQua/1599038387219.png",
          href: "sdas",
          info: "sadasd"
        },
        {
          src:
            "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/highQua/1599035673265.png",
          href: "sadasd",
          info: "sadasd"
        },
        {
          src:
            "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/highQua/1599035524422.png",
          href: "sadasd",
          info: "sadasd"
        }
        // {
        // src : "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/highQua/1599035745063.png",
        // href : "sdsd",
        // info : "sdsd"
        //     },
        // {
        //     src : "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/highQua/pixiv15.jpg",
        //     href : "sdsd",
        //     info : "sdsd"
        // },
      ],
      imgsArr_2: [
        {
          src: "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/p27.jpg",
          href: "sdas",
          info: "sadasd"
        },
        {
          src:
            "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/highQua/1593918942101.png",
          href: "sadasd",
          info: "sadasd"
        },
        {
          src:
            "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/highQua/1599036918152.png",
          href: "sadasd",
          info: "sadasd"
        },
        {
          src:
            "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/highQua/pixiv15.jpg",
          href: "sadasd",
          info: "sadasd"
        }
      ],
      imgsArr: []
    };
  },
  methods: {
    turn3() {
      let ea3 = document.getElementById("ea3");
      let ea2 = document.getElementById("ea2");
      let font2 = document.getElementById("XJ1");
      let font3 = document.getElementById("XJ2");
      font2.style.color = "black";
      font3.style.color = "white";
      ea3.style.backgroundColor = "#1EBFFF";
      ea2.style.backgroundColor = "white";
      this.imgsArr = this.imgsArr_2;
    },

    turn2() {
      let ea3 = document.getElementById("ea3");
      let ea2 = document.getElementById("ea2");
      let font2 = document.getElementById("XJ1");
      let font3 = document.getElementById("XJ2");
      font3.style.color = "black";
      font2.style.color = "white";
      ea2.style.backgroundColor = "#1EBFFF";
      ea3.style.backgroundColor = "white";
      this.imgsArr = this.imgsArr_1;
    }
  },
  mounted() {
    this.imgsArr = this.imgsArr_1;
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 1500px;
  position: relative;
}

.top {
  height: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.self-inf {
  width: 10%;
  height: 100px;
  position: relative;
}

.self-inf {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
}
.head {
  width: 100%;
}

.head > img {
  border-radius: 100px;
  width: 100%;
  height: 100%;
}

.name {
  font-size: 50px;
  font-weight: 400;
  color: white;
}
.background {
  width: 100%;
  z-index: -1;
}

.background > img {
  border-radius: 30px;
  width: 100%;
  height: 100%;
}

.favorite {
  position: relative;
  width: 90%;
  margin: 100px auto;
}

.favorite > p {
  position: absolute;
  top: -80px;
  left: 10px;
  font-size: 40px;
}

#content {
  position: absolute; /*必须*/
  top: 700px; /*top必须，大小可控制*/
  bottom: 0; /*bottom必须，一直延申到当前块底部*/
  width: 90%;
  left: 16%;

  border-radius: 10px;
  background-color: rgba(230, 230, 230, 0.6);
}

.search-bar {
  border: 1px solid rgb(50, 50, 50);
  border-radius: 10px;
  width: 10%;
  height: 600px;
  /*background-color: rgba(244,244,244,0.9);*/
  margin-left: 5%;
}

.each {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-bottom: 1px rgb(100, 100, 100) solid;
  transition: background-color 0.5s ease-in-out;
}

.XJ {
  width: 25px;
  height: 25px;
}

.XJ > img {
  width: 100%;
  height: 100%;
}

#ea2 {
  background-color: #1ebfff;
  color: white;
}

.each:hover {
  background-color: rgba(81, 205, 255, 0.6);
}
</style>
