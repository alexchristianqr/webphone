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
@import "~bootstrap/dist/css/bootstrap.css";
@import "~font-awesome/css/font-awesome.min.css";
</style>
