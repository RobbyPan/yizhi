<template>
  <div>
    <!-- Form -->
    <div class="login-box">
      <el-dialog
        title="登录"
        width="25%"
        top="30vh"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="loginForm">
          <el-form-item label="">
            <el-input
              type="text"
              v-model="loginForm.username"
              autocomplete="off"
              placeholder="请输入账号"
              @blur="loginJudge"
              @focus="focus"
            >
              <template slot="prepend">帐号</template>{{ loginForm.username }}
            </el-input>
          </el-form-item>
          <p class="sign" v-text="signMsg">
            {{ signMsg }}
          </p>
          <el-form-item label="">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
              placeholder="请输入密码"
            >
              <template slot="prepend">密码</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="innerVisible = true"
            >注册</el-button
          >
          <el-button type="primary" @click="loginSubmit()">登录</el-button>
        </div>

        <!-- 注册 -->
        <el-dialog
          width="25%"
          title="注册"
          :visible.sync="innerVisible"
          append-to-body
        >
          <el-form :model="registerForm">
            <el-form-item label="手机号">
              <el-input
                v-model="registerForm.username"
                type="text"
                placeholder="请输入手机号"
                @blur="registerJudge"
                @focus="focus"
              ></el-input>
            </el-form-item>
            <p class="sign" v-text="signMsg">
              {{ signMsg }}
            </p>
            <el-form-item label="密码">
              <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="确认密码"
                @blur="passwordJudge"
              ></el-input>
            </el-form-item>
            <p class="sign" v-text="passwordSign">
              {{ passwordSign }}
            </p>
            <el-form-item label="姓名">
              <el-input
                v-model="registerForm.name"
                type="text"
                placeholder="填入你的真实姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属单位（公司/学校）">
              <el-input
                v-model="registerForm.company"
                type="text"
                placeholder="填入你的所属单位"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取消</el-button>
            <el-button type="primary" @click="registerSubmit()"
              >注册账号</el-button
            >
          </div>
        </el-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      outerVisible: false,
      innerVisible: false,
      signMsg: "",
      passwordSign: "",
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        company: "",
        nameState: false,
        passwordState: false,
      },
    };
  },
  methods: {
    Dshow() {
      this.dialogFormVisible = true;
    },
    loginJudge() {
      var val = this.loginForm.username;
      if (val) {
        var re1 = /^14[4-9]\d{8}/;
        var re2 = /^15[0-3]|15[5-9]\d{8}/;
        var re3 = /^16[6,7]\d{8}/;
        var re4 = /^17[0,1]\d{8}|17[3-8]\d{8}/;
        var re5 = /^1[8,9]\d{9}/;
        var re6 = /^13\d{9}/;
        if (
          re1.test(val) ||
          re2.test(val) ||
          re3.test(val) ||
          re4.test(val) ||
          re5.test(val) ||
          re6.test(val)
        ) {
          this.signMsg = "";
        } else {
          this.signMsg = "请输入正确的手机号格式";
        }
      } else {
        this.signMsg = "";
      }
    },
    registerJudge() {
      var val = this.registerForm.username;
      if (val) {
        var re1 = /^14[4-9]\d{8}/;
        var re2 = /^15[0-3]|15[5-9]\d{8}/;
        var re3 = /^16[6,7]\d{8}/;
        var re4 = /^17[0,1]\d{8}|17[3-8]\d{8}/;
        var re5 = /^1[8,9]\d{9}/;
        var re6 = /^13\d{9}/;
        if (
          re1.test(val) ||
          re2.test(val) ||
          re3.test(val) ||
          re4.test(val) ||
          re5.test(val) ||
          re6.test(val)
        ) {
          this.signMsg = "";
          this.registerForm.nameState = true;
        } else {
          this.signMsg = "请输入正确的手机号格式";
        }
      } else {
        this.signMsg = "";
      }
    },
    passwordJudge() {
      if (this.registerForm.password && this.registerForm.confirmPassword) {
        if (this.registerForm.password == this.registerForm.confirmPassword) {
          this.passwordSign = "";
        } else {
          this.passwordSign = "请输入正确的密码";
        }
      }
    },
    focus() {
      this.signMsg = "";
    },
    loginSuccess() {
      this.$alert("登录成功", "登录", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    loginFail() {
      this.$alert("确认账号密码是否正确", "登录失败", {
        confirmButtonText: "确定",
      });
    },
    async loginSubmit() {
      let username = this.loginForm.username;
      let password = this.loginForm.password;
      let state = false;
      await axios({
        method: "post",
        url: "/login",
        data: {
          userID: username,
          userPassword: password,
        },
      })
        .then(function (res) {
          state = res.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      if (state == true) {
        localStorage.setItem("token", this.loginForm.username);
        document.cookie = `userID=${this.loginForm.username}`;
        this.loginSuccess();
        this.dialogFormVisible = false;
      } else {
        this.loginFail();
      }
    },
    registerSuccess() {
      this.$alert("注册成功", "注册", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    registerFail() {
      this.$alert("请输入2-20位密码", "注册失败", {
        confirmButtonText: "确定",
      });
    },
    async registerSubmit() {
      if (this.registerForm.password && this.registerForm.confirmPassword) {
        if (this.registerForm.password == this.registerForm.confirmPassword) {
          this.registerForm.passwordState = true;
        }
      }
      if (
        this.registerForm.nameState == true &&
        this.registerForm.passwordState == true &&
        this.registerForm.company &&
        this.registerForm.name
      ) {
        let username = this.registerForm.username;
        let password = this.registerForm.password;
        let name = this.registerForm.name;
        let company = this.registerForm.company;
        let state = false;
        await axios({
          method: "post",
          url: "/register",
          data: {
            userID: username,
            userPassword: password,
            trueName: name,
            organization: company,
          },
        })
          .then(function (res) {
            state = res.data;
          })
          .catch(function (err) {
            console.log(err);
          });
        if (state == true) {
          this.registerSuccess();
          innerVisible = false;
        } else {
          this.registerFail();
        }
      }
    },
  },
};
</script>

<style lang="less">
.sign {
  color: rgb(245, 57, 57);
}
</style>