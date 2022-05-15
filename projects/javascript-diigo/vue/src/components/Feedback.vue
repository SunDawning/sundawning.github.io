<template>
  <a-form :model="formState">
    <a-form-item label="描述" name="description" :rules="[{ required: true }]">
      <a-textarea
        auto-size
        allowClear
        v-model:value="formState.description"
      ></a-textarea>
    </a-form-item>
    <a-form-item label="验证码" name="yzm" :rules="[{ required: true }]">
      <a-input></a-input>
      <img src="/http://tool.chacuo.net/?m=tool&act=caption&rnd=685194894" />
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
});
</script>
