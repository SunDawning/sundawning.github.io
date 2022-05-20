/**
 * Diigo网址所提供的API
 */
import axios from "./axios";
import { select } from "./auth";
/**
 * 查找所有书签
 */
export async function searchAllBookmarkItems({ what, count = 10 }) {
  let items = {};
  // 搜索“ue4”和“#ue4”，并取出唯一的。
  const searches = [
    { what, count },
    { what: "#" + what, count },
  ];
  for (let c = 0; c < searches.length; c = c + 1) {
    const search = searches[c];
    const searched_items = await searchBookmarkItems(search);
    if (searched_items === undefined) {
      continue;
    }
    // console.log("search", search, searched_items.length);
    searched_items.forEach(function (item) {
      const { url } = item;
      if (items[url] === undefined) {
        items[url] = item;
      }
    });
  }
  const items_values = Object.values(items);
  // console.log("items", items_values);
  return items_values;
}
export async function searchBookmarkItems({ what, count = 10 }) {
  const response = await axios({
    url: "https://www.diigo.com/interact_api/search_user_items",
    method: "POST",
    data: {
      what,
      sort: "updated",
      count,
      format: "json",
    },
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      cookie: select(),
    },
  });
  const { data } = response;
  const { items } = data;
  if (items === undefined) {
    return;
  }
  if (items.length === 0) {
    return;
  }
  return items;
}
