<template>
  <a-form :model="formState" @finish="finish">
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
          ><a-input v-model:value="formState.yzm"></a-input
        ></a-col>
        <a-col span="12"><img :src="state.src" @click="randomImage" /></a-col>
      </a-row>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive } from "vue";
import axios from "../modules/axios";
const formState = reactive({
  description: "",
  yzm: "",
});
const state = reactive({
  src: "",
});
randomImage();
function randomImage() {
  state.src = `/http://tool.chacuo.net/?m=tool&act=caption&rnd=${Math.random()}`;
}
async function finish(data) {
  const response = await axios({
    url: "/api/feedback",
    method: "POST",
    data,
  });
  console.log("response.data", response.data);
}
</script>
