<template>
  <a-form>
    <a-form-item label="密码">
      <a-textarea auto-size allowClear></a-textarea>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
</template>
<style scoped>
form {
  padding: 64px;
}
.ant-form-item {
  text-align: center;
}
</style>
