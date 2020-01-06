<template>
    <div class="grid" :class="gridClass">
        <Item v-for="(item, idx) in items" :key="idx" :item="item"></Item>
    </div>
</template>

<script>
import Item from './Item.vue';

export default {
  name: 'grid',
  components: {
    Item,
  },
  props: {
    items: Array,
    width: String,
    height: String,
  },
  computed: {
    gridClass() {
      return `w-${this.width} h-${this.height}`;
    },
  },
};
</script>

<style>
</style>
