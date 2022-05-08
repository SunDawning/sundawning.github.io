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
import axios from "../modules/axios";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import { insert, select, drop } from "../modules/auth";
const state = reactive({
  spinning: true,
});
const emit = defineEmits();
/**
 * 表单的数据
 */
const formState = reactive({
  cookie: "",
});
/**
 * 进入页面时自动登录
 * 如果数据库存在登录信息，则跳过登录界面。
 */
if (select()) {
  emit("login", true);
} else {
  state.spinning = false;
}
/**
 * 成功验证登录表单之后
 * 1. 访问接口，验证登录信息
 * 2. 如果通过验证，则存储该登录权限，便于以后不再验证。
 */
async function finish(values) {
  // console.log("values", values);
  await login(values);
  insert(values.cookie);
}
/**
 * 登录
 */
async function login({ cookie }) {
  return new Promise(async function (resolve, reject) {
    // return console.log("登录成功");
    state.spinning = true;
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://www.diigo.com/outliner/list",
        // timeout: 500,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          cookie: cookie,
        },
      });
      const { code, reason } = data;
      state.spinning = false;
      if (code === 0) {
        drop();
        message.error(reason);
        reject(reason);
        return;
      }
      emit("login", true);
      resolve();
    } catch (error) {
      // console.log(error);
      message.error(error.message);
      state.spinning = false;
      reject(error.message);
    }
  });
}
</script>
<style scoped>
form {
  padding: 64px;
}
</style>
