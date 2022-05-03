<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 用户登录了，显示用户信息与退出登录 ||用户没有登录，显示的是登录与注册-->
          <p v-if="!userInfo">
            <span>请</span>
            <!-- 声明式导航务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <!-- <a>{{ userInfo.name }}</a> -->
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return { keyword: "" };
  },
  methods: {
    // 搜索按钮的回调函数：需要向search路由进行跳转
    goSearch() {
      // 路由传递参数
      // 1.字符串形式
      // this.$router.push(
      //   "/search/" + this.keyword + "?k=" + this.keyword.toUpperCase()
      // );
      // 2.模板字符串
      // this.$router.push(
      //   `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`
      // );
      // 3.对象的写法
      // this.$router.push({
      //   name: "search",
      //   params: { keyword: this.keyword || undefined },
      // });
      // -------
      // 面试题1：路由传递参数(对象写法),path是否可以结合params参数一起使用？
      // 答：路由跳转传递参数，对象的写法可以是name,path形式，但是需要注意的是，path这种写法不能与params参数一起使用
      // ------
      // 2.如何指定params参数可传可不传?
      // 如果路由要求传递params参数，但是你就是不传递params参数，发现一件事情，URL会有问题
      // 如果指定params参数可以传递，或不传递，在配置路由的时候，在占位的后面加上一个问号
      // ------
      // 3.params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
      // 使用undefined解决：params参数传空串
      // ------
      // 4.路由组件能不能传递props数据？
      // 可以的：3种写法

      // 代表的是如果有query参数也带过去
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$route.push(location);
      }
    },
  },
  mounted() {
    // 通过全局事件总线，清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>