<template>
  <md-editor v-model="text"></md-editor>
</template>
<script setup>
// diigo:mastermeichen:blog:hello-world
// 程序名：用户名：博客：文章标题
// #diigo #mastermeichen #blog
import { ref } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const text = ref("");
</script>
