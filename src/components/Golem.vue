<template>
    <div class="inventory">
      <span class="head"><Item v-if="head" :item="head" /></span>
      <span class="torso"><Item v-if="torso" :item="torso" /></span>
      <span class="right-hand weapon"><Item v-if="right_hand" :item="right_hand" /></span>
      <span class="left-hand weapon"><Item v-if="left_hand" :item="left_hand" /></span>
    </div>
</template>

<script>
import Item from './Item.vue';

export default {
  name: 'golem',
  components: {
    Item,
  },
  data() {
    return {
      head: this.items.find(e => e.equipped_id === 1),
      torso: this.items.find(e => e.equipped_id === 3),
      right_hand: this.items.find(e => e.equipped_id === 4),
      left_hand: this.items.find(e => e.equipped_id === 5),
    };
  },
  props: {
    items: Array,
  },
};
</script>

<style>

</style>
