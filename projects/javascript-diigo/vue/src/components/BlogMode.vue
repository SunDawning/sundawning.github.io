<template>
  <md-editor
    v-model="state.text"
    :preview-theme="state.preview_theme"
    :code-theme="state.code_theme"
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
</script>
<style scoped>
#md-editor-v3 {
  text-align: left;
}
</style>
