<template>
  <a-col>
    <a-row>
      <a-col :span="6">顶部</a-col>
    </a-row>
    <a-row>内容</a-row>
    <a-row>底部</a-row>
  </a-col>
</template>
<script>
const options = { components: {} };
const { components } = options;

import { Row } from "ant-design-vue";
components["a-row"] = Row;

import { Col } from "ant-design-vue";
components["a-col"] = Col;

export default options;
</script>
