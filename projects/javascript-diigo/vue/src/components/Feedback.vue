<template>
  <a-form :model="formState">
    <a-form-item label="描述" name="description" :rules="[{ required: true }]">
      <a-textarea auto-size v-model:value="formState.description"></a-textarea>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive } from "vue";
const formState = reactive({
  description: "",
});
</script>
