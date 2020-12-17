<template>
  <div id="background" class="background">
    <div class="row" style="margin:50px auto; top:0">
      <div class="col-md-1 col-md-offset-1">
        <p style="font-size:25px;">{{ title }}</p>
      </div>
      <div class="col-md-4 bar7" style="right:100px">
        <input
          placeholder="请输入关键词"
          v-model="keyword"
          type="text"
          @keyup.enter="search"
        />
        <button @click="search"></button>
      </div>
      <div v-if="loginStatus" class="col-md-6" style="right:-250px">
        <router-link to="collect">
          <a>{{ username }}</a>
        </router-link>
      </div>
      <div v-else class="col-md-6" style="right:-250px">
        <router-link to="login">
          <a>{{ login }}</a>
        </router-link>
        <span>|</span>
        <router-link to="register">
          <a>{{ register }}</a>
        </router-link>
      </div>
    </div>
    <div id="content">
      <vue-waterfall-easy
        :imgsArr="imgsArr"
        @scrollReachBottom="getData"
        style="position: fixed;"
        @click="turnTheHighQua"
        :isRouterLink="false"
        class="waterfallPhoto"
      >
        <div class="img-info">
          <img
            style="margin-left:180px;"
            @click="collectClick($event)"
            src="../assets/nocollect.png"
          />
        </div>
      </vue-waterfall-easy>
    </div>
  </div>
</template>

<script>
import "font-awesome/css/font-awesome.css";
import vueWaterfallEasy from "vue-waterfall-easy";
// import React, { useState } from "react";
// import { render } from "react-dom";
// import FilerobotImageEditor from "filerobot-image-editor";

export default {
  name: "SearchResult",
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      login: "登录",
      register: "注册",
      title: "综设",
      keyword: "",
      loginStatus: false,
      username: "Runtus",
      // photoUrl: require("../assets/nocollect.png"),
      imgsArr: [], //存放所有已加载图片的数组（即当前页面会加载的所有图片）
      fetchImgsArr: [], //存放每次滚动时下一批要加载的图片的数组
      page: 1,
      pageMini: 1,
      FileResult: {}
    };
  },
  // created() {
  //   this.keyword = this.$route.params.keyword;
  //   this.getData();
  // },
  created: function() {
    // this.keyword = this.$route.params.keyword;
    setTimeout(() => {
      this.initData(this.page, this.pageMini);
    }, 1000);
  },
  mounted() {
    const token = sessionStorage.getItem("token");
    if (token === "1") this.loginStatus = true;
    else this.loginStatus = false;
    // var that = this;
    // window.addEventListener("scroll", () => {
    //   if (
    //     window.pageYOffset + window.innerHeight ===
    //     document.body.scrollHeight
    //   ) {
    //     console.log("到达底部");
    //     that.pageMini++;
    //     this.initData(this.page, this.pageMini);
    //     if (that.pageMini === 3) {
    //       that.pageMini = 0;
    //       that.page++;
    //     }
    //   }
    // });
  },
  methods: {
    // editPhoto() {
    //   const ImageEditor = new FilerobotImageEditor();
    //   ImageEditor.open(
    //     "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2576431135,2348827820&fm=26&gp=0.jpg"
    //   );
    // },
    // Photo() {
    //   const App = () => {
    //     const src =
    //       "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2576431135,2348827820&fm=26&gp=0.jpg";
    //     const [show, toggle] = useState(false);

    //     return (
    //       <div>
    //         <h1>Filerobot Image Editor</h1>

    //         <img
    //           src={src}
    //           onClick={() => {
    //             toggle(true);
    //           }}
    //           alt="example image"
    //         />

    //         <FilerobotImageEditor
    //           show={show}
    //           src={src}
    //           onClose={() => {
    //             toggle(false);
    //           }}
    //         />
    //       </div>
    //     );
    //   };
    //   render(<App />, document.getElementById("app"));
    // },
    initData(page, pageMini) {
      var that = this;
      this.keyword = this.$route.params.keyword;
      console.log(this.keyword);
      console.log(".................");
      $.ajax({
        method: "get",
        url:
          `http://127.0.0.1:8100/photo/search?tag=${this.keyword}` +
          `&pageNum=${page}` +
          `&pageMini=${pageMini}`,
        success: function(res) {
          // debugger;
          var dataList = res;
          // debugger;
          // console.log(Array.isArray(dataList));
          console.log(that.imgsArr + "数组能打印");
          for (let list of dataList) {
            console.log("正在处理: ", list);
            var picObj = {
              src: "",
              href: "",
              info: ""
            };
            picObj["src"] = list.OSS;
            picObj["href"] = list.title;
            picObj["info"] = list.imageId;
            that.imgsArr.push(picObj);
          }

          if (that.pageMini != 3) {
            that.pageMini++;
          } else {
            that.pageMini = 1;
            that.page++;
          }
          console.log(that.imgsArr);
        },
        error: function(res) {
          alert("failed");
        }
      });
    },
    clean() {
      this.page = 1;
      this.pageMini = 1;
    },
    search() {
      this.clean();
      console.log(this.keyword);
      console.log(".................");
    },
    getData() {
      this.initData(this.page, this.pageMini);
    },
    turnTheHighQua(event, { index, value }) {
      event.preventDefault();
      var that = this;
      console.log(value);
      $.ajax({
        method: "GET",
        url: `http://127.0.0.1:8100/photo/search/highQuaImage?imageId=${value.info}`,
        success(res) {
          console.log(res.data);
          that.$router.push({
            path: "/editPhoto", //页面跳转
            name: "editPhoto",
            params: { imageid: res.data } // 参数传值
          });
        },
        fail(err) {
          console.log(err);
        }
      });
    },
    collectClick: function(e) {
      e.target.src = require("../assets/collect.png");
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* #background {
  background: -webkit-linear-gradient(top, rgb(224, 213, 255), white);
} */
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: black;
  font-size: 15px;
}
a:hover {
  color: rgb(245, 179, 79);
  cursor: pointer;
}
#content {
  position: absolute; /*必须*/
  top: 142px; /*top必须，大小可控制*/
  bottom: 0; /*bottom必须，一直延申到当前块底部*/
  width: 100%;
}
.water {
  width: 1240px;
  margin-top: 60px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 100px;
}
.piping {
  width: 25%;
  padding: 10px;
  padding-bottom: 0px;
}
.card {
  width: 290px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #888888;
  margin-bottom: 20px;
}
.card img:first-child {
  width: 100%;
  border-radius: 5px;
}
.card img:first-child div:nth-child(2) {
  display: flex;
  align-items: center;
  padding: 10px;
}
.card img:first-child div:nth-child(2) img {
  border-radius: 100%;
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
.photo {
  max-width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
}
.bar7 input {
  height: 36px;
  width: 350px;
  border-radius: 15px;
  border: 2px solid #324b4e;
  background: #f9f0da;
  padding-left: 5px;
  margin-left: 3.5%;
}
.bar7 button {
  background: none;
  border: none;
  outline: none;
  right: 45px;
  position: relative;
  cursor: pointer;
}
.bar7 button:before {
  content: "\f002";
  font-family: FontAwesome;
  color: #324b4e;
  font-size: 18px;
}
</style>
