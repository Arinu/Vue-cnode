<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Nav'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  font-size: 18px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
}
.view{
  margin-top: 50px;
}
</style>
