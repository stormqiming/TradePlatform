<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    ></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from "@/pages/Home/ListContainer/index.vue";
import Recommend from "@/pages/Home/Recommend/index.vue";
import Rank from "@/pages/Home/Rank/index.vue";
import Like from "@/pages/Home/Like/index.vue";
import Floor from "@/pages/Home/Floor/index.vue";
import Brand from "@/pages/Home/Brand/index.vue";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  methods: {},
  mounted() {
    // 派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
  },
};
</script>

<style>
</style>