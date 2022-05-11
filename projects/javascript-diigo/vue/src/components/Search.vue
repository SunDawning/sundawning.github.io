<template>
  <List :items="state.items"></List>
</template>
<script setup>
import { searchBookmarkItems } from "../modules/diigo";
import { reactive } from "vue";
const state = reactive({
  items: [],
});
const props = defineProps({
  search: Object,
});
async function index() {
  const items = await searchBookmarkItems(props.search);
  console.log("items", items);
  state.items = items;
}
index();
</script>
