<template>
  <a-form
    :model="formState"
    @finish="finish"
    :labelCol="{ span: 4 }"
    :wrapperCol="{ span: 18 }"
  >
    <a-form-item label="网址" name="url" :rules="[{ required: true }]">
      <a-textarea
        auto-size
        v-model:value="formState.url"
        @change="onChangeURL"
      ></a-textarea>
    </a-form-item>
    <a-form-item label="标题" name="title" :rules="[{ required: true }]">
      <a-textarea auto-size v-model:value="formState.title"></a-textarea>
    </a-form-item>
    <a-form-item label="标签" name="tags">
      <a-textarea auto-size v-model:value="formState.tags"></a-textarea>
    </a-form-item>
    <a-form-item label="描述" name="description">
      <a-textarea auto-size v-model:value="formState.description"></a-textarea>
    </a-form-item>
    <a-form-item label="私有" name="private" class="left">
      <a-switch v-model:checked="formState.private"></a-switch>
    </a-form-item>
    <a-form-item label="稍后再读" name="unread" class="left">
      <a-switch v-model:checked="formState.unread"></a-switch>
    </a-form-item>
    <a-form-item
      :wrapperCol="{
        span: 18,
        xs: { offset: 0 },
        sm: { offset: 4 },
      }"
    >
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive } from "vue";
import axios from "../modules/axios";
import { select } from "../modules/auth";
/**
 * 表单的数据
 */
const formState = reactive({
  url: "",
  title: "",
  description: "",
  tags: "",
  lists: "",
  groups: "",
  private: false,
  unread: true,
});
async function onChangeURL(event) {
  const url = event.target.value;
  // console.log("value", value);
  // await parseHTMLString(url);
  const element = await getHTMLDOMElement(url);
  console.log("element", element);
  formState.title = getHTMLTitle(element);
  formState.tags = getHTMLMetaKeywords(element);
}
async function finish(values) {
  console.log("values", values);
  // true => "true"
  let data = Object.assign({}, formState);
  Object.keys(data).forEach(function (key) {
    const value = data[key];
    if (value === undefined) {
      return;
    }
    if (typeof value === "boolean") {
      data[key] = JSON.stringify(value);
    }
  });
  await axios({
    method: "POST",
    url: "https://www.diigo.com/item/save/bookmark",
    data: data,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      cookie: select(),
    },
  });
}
/**
 * 从网页里提取标题
 */
function getHTMLTitle(element) {
  if (element === undefined) {
    return;
  }
  return getHTMLTitleContent(element) || getHTMLMetaOgTitleContent(element);
}
/**
 * 从网页里提取标题
 */
function getHTMLTitleContent(element) {
  if (element === undefined) {
    return;
  }
  let title = element.querySelector("title");
  if (title === undefined) {
    console.log("网页不存在title", element);
  }
  return title.innerText;
}
/**
 * 从网页的meta里提取og:title的content
 * @see https://mp.weixin.qq.com/s/TxbIt8oX5ugE0Q9HCjwZCw
 * <meta property="og:title" content="“你光长命还不行！”深圳卫生“十四五”规划，这个新词亮了" />
 * @param {HTMLElement} element
 */
function getHTMLMetaOgTitleContent(element) {
  if (element === undefined) {
    return;
  }
  let metas = element.querySelectorAll("meta");
  let total = metas.length;
  for (let c = 0; c < total; c = c + 1) {
    const meta = metas[c];
    if (meta.getAttribute("property") === "og:title") {
      return meta.getAttribute("content");
    }
  }
  return;
}
/**
 * 从网页的meta里提取keywords
 * @param {HTMLElement} element
 */
function getHTMLMetaKeywords(element) {
  if (element === undefined) {
    return;
  }
  let metas = element.querySelectorAll("meta");
  let total = metas.length;
  for (let c = 0; c < total; c = c + 1) {
    const { name, content } = metas[c];
    if (name === "keywords") {
      return content;
    }
  }
  return;
}
/**
 * 从网址获取网页源码所对应的DOM
 * @param {string} url 网址
 */
async function getHTMLDOMElement(url) {
  let HTMLString = await getHTMLString(url);
  if (HTMLString === undefined) {
    return;
  }
  let element = parseHTMLString(HTMLString);
  if (element === undefined) {
    return;
  }
  return element;
}
/**
 * 请求网页的源码
 */
async function getHTMLString(url) {
  let response;
  try {
    response = await axios({
      method: "GET",
      url,
    });
  } catch (error) {
    // 404 (Not Found)
    console.log("error", error);
    return;
  }
  if (response === undefined) {
    return;
  }
  return response.data;
}
/**
 * 解析网页源码
 */
function parseHTMLString(HTMLString) {
  if (HTMLString === undefined) {
    return;
  }
  const parser = new DOMParser();
  return parser.parseFromString(HTMLString, "text/html");
}
</script>
<style scoped>
.left {
  text-align: left;
}
</style>
