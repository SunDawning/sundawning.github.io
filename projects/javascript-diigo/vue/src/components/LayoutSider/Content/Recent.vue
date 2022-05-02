<template>
  <div>最近书签</div>
</template>
<script setup>
import axios from "axios";
async function index() {
  const count = 3;
  const { status, statusText, data } = await axios.get(
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
}
index();
</script>
