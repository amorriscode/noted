<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import auth from './auth';

  export default {
    data () {
      return {
        user: auth.user.authenticated,
      }
    },
    beforeCreate() {
      auth.constructor();
    }
  }
</script>

<style>
</style>