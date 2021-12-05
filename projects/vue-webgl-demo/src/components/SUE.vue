<script setup>
import { ref, onMounted } from "vue";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  GridHelper,
} from "three";
/**
 * THREE查看器
 * @param {HTMLElement} container
 */
function THREEViewer(container) {
  let SELF = {};
  SELF.scene = new Scene();
  SELF.scene.add(new AxesHelper(100));
  SELF.scene.add(new GridHelper(100, 10));
  SELF.canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  SELF.camera = new PerspectiveCamera(
    45,
    SELF.canvasSize.width / SELF.canvasSize.height,
    1,
    1000
  );
  SELF.camera.position.set(10, 10, 10);
  SELF.camera.lookAt(0, 0, 0);
  SELF.renderer = new WebGLRenderer();
  SELF.renderer.setSize(SELF.canvasSize.width, SELF.canvasSize.height);
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
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
