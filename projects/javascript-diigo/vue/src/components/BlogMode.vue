<template>
  <md-editor
    v-model="state.text"
    :preview-theme="state.preview_theme"
    :code-theme="state.code_theme"
    @onUploadImg="onUploadImg"
  ></md-editor>
</template>
<script setup>
// diigo:mastermeichen:blog:hello-world
// 程序名：用户名：博客：文章标题
// #diigo #mastermeichen #blog
import { reactive } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const state = reactive({
  text: "",
  preview_theme: "github",
  code_theme: "github",
});
async function onUploadImg(files, callback) {
  // console.log("files", files);
  const urls = [];
  files.forEach(function (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      urls.push(reader.result);
      // 上传完所有图片
      if (urls.length === files.length) {
        // console.log("urls", urls);
        callback(urls);
      }
    };
  });
}
</script>
<style scoped>
#md-editor-v3 {
  text-align: left;
}
</style>
