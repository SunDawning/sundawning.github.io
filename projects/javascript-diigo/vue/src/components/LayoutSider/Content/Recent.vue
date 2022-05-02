<template>
  <a-list :data-source="list" item-layout="horizontal">
    <template #renderItem="{ item }">
      <a-list-item>
        <div>
          <a :href="item.url" target="_blank">{{ item.title }}</a>
          <div>{{ item.description }}</div>
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
const list = ref([]);
async function index() {
  const count = 3;
  const { data } = await axios.get(
    "http://localhost:3001/interact_api/load_user_items",
    {
      params: {
        count: count,
      },
      headers: {
        _cookie: document.cookie,
      },
    }
  );
  console.log("response.data", data);
  list.value = data.items;
}
index();
</script>
