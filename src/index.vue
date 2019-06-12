<template>
  <div class="wrp" @viewappear="onShow()" @viewdisappear="onHide()">
    <text class="title">代办事项</text>
    <div class="event" v-for="(event,index) in todoEvents" :key="event.name"  @click="onEventClick(event,index)">
      <text class="label">{{event.name}}</text>
      <div class="event-btn-wrp">
        <text class="btn" @click="onFinish(event,index)">完成</text>
        <text class="iconfont" >&#xe601;</text>
      </div>
    </div>

    <text class="title">已办事项</text>
    <div class="event" v-for="event in doneEvents" :key="event.name" @click="onEventClick(event,index)" >
      <text class="label">{{event.name}}</text>
      <div class="event-btn-wrp">
        <text class="iconfont" >&#xe601;</text>
      </div>
    </div>

    <div class="b-btn-wrp">
        <div class="b-btn-add" @click="onAdd">
          <text >添加</text>
        </div>
        <div class="b-btn-clear" @click="onClear">
          <text >清空</text>
        </div>
    </div>
  </div>
</template>

<script>
import getEntryUrl from "./utils.js";
const storage = weex.requireModule("storage");
const navigator = weex.requireModule("navigator");
const modal = weex.requireModule("modal");
export default {
  name: "App",
  data() {
    return {
      todoEvents: [],
      doneEvents: []
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
    if (weex.config.env.platform === "Web") this.onShow();
  },
  methods: {
    onFinish(event, index) {
      this.todoEvents.splice(index, 1);
      this.doneEvents.push(event);
      storage.setItem("todoEvents", JSON.stringify(this.todoEvents));
      storage.setItem("doneEvents", JSON.stringify(this.doneEvents));
    },
    onAdd() {
      if (weex.config.env.platform === "Web") this.onHide();
      navigator.push(
        {
          url: getEntryUrl('add'),
          animated: "true"
        },
        event => {}
      );
    },
    onEventClick(event) {
      if (weex.config.env.platform === "Web") this.onHide();
      storage.setItem("curEvent", JSON.stringify(event), event => {
        navigator.push(
          {
            url: getEntryUrl('detail'),
            animated: "true"
          },
          event => {}
        );
      });
    },
    onShow() {
      storage.getItem("todoEvents", event => {
        this.todoEvents =
          event.result == "success" && event.data ? JSON.parse(event.data) : [];
      });
      storage.getItem("doneEvents", event => {
        this.doneEvents =
          event.result == "success" && event.data ? JSON.parse(event.data) : [];
      });
    },
    onHide() {
      storage.setItem("todoEvents", JSON.stringify(this.todoEvents));
      storage.setItem("doneEvents", JSON.stringify(this.doneEvents));
    },
    onClear() {
      let that = this;
      modal.confirm(
        {
          message: "Do you confirm ?",
          duration: 0.3
        },
        function(value) {
          if (value == "OK") {
            storage.removeItem("todoEvents", event => {
              if (event.result == "success") that.todoEvents = [];
            });
            storage.removeItem("doneEvents", event => {
              if (event.result == "success") that.doneEvents = [];
            });
          }
        }
      );
    }
  }
};
</script>


<style scoped>
.iconfont {
  font-family: iconfont;
}
.wrp {
  background-color: #f3f3f3;
}
.inconfont {
  flex-direction: row;
  font-family: iconfont;
}
.title {
  font-size: 32px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
}
.event {
  background-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  height: 88px;
}
.event-btn-wrp {
  flex-direction: row;
  align-items: center;
}
.btn {
  border-width: 2px;
  border-radius: 10px;
  font-size: 28px;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 6px;
  padding-bottom: 6px;
}
.b-btn-wrp {
  position: absolute;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  width: 750px;
}
.b-btn-add {
  background-color: rgb(41, 197, 93);
  align-items: center;
  width: 50%;
  padding-top: 35px;
  padding-bottom: 35px;
}
.b-btn-clear {
  background-color: rgb(236, 61, 61);
  align-items: center;
  width: 50%;
  padding-top: 35px;
  padding-bottom: 35px;
}
</style>
