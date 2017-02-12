<template>
  <div>
    <div class="message">Value is: {{ count }}</div>
    <a href="#" @click.prevent="increment">Increment</a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        count: 0
      }
    },
    methods: {
      increment () {
        this.count ++;
      }
    }
  }
</script>

<style>
</style>