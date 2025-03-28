<!-- 本组件用于在main.vue中显示液压系统相关内容 -->

<template>
  <div>
    <div id="app"></div>
    yuk
  </div>
</template>

<script>

const stage = new Konva.Stage({
  container: 'app',
  width: 500,
  height: 500
});

const layer1 = new Konva.Layer();
stage.add(layer1);

const circle = new Konva.Circle({
  x: 200,
  y: 200,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
})
layer1.add(circle)


export default {
  data() {
    return {
      
    },
      
  };
}



<style>

</style>