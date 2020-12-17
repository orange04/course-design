<template>
  <div class="background">
    <div class="square" style="margin-top:100px">
      <p style="font-size:35px">{{ loginText }}</p>
      <div class="form">
        <div class="form-group">
          <div id="error0" class="invalid-feedback">账户或密码不正确</div>
          <input
            type="email"
            v-model="email"
            class="form-control email"
            id="email"
            placeholder="请输入邮箱"
            @keyup.delete="emailDelete"
          />
          <div id="error1" class="invalid-feedback">请输入正确格式的邮箱</div>
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="pwd"
            placeholder="请输入密码"
            @keyup.delete="pwdDelete"
          />
        </div>
        <button
          style="color: black;width:100px"
          class="btn btn-warning"
          @keyup.enter="login"
          @click="login"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      loginText: "登录"
    };
  },
  mounted: function() {
    $("#error0").hide();
    $("#error1").hide();
  },
  methods: {
    emailDelete() {
      $("#error0").hide();
      $("#error1").hide();
    },
    pwdDelete() {
      $("#error0").hide();
    },
    checkEmail(email) {
      const ref = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (ref.test(email) == false) {
        $("#error1").show();
      }
      return ref.test(email);
    },
    pagejump() {
      this.$router.push({
        path: "/" //页面跳转
      });
    },
    login() {
      var email = this.checkEmail(this.email);
      var jump = 0;
      var that = this;
      if (email) {
        $.ajax({
          method: "post",
          url: "http://39.99.133.64:8100/user/login",
          data: {
            mail: this.email,
            password: this.password
          },
          success: function(res) {
            sessionStorage.setItem("token", "1");
            that.$router.push({
              path: "/" //页面跳转
            });
          },
          error: function(res) {
            if (res.status == "401") {
              $("#error0").show();
            }
          }
        });
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background {
  min-height: 728px;
}
.background::before {
  content: "";
  /*-webkit-filter: opacity(50%);  
            filter: opacity(50%); */
  background-image: url("~@/assets/bg0.jpg");
  opacity: 1;
  z-index: -1;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
.square {
  background-color: rgba(256, 256, 256, 0.7);
  margin: auto;
  width: 30%;
  height: 300px;
  border-radius: 15px;
}
.email {
  display: inline-block;
}
.form {
  margin: auto;
}
h1,
h2 {
  font-weight: normal;
  color: rgb(240, 234, 224);
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
  color: #42b983;
}

input {
  width: 60%;
  height: 35px;
  display: inline-block;
  margin: 15px auto;
}
</style>
