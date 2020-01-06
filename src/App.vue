<template>
  <div id="app">
    <router-view v-if="config"></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  async mounted() {
    await this.$store.dispatch('loadConfig');
  },
  computed: {
    ...mapGetters([
      'config',
    ]),
  },
};
</script>

<style lang="scss">
@import "@/styles/_globals.scss";
@import "@/styles/_variables.scss";
</style>
