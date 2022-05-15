<template>
  <a-form :model="formState" @finish="finish" :labelCol="{ span: 4 }">
    <a-form-item label="描述" name="description" :rules="[{ required: true }]">
      <a-textarea
        auto-size
        allowClear
        v-model:value="formState.description"
      ></a-textarea>
    </a-form-item>
    <a-form-item label="验证码" name="yzm" :rules="[{ required: true }]">
      <a-row>
        <a-col span="12"
          ><a-input allowClear v-model:value="formState.yzm"></a-input
        ></a-col>
        <a-col span="12"><img :src="state.src" @click="randomImage" /></a-col>
      </a-row>
    </a-form-item>
    <Submit></Submit>
  </a-form>
</template>
<script setup>
import { reactive } from "vue";
import axios from "../modules/axios";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
const formState = reactive({
  description: "",
  yzm: "",
});
const state = reactive({
  src: "",
});
randomImage();
async function randomImage() {
  const response = await axios({
    url: "http://tool.chacuo.net/?m=tool&act=caption&rnd=685194894",
    method: "GET",
    responseType: "arraybuffer",
    headers: {
      cookie: "PHPSESSID=n8e6qsktgtmtj8amcvvj1imo42",
    },
  });
  state.src =
    "data:image/png;base64," +
    window.btoa(
      new Uint8Array(response.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
      }, "")
    );
}
window.axios = axios;
async function finish(data) {
  const response = await axios({
    url: "/api/feedback",
    method: "POST",
    data,
  });
  console.log("response.data", response.data);
  randomImage();
  if (response.data.success === false) {
    message.error(response.data.message);
    return;
  }
  message.success(response.data.message);
  formState.yzm = "";
}
</script>
