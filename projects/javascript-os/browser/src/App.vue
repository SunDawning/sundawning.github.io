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
          <a-button>应用</a-button>
        </a-dropdown>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
<script>
document.title = "系统";
import favicon from "/favicon.ico";
import setFavicon from "browser/src/modules/setFavicon";
setFavicon(favicon);
</script>
