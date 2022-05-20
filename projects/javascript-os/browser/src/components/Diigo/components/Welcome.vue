<template>
  <a-row>欢迎您，亲爱的{{ getUserName() }}</a-row>
</template>
<script setup>
import { getUserName } from "../modules/auth";
</script>
