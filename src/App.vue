<template>
  <div>
    <Login v-if="user === false" />
  </div>
</template>

<script>
  import auth from './auth';
  import Login from './components/Login.vue';

  export default {
    components: { Login },
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