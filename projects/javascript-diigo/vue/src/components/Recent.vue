<template>
  <a-list :data-source="list">
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
import axios from "../modules/axios";
import { ref } from "vue";
import { select } from "../modules/auth";
const list = ref([]);
async function index() {
  const { data } = await axios({
    method: "GET",
    url: "https://www.diigo.com/interact_api/load_user_items",
    params: {
      sort: "updated",
      count: 10,
    },
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      cookie: select(),
    },
  });
  console.log("response.data", data);
  list.value = data.items;
}
index();
</script>
<style scoped>
.ant-list {
  text-align: left;
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
