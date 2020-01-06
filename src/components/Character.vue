<template>
    <div class="char">
        {{ d2s.header.name }}
        <div>Equipped</div>
        <Equipped :items="equipped"></Equipped>
        <div>Inventory</div>
        <Grid :width="config.VUE_APP_INV_WIDTH"
          :height="config.VUE_APP_INV_HEIGHT" :items="inventory"></Grid>
        <div>Stash</div>
        <Grid :width="config.VUE_APP_STASH_WIDTH"
          :height="config.VUE_APP_STASH_HEIGHT" :items="stash"></Grid>
        <div>Cube</div>
        <Grid :width="config.VUE_APP_CUBE_WIDTH"
          :height="config.VUE_APP_CUBE_HEIGHT" :items="cube"></Grid>
        <div v-if="d2s.header.merc_id">
          <div>Mercenary</div>
          <Mercenary :items="mercenary"></Mercenary>
        </div>
        <div v-if="d2s.golem_item">
          <div>Golem</div>
          <Golem :items="golem"></Golem>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Equipped from './Equipped.vue';
import Grid from './Grid.vue';
import Mercenary from './Mercenary.vue';
import Golem from './Golem.vue';

export default {
  name: 'char',
  components: {
    Equipped, Grid, Mercenary, Golem,
  },
  props: {
    d2s: Object,
  },
  computed: {
    ...mapGetters([
      'config',
    ]),
    equipped() {
      return this.d2s.items.filter(
        item => item.location_id === 1,
      );
    },
    inventory() {
      return this.d2s.items.filter(
        item => item.location_id === 0 && item.alt_position_id === 1,
      );
    },
    stash() {
      return this.d2s.items.filter(
        item => item.location_id === 0 && item.alt_position_id === 5,
      );
    },
    cube() {
      return this.d2s.items.filter(
        item => item.location_id === 0 && item.alt_position_id === 4,
      );
    },
    mercenary() {
      return this.d2s.merc_items || [];
    },
    golem() {
      return this.d2s.golem_item ? [this.d2s.golem_item] : [];
    },
  },
};
</script>

<style>

</style>
