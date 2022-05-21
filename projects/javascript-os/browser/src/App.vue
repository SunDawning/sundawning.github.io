<template>
  <a-layout>
    <a-layout-header>
      <a-row :style="{ height: '100%', alignItems: 'center' }">
        <a-button><router-link to="/">首页</router-link></a-button>
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="Diigo">
                <router-link to="/Diigo"> Diigo </router-link>
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>所有APP</a-button>
        </a-dropdown>
        <a-button @click="exitLogin">退出登录</a-button>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
    <BackTop></BackTop>
  </a-layout>
</template>
<script setup>
import BackTop from "./components/BackTop.vue";
import { drop } from "./modules/login";
import { useRouter } from "vue-router";
const router = useRouter();
function exitLogin() {
  drop();
  router.push("/login");
}
</script>
