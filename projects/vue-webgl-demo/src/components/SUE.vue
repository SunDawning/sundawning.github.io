<script setup>
import { ref, onMounted } from "vue";
import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
/**
 * THREE查看器
 * @param {HTMLElement} container
 */
function THREEViewer(container) {
  let SELF = {};
  SELF.scene = new Scene();
  SELF.camera = new PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0,
    1000
  );
  SELF.camera.position.set(0, 10, 0);
  SELF.renderer = new WebGLRenderer();
  SELF.renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(SELF.renderer.domElement);
  SELF.animation = {};
  SELF.animation.start = function () {
    SELF.renderer.render(SELF.scene, SELF.camera);
    SELF.animation.id = requestAnimationFrame(SELF.animation.start);
  };
  SELF.animation.start();
  return SELF;
}
/**
 * @param {HTMLElement} container
 */
function init(container) {
  let threeViewer = new THREEViewer(container);
}
let container = ref(null);
onMounted(function () {
  init(container.value);
});
</script>

<template>
  <div ref="container" class="container"></div>
</template>

<style scoped>
.container {
  position:absolute;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
}
</style>
