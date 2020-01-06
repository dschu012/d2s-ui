<template>
    <div class="inventory">
      <span class="head"><Item v-if="head" :item="head" /></span>
      <span class="neck"><Item v-if="neck" :item="neck" /></span>
      <span class="torso"><Item v-if="torso" :item="torso" /></span>
      <span class="right-tab tabs">
        <span class="tab" @click="setAltDisplayed(false)">I</span>
        <span class="tab" @click="setAltDisplayed(true)">II</span>
      </span>
      <span v-show="!alt_displayed" class="right-hand weapon">
        <Item v-if="right_hand" :item="right_hand" />
      </span>
      <span v-show="alt_displayed" class="alt-right-hand weapon">
        <Item v-if="alt_right_hand" :item="alt_right_hand" />
      </span>
      <span class="left-tab tabs">
        <span class="tab" @click="setAltDisplayed(false)">I</span>
        <span class="tab" @click="setAltDisplayed(true)">II</span>
      </span>
      <span v-show="!alt_displayed" class="left-hand weapon">
        <Item v-if="left_hand" :item="left_hand" />
      </span>
      <span v-show="alt_displayed" class="alt-left-hand weapon">
        <Item v-if="alt_left_hand" :item="alt_left_hand" />
      </span>
      <span class="right-finger ring"><Item v-if="right_finger" :item="right_finger" /></span>
      <span class="left-finger ring"><Item v-if="left_finger" :item="left_finger" /></span>
      <span class="waist"><Item v-if="waist" :item="waist" /></span>
      <span class="feet"><Item v-if="feet" :item="feet" /></span>
      <span class="hands"><Item v-if="hands" :item="hands" /></span>
    </div>
</template>

<script>
import Item from './Item.vue';

export default {
  name: 'equipped',
  components: {
    Item,
  },
  data() {
    return {
      head: this.items.find(e => e.equipped_id === 1),
      neck: this.items.find(e => e.equipped_id === 2),
      torso: this.items.find(e => e.equipped_id === 3),
      right_hand: this.items.find(e => e.equipped_id === 4),
      left_hand: this.items.find(e => e.equipped_id === 5),
      right_finger: this.items.find(e => e.equipped_id === 6),
      left_finger: this.items.find(e => e.equipped_id === 7),
      waist: this.items.find(e => e.equipped_id === 8),
      feet: this.items.find(e => e.equipped_id === 9),
      hands: this.items.find(e => e.equipped_id === 10),
      alt_right_hand: this.items.find(e => e.equipped_id === 11),
      alt_left_hand: this.items.find(e => e.equipped_id === 12),
      alt_displayed: false,
    };
  },
  props: {
    items: Array,
  },
  methods: {
    setAltDisplayed(value) {
      this.alt_displayed = value;
    },
  },
};
</script>

<style>

</style>
