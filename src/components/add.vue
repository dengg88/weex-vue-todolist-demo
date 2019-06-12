<template>
    <div class="wrp">
    <div class="nav-bar">
      <text class="iconfont" @click="onBack">&#xe600;</text>
      <text class="title">添加事件</text>
      <text class=""> </text>
    </div>
        <div class="form-items">
            <text class="label" for="input">事件名称:</text>
            <input v-model="name" type="text" name="input" class="input" placeholder="请输入事件名字">
        </div>
        <div class="form-items">
            <text class="label" for="textarea">事件内容:</text>
            <textarea v-model="desc" type="text" name="textarea" class="textarea" placeholder="请输入事件内容"></textarea>
        </div>
        <div class="b-btn-wrp">
        <text class="b-btn" @click="onSubmit">完成</text>
        </div>
    </div>
</template>

<script>
const storage = weex.requireModule("storage");
const navigator = weex.requireModule("navigator");
export default {
  name: "add",
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
  methods: {
    onBack() {
      navigator.pop({
        animated: "true"
      });
    },
    onSubmit() {
      storage.getItem("todoEvents", event => {
        let todoEvents =
          event.result == "success" && event.data ? JSON.parse(event.data) : [];
        todoEvents.push({ name: this.name, desc: this.desc });
        storage.setItem("todoEvents", JSON.stringify(todoEvents), event => {
          navigator.pop({
            animated: "true"
          });
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
.input {
  flex: 1;
  height: 60px;
  border-width: 2px;
  border-style: solid;
  border-color: #41b883;
  margin-left: 20px;
}
.textarea {
  flex: 1;
  margin-left: 20px;
  height: 200px;
  color: #666666;
  border-width: 2px;
  border-style: solid;
  border-color: #41b883;
}
.b-btn-wrp {
  position: absolute;
  bottom: 0;
  left: 0;
  flex-direction: row;
  width: 750px;
}

.b-btn {
  flex: 1;
  text-align: center;
  padding-top: 45px;
  padding-bottom: 45px;
  background-color: #41b883;
}
</style>
