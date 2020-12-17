<template>
  <div class="background" :style="background">
    <div class="row"></div>
    <div class="row">
      <div
        v-if="loginStatus"
        class="col-md-3 col-md-offset-8"
        style="padding:20px"
      >
        <router-link to="collect">
          <a style="display:inline-block;margin-left:50%">{{ username }}</a>
        </router-link>
      </div>
      <div v-else class="col-md-3 col-md-offset-8" style="padding:20px">
        <router-link to="register">
          <a style="display:inline-block;margin-left:50%">{{ register }}</a>
        </router-link>
        >
        <button class="login-btn">
          <a style="display:inline-block;margin-left:20px;">{{ login }}</a>
        </button>

      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <p style="font-size:60px; color:white">{{ title }}</p>
      </div>
    </div>
    <div class="row bar7">
      <div class="col-md-6 col-md-offset-3">
        <input
          placeholder="请输入关键词"
          @keyup.enter="search"
          v-model="keyword"
          type="text"
        />
        <button @click="search"></button>
      </div>
    </div>
  </div>
</template>

<script>
import "font-awesome/css/font-awesome.css";

export default {
  name: "home",
  data() {
    return {
      login: "login",
      register: "register",
      title: "A good Online Collection for animator",
      keyword: "",
      loginStatus: false,
      username: "Runtus",
      background: {
        backgroundImage: "url(" + require("../../src/assets/bg2.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }
    };
  },
  mounted() {
    const token = sessionStorage.getItem("token");
    if (token === "1") this.loginStatus = true;
    else this.loginStatus = false;
  },
  methods: {
    search() {
      this.$router.push({
        path: "/SearchResult", //页面跳转
        name: "SearchResult",
        params: { keyword: this.keyword } // 参数传值
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background {
  min-height: 768px;
}
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
  color: #ffffff;
  font-size: 20px;
}
a:hover {
  color: rgb(245, 179, 79);
  cursor: pointer;
}
/* .bar7 input {
  height: 36px;
  width: 350px;
  border-radius: 15px;
  border: 2px solid #324b4e;
  background: #f9f0da;
  padding-left: 5px;
  margin-left: 6%;
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
} */
.bar7 input {
  border-radius: 15px;
  height: 60px;
  width: 450px;
}
.bar7 button:before {
  content: "\f002";
  font-family: FontAwesome;
  color: #324b4e;
  font-size: 18px;
} 
</style>
