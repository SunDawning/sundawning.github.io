/**
 * Diigo网址所提供的API
 */
import axios from "./axios";
import { select } from "./auth";
/**
 * 查找所有书签
 */
export async function searchBookmarkItems({ what }) {
  const response = await axios({
    url: "https://www.diigo.com/interact_api/search_user_items",
    method: "POST",
    data: {
      what: what,
      sort: "updated",
      count: 10,
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
