<template>
  <a-list :data-source="items" :split="false">
    <template #renderItem="{ item }">
      <a-list-item v-if="item.edit">
        <a-form
          :model="item"
          @finish="finish(values, item)"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 18 }"
        >
          <a-form-item label="网址" name="url" :rules="[{ required: true }]">
            <a-textarea
              auto-size
              v-model:value="item.url"
              allowClear
            ></a-textarea>
          </a-form-item>
          <a-form-item label="标题" name="title" :rules="[{ required: true }]">
            <a-textarea
              auto-size
              v-model:value="item.title"
              allowClear
            ></a-textarea>
          </a-form-item>
          <a-form-item label="标签" name="tags">
            <a-textarea
              auto-size
              v-model:value="item.tags"
              allowClear
            ></a-textarea>
          </a-form-item>
          <a-form-item label="描述" name="description">
            <a-textarea
              auto-size
              v-model:value="item.description"
              allowClear
            ></a-textarea>
          </a-form-item>
          <a-form-item label="私有" name="private" class="left">
            <a-switch v-model:checked="item.private"></a-switch>
          </a-form-item>
          <a-form-item label="稍后再读" name="unread" class="left">
            <a-switch v-model:checked="item.unread"></a-switch>
          </a-form-item>
          <a-form-item
            :wrapperCol="{
              span: 18,
              xs: { offset: 0 },
              sm: { offset: 4 },
            }"
          >
            <a-button type="primary" html-type="submit">提交</a-button>
          </a-form-item>
        </a-form></a-list-item
      >
      <a-list-item v-else>
        <div>
          <a-button @click="edit(event, item)">修改</a-button>
          <h1>
            <a :href="item.url" target="_blank">{{ item.title }}</a>
          </h1>
          <pre v-if="item.description !== ''">{{ item.description }}</pre>
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup>
import { reactive } from "vue";
const state = reactive({
  edit: false,
});
defineProps({
  items: Array,
});
function edit(event, item) {
  console.log("修改", item);
  item.edit = true;
}
function finish(values, item) {
  item.edit = false;
}
</script>
<style scoped>
.ant-list {
  text-align: left;
  word-break: break-all;
}
.ant-list-item {
  background: white;
  margin: 16px 0;
  border-radius: 8px;
  padding: 16px;
}
h1 {
  margin-top: 0.5em;
}
pre {
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
  border-left: 8px solid #f99f30;
  border-radius: 8px;
  padding: 8px;
  background: #3f98e5;
  color: #ffffff;
  max-height: 480px;
}
form {
  width: 100%;
}
</style>
