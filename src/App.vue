<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Phone></Phone>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Phone from './components/phone/Phone'

export default {
  name: 'app',
  components: {
	  Phone,
    // HelloWorld
  }
}
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
@import "~bootstrap/dist/css/bootstrap.css";
@import "~font-awesome/css/font-awesome.min.css";
</style>
