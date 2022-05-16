<template>
  <List :items="state.items"></List>
</template>
<script setup>
import { searchBookmarkItems } from "../modules/restful";
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
  let items = {};
  // 搜索“ue4”和“#ue4”，并取出唯一的。
  const searches = [
    Object.assign({}, props.search),
    Object.assign({}, props.search, {
      what: "#" + props.search.what,
    }),
  ];
  for (let c = 0; c < searches.length; c = c + 1) {
    const search = searches[c];
    const searched_items = await searchBookmarkItems(search);
    if (searched_items === undefined) {
      continue;
    }
    console.log("search", search, searched_items.length);
    searched_items.forEach(function (item) {
      const { url } = item;
      if (items[url] === undefined) {
        items[url] = item;
      }
    });
  }
  const items_values = Object.values(items);
  console.log("items", items_values);
  // 回到顶部
  scrollTo(0, 0);
  state.items = items_values;
}
index(props);
</script>
