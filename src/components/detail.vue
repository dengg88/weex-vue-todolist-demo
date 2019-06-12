<template>
    <div class="wrp">
    <div class="nav-bar">
      <text class="iconfont" @click="onBack" >&#xe600;</text>
      <text class="title">事件详情</text>
      <text class=""></text>
    </div>
        <div class="form-items">
            <text class="label" for="input">事件名称:</text>
            <text class="label" for="input">{{name}}</text>
        </div>
        <div class="form-items">
            <text class="label" for="textarea">事件内容:</text>
            <text class="label" for="textarea">{{desc}}</text>
        </div>
    </div>
</template>

<script>
const navigator = weex.requireModule("navigator");
const storage = weex.requireModule("storage");
export default {
  name: "detail",
  data() {
    return {
      name: "",
      desc: ""
    };
  },
  beforeCreate() {
    const domModule = weex.requireModule("dom");
    domModule.addRule("fontFace", {
      fontFamily: "iconfont",
      src: "url('http://at.alicdn.com/t/font_1239205_2ll9x03uxyy.ttf')"
    });
  },
  created() {
    storage.getItem("curEvent", event => {
      let curEvent =
        event.result == "success" && event.data ? JSON.parse(event.data) : {};
      this.name = curEvent.name;
      this.desc = curEvent.desc;
    });
  },
  methods: {
    onBack() {
      storage.removeItem("curEvent", event => {
        navigator.pop({
          animated: "true"
        });
      });
    }
  }
};
</script>

<style scoped>
.iconfont {
  font-family: iconfont;
}
.wrp {
  flex-direction: column;
  background-color: #f3f3f3;
}
.nav-bar {
  background-color: white;
  height: 80px;
  width: 750px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}
.form-items {
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
}
</style>
