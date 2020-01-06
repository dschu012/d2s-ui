<template>
    <div id="armory">
        <Character v-if="!loading" v-bind:d2s="d2s" />
    </div>
</template>

<script>
import Character from './Character.vue';

export default {
  name: 'armory',
  components: {
    Character,
  },
  data() {
    return {
      loading: true,
      d2s: {},
    };
  },
  async mounted() {
    await this.loadCharacter();
    const vm = this;
    window.addEventListener('keydown', (event) => {
      if (event.ctrlKey) {
        vm.$store.commit('detailed', true);
      }
    });
    window.addEventListener('keyup', () => {
      vm.$store.commit('detailed', false);
    });
  },
  methods: {
    async loadCharacter() {
      this.loading = true;
      const response = await fetch(`/api/v1/d2s/character/${this.$route.params.character}`);
      this.d2s = await response.json();
      this.loading = false;
    },
  },
  watch: {
    '$route.params.character': {
      handler() { this.loadCharacter(); },
    },
  },
};
</script>

<style>
</style>
