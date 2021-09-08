<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted(){

  }
}
</script>

<style>
html, body, #app{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.outer{
  display: flex;
  height: 100%;
}
.sidebar{
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 200px;
  background: rgba(255, 246, 246, 0.2);
}
</style>