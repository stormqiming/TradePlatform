<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派更加合理一些 -->
      <div @mouseleave="leaveshow" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动结构||过渡动画效果-->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryName"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级，三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a>服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//按需引入：只是把需要的功能引入进来
import throttle from "lodash/throttle";
//vuex辅助函数mapState获取仓库数据
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  computed: {
    //mapState辅助函数中的对象右侧函数，注入的实参，是vuex的大仓库的state
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据
    // changeIndex(index) {
    //   // inddex:鼠标移上某一个一级分类的元素的索引值
    //   this.currentIndex = index;
    //   // 正常情况：(用户慢慢的操作)：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
    //   // 非正常情况：(用户操作很快)：本身全部的一级分类都应该触发进入事件，但是经过测试，只有部分h3触发
    //   // 就是由于用户的行为过快，导致浏览器反应不过来，如果当前的回调函数中有一些大量业务，有可能出现卡顿现象
    // },
    // throttle回调函数别用箭头函数，可能出现上下文this
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 一级分类鼠标移出的事件回调
    leaveshow() {
      // 鼠标移出，currentIndex变为-1
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案：编程式导航+事件委派
      // 利用事件委派存在一些问题：1.怎么知道点击的一定是a标签？2.如何获取参数【1，2，3级分类的产品的名字，id】
      // 1.解决：把子节点当中a标签，加上自定义属性data-categoryName,其余的子节点是没有的
      let element = event.target;
      // 获取到当前触发这个事件的节点：【h3,a,dt,dl】，需要带有data-categoryname这样的节点【一定是a标签】
      // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果标签身上拥有categoryname一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 怎么知道一级分类，二级分类，三级分类的a标签
        if (category1id) {
          query.category1id = category1id;
        }
      } else if (category2id) {
        query.category2id = category2id;
      } else {
        query.category3id = category3id;
      }
      // 判断：如果路由跳转的时候，带有params参数，也要传递过去
      if (this.$route.params) {
        location.params = this.$route.params;
        // 整理完参数
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
    // 当鼠标移入的时候，让商品分类进行展示
    entershow() {
      this.show = true;
    },
  },
  //组件挂载完毕
  mounted() {
    // 当组件挂载完毕，让show属性变为false
    // 如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
            &.cur {
              background: linear-gradient(
                to right,
                pink,
                yellow,
                cyan,
                blue,
                red
              );
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态(进入)
    .sort-enter {
      height: 0px;
    }
    // 过渡动画的结束状态(进入)
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间，速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>

