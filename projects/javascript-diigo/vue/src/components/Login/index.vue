<template>
  <a-spin :spinning="state.spinning">
    <a-form :model="formState" @finish="finish">
      <a-form-item label="Cookie" name="cookie" :rules="[{ required: true }]">
        <a-textarea auto-size v-model:value="formState.cookie"></a-textarea>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>
<script setup>
import { reactive } from "vue";
import axios from "axios";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import { insert, select, drop } from "./database";
const state = reactive({
  spinning: true,
});
const emit = defineEmits(["login"]);
/**
 * 表单的数据
 */
const formState = reactive({
  cookie: "",
});
/**
 * 进入页面时自动登录
 */
if (select()) {
  login({ cookie: select() });
} else {
  state.spinning = false;
}
function finish(values) {
  // console.log("values", values);
  insert(values.cookie);
  login(values);
}
/**
 * 登录
 */
async function login({ cookie }) {
  // return console.log("登录成功");
  state.spinning = true;
  try {
    const { data } = await axios.get("/diigo-api/outliner/list", {
      headers: {
        _cookie: cookie,
      },
    });
    const { code, reason } = data;
    state.spinning = false;
    if (code === 0) {
      drop();
      message.error(reason);
      return;
    }
    emit("login", true);
  } catch (error) {
    // console.log(error);
    message.error(error.message);
    state.spinning = false;
  }
}
</script>
<style scoped>
form {
  padding: 64px;
}
</style>
