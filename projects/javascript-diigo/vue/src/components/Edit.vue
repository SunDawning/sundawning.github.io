<template>
  <a-form>
    <a-form-item label="网址" name="url" :rules="[{ required: true }]">
      <a-input></a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
