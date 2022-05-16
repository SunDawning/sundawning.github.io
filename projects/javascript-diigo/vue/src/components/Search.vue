<template>
  <List :items="state.items"></List>
</template>
<script setup>
import { searchAllBookmarkItems } from "../modules/restful";
import { reactive, watch } from "vue";
const state = reactive({
  items: [],
});
const props = defineProps({
  search: Object,
});
watch(props, function (newProps) {
  index(newProps);
});
async function index(props) {
  const items = await searchAllBookmarkItems(props.search);
  console.log("items", items);
  // 回到顶部
  scrollTo(0, 0);
  state.items = items;
}
index(props);
</script>
