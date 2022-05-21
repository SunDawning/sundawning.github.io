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
        <a-col span="12"
          ><img :src="state.src" @click="getCaptionImage"
        /></a-col>
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
import * as querystring from "../modules/querystring";
import { getUserName } from "../modules/auth";
import Submit from "./Submit.vue";
const formState = reactive({
  description: "",
  yzm: "",
});
const state = reactive({
  src: "",
});
const cookie = "PHPSESSID=2v6medu51bh3q70c9s90p8slv7"; // 权限
getCaptionImage();
/**
 * 获取验证码图片
 */
async function getCaptionImage() {
  const response = await axios({
    url: "http://tool.chacuo.net/?m=tool&act=caption&rnd=685194894",
    method: "GET",
    responseType: "arraybuffer",
    headers: {
      cookie: cookie,
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
async function finish(data) {
  let { description, yzm } = data;
  let subject = `Diigo反馈-${getUserName()}`;
  let to = "jobsimi@qq.com";
  const response = await axios({
    url: "http://tool.chacuo.net/mailsend",
    method: "POST",
    data: querystring.stringify({
      data: description,
      type: "send",
      arg: `t=${to}_s=${subject}_yzm=${yzm}`,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
      cookie: cookie,
    },
  });
  console.log("response.data", response.data);
  getCaptionImage();
  if (typeof response.data === "string") {
    message.error("提交失败");
  }
  const item = response.data.data[0];
  if (item.match("发送失败")) {
    if (item.match("请输入正确验证码")) {
      message.error("请输入正确验证码");
    } else {
      message.error("发送失败");
    }
  }
  if (data.match("发送成功")) {
    message.success("提交成功");
    formState.description = "";
  }
  formState.yzm = "";
}
</script>
