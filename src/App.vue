<template>
  <div id="app">
    <Phone></Phone>
  </div>
</template>

<script>
import Phone from './components/phone/Phone'

export default {
  name: 'app',
  components: {
	  Phone,
  }
}
</script>

<style>
/* Import Bootstrap Vue Styles */
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';
/* Import Font Awesome Icons Set */
@import "~font-awesome/css/font-awesome.min.css";
@import '~@fortawesome/fontawesome-free/css/all.css';
</style>
