<template>
  <List :items="state.items"></List>
</template>
<script setup>
import axios from "../modules/axios";
import { reactive } from "vue";
import { select } from "../modules/auth";
const state = reactive({
  items: [],
});
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
  state.items = data.items;
}
index();
</script>
