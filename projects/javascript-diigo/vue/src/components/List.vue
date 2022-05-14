<template>
  <a-list :data-source="items">
    <template #renderItem="{ item }">
      <a-list-item>
        <div>
          <h1>
            <a :href="item.url" target="_blank">{{ item.title }}</a>
          </h1>
          <pre>{{ item.description }}</pre>
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup>
defineProps({
  items: Array,
});
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
