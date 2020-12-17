<template>
  <div class="background">
    <div class="square">
      <p style="font-size:35px; margin:80px auto 20px auto">注册</p>
      <div class="form">
        <div class="form-group">
          <input
            type="email"
            v-model="email"
            class="form-control email"
            id="email"
            placeholder="请输入邮箱"
            pattern="^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$"
            @keyup.delete="emailDelete"
            required
          />
          <div id="error1" class="invalid-feedback">请输入正确格式的邮箱</div>
          <div id="error2" class="invalid-feedback">该邮箱已被注册了QAQ</div>
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model="code"
            style="width:165px"
            class="form-control"
            id="code"
            placeholder="请输入验证码"
            maxlength="6"
            @keyup.delete="codeDelete"
            required
          />
          <button
            type="button"
            class="btn btn-warning"
            style="color:black; margin-left:10px;"
            @click="getCode"
          >
            获取验证码
          </button>
          <div id="error3" class="invalid-feedback">验证码错误</div>
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model="name"
            class="form-control"
            id="name"
            placeholder="请输入昵称"
            @keyup.delete="nameDelete"
            required
          />
          <div id="error4" class="invalid-feedback">不能包含特殊字符</div>
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="pwd"
            placeholder="请输入密码"
            pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$"
            @keyup.delete="pwdDelete"
            required
          />
          <div id="error5" class="invalid-feedback">
            请输入含有数字和字母的6-18位密码
          </div>
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="rePassword"
            class="form-control"
            id="checkPwd"
            placeholder="请再次输入密码"
            pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$"
            @keyup.delete="repwdDelete"
            required
          />
        </div>
        <div id="error6" class="invalid-feedback">两次输入的密码不一致</div>
        <button
          class="btn btn-warning"
          style="color:black; width:100px"
          @keyup.enter="submitButton"
          @click="submitButton()"
        >
          提交
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      email: "",
      code: "",
      name: "",
      password: "",
      rePassword: ""
    };
  },
  mounted: function() {
    $("#error1").hide();
    $("#error2").hide();
    $("#error3").hide();
    $("#error4").hide();
    $("#error5").hide();
    $("#error6").hide();
  },
  methods: {
    emailDelete() {
      $("#error1").hide();
      $("#error2").hide();
    },
    codeDelete() {
      $("#error3").hide();
    },
    nameDelete() {
      $("#error4").hide();
    },
    pwdDelete() {
      $("#error5").hide();
    },
    repwdDelete() {
      $("#error6").hide();
    },
    checkEmail(email) {
      const ref = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (ref.test(email) == false) {
        $("#error1").show();
      }
      return ref.test(email);
    },
    checkName(name) {
      return true;
    },
    checkPassword(pwd) {
      const ref = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/gi;
      const flag = ref.test(pwd);
      if (flag == false) {
        $("#error5").show();
      }
      return flag;
    },
    checkRewritePwd(re_pwd) {
      if (this.password != re_pwd) {
        $("#error6").show();
      }
      return this.password == re_pwd;
    },
    getCode() {
      const flag = this.checkEmail(this.email);
      if (flag) {
        $.ajax({
          url: `http://39.99.133.64:8100/user/register/token?mail=${this.email}`,
          method: "get",
          success: function(res) {},
          error: function(res) {
            if (res.responseJSON.status == "fail_3") {
              $("#error2").show();
            }
          }
        });
      }
    },
    pagejump() {
      this.$router.push({
        path: "/" //页面跳转
      });
    },
    submit() {
      $.ajax({
        method: "post",
        url: "http://39.99.133.64:8100/user/register",
        data: {
          mail: this.email,
          name: this.name,
          password: this.password,
          mail_token: this.code
        },
        success: function(res) {
          alert("注册成功！");
          this.pagejump();
        },
        error: function(res) {
          if (res.responseJSON.status == "fail_3") {
            $("#error3").show();
          }
        }
      });
    },
    submitButton: function() {
      var email = this.checkEmail(this.email);
      var name = this.checkName(this.name);
      var pwd = this.checkPassword(this.password);
      var repwd = this.checkRewritePwd(this.rePassword);
      if (email && name && pwd && repwd) {
        this.submit();
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
  height: 550px;
  border-radius: 15px;
}
.email {
  display: inline-block;
}
.form {
  margin: auto;
}
.invalid-feedback {
  color: red;
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
  color: #42b983;
}

input {
  width: 60%;
  height: 35px;
  display: inline-block;
  margin: 15px auto;
}
</style>
