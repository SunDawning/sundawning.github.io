<template>
  <a-list :data-source="items" :split="false">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-modal :visible="item.edit" @cancel="exitEdit(item)" :footer="null">
          <Edit
            :formState="item"
            :afterFinish="(values) => exitEdit(item)"
          ></Edit>
        </a-modal>
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
import Edit from "./Edit.vue";
defineProps({
  items: Array,
});
function edit(event, item) {
  console.log("修改", item);
  item.edit = true;
}
function exitEdit(item) {
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
</style>
