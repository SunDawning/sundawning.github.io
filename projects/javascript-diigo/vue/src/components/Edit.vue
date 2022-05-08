<template>
  <a-form :model="formState" @finish="finish">
    <a-form-item label="网址" name="url" :rules="[{ required: true }]">
      <a-input v-model:value="formState.url" @change="onChangeURL"></a-input>
    </a-form-item>
    <a-form-item label="标题" name="title" :rules="[{ required: true }]">
      <a-input v-model:value="formState.title"></a-input>
    </a-form-item>
    <a-form-item label="标签" name="tags">
      <a-input v-model:value="formState.tags"></a-input>
    </a-form-item>
    <a-form-item label="描述" name="description">
      <a-textarea auto-size v-model:value="formState.description"></a-textarea>
    </a-form-item>
    <a-form-item label="私有" name="private">
      <a-switch v-model:checked="formState.private"></a-switch>
    </a-form-item>
    <a-form-item label="稍后再读" name="unread">
      <a-switch v-model:checked="formState.unread"></a-switch>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive } from "vue";
import axios from "../modules/axios";
import { select } from "../modules/auth";
/**
 * 表单的数据
 */
const formState = reactive({
  url: "",
  title: "",
  description: "",
  tags: "",
  lists: "",
  groups: "",
  private: false,
  unread: true,
});
async function onChangeURL(event) {
  const url = event.target.value;
  // console.log("value", value);
  {
    let response;
    try {
      response = await axios({
        method: "GET",
        url,
      });
    } catch (error) {
      // 404 (Not Found)
      console.log("error", error);
      return;
    }
    if (response === undefined) {
      return;
    }
    {
      let div = document.createElement("div");
      div.innerHTML = response.data;
      formState.title = div.querySelector("title").innerText;
      div = null;
    }
  }
}
async function finish(values) {
  console.log("values", values);
  await axios({
    method: "POST",
    url: "https://www.diigo.com/item/save/bookmark",
    data: formState,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      cookie: select(),
    },
  });
}
</script>
