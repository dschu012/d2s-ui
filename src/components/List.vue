<template>
    <div>
      <ul style="list-style: none;">
        <li v-for="c in list" :key="c">
          <router-link :to="{ name: 'armory', params: { character: c }}">{{ c }}</router-link>
        </li>
      </ul>
    </div>
</template>

<script>

export default {
  name: 'list',
  data() {
    return {
      list: [],
    };
  },
  async mounted() {
    const response = await fetch('/api/v1/d2s/list');
    this.list = await response.json();
  },
};
</script>

<style>

</style>
