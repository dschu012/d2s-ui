<template>
  <div>
    <div ref="itemRef" tabindex="0" :class="itemClass">
      <img :src="imgSrc(item)" :class="{ ethereal: item.ethereal}" />
      <div v-if="item.total_nr_of_sockets && tooltipShown" class="sockets">
        <div :style="socketStyle(idx)" class="socket"
          :class="{ 'empty-socket': !item.socketed_items || !item.socketed_items[idx-1]}"
          v-for="idx in item.total_nr_of_sockets" :key="idx">
          <img v-if="item.socketed_items && item.socketed_items[idx-1]"
            :src="imgSrc(item.socketed_items[idx-1])" />
        </div>
      </div>
    </div>
    <div ref="tooltipRef">
      <div :class="itemNameClass(item)" v-html="itemName(item)"></div>
      <div v-if="item.defense_rating">Defense: {{item.defense_rating}}</div>
      <div v-if="item.base_damage">
        <div v-if="item.base_damage.mindam && item.base_damage.maxdam">
          One Hand Damage: {{item.base_damage.mindam}}-{{item.base_damage.maxdam}}
        </div>
        <div v-if="item.base_damage.twohandmindam && item.base_damage.twohandmaxdam">
          Two Hand Damage: {{item.base_damage.twohandmindam}}-{{item.base_damage.twohandmaxdam}}
        </div>
      </div>
      <div v-if="item.max_durability">
        Durability: {{item.current_durability}} of {{item.max_durability}}
      </div>
      <div v-if="!$store.state.detailed">
        <div class="blue" v-html="statDescription(stat)"
          v-for="(stat, idx) in item.combined_magic_attributes" :key="idx" />
      </div>
      <!--
        on ctrl key press breakout properties into components
        so you can see what socketed items/runewords contributed
      -->
      <div v-if="$store.state.detailed">
        <div v-if="item.magic_attributes">
          <span class="white">Magic Attributes</span>
          <div class="blue" v-html="statDescription(stat)"
            v-for="(stat, idx) in item.magic_attributes" :key="idx" />
        </div>
        <div v-if="item.runeword_attributes">
          <span class="white">Runeword Attributes</span>
          <div class="blue" v-html="statDescription(stat)"
           v-for="(stat, idx) in item.runeword_attributes" :key="idx" />
        </div>
        <div v-if="item.socketed_items">
          <span class="white">Socketed Items</span>
          <div v-for="(socket, idx) in item.socketed_items" :key="idx">
            <div :class="itemNameClass(socket)" v-html="itemName(socket)"></div>
            <div class="blue" v-html="statDescription(stat)"
             v-for="(stat, idx) in socket.magic_attributes" :key="idx" />
          </div>
        </div>
      </div>
      <div class="blue" v-if="item.ethereal">
        Ethereal
      </div>
      <div class="blue" v-if="item.total_nr_of_sockets">
        Socketed ({{item.total_nr_of_sockets}})
      </div>
    </div>
  </div>
</template>

<script>
import Tippy from 'tippy.js';

export default {
  name: 'item',
  data() {
    return {
      tooltipShown: false,
      tooltip: null,
    };
  },
  props: {
    item: Object,
  },
  async mounted() {
    this.createPopper();
  },
  events: {
    ctrlDown() {
      this.detailed = true;
    },
    ctrlUp() {
      this.detailed = false;
    },
  },
  computed: {
    itemClass() {
      let clazz = `item w-${this.item.inv_width} h-${this.item.inv_height}`;
      if (this.item.location_id !== 1) {
        clazz += ` x-${this.item.position_x} y-${this.item.position_y}`;
      }
      return clazz;
    },
  },
  destroyed() {
    if (this.tooltip) {
      this.tooltip.destroy();
    }
  },
  methods: {
    socketStyle(idx) {
      const y = [[50], [25, 75], [5, 50, 95]];
      const x = [[50], [10, 90]];
      const i = idx - 1;
      switch (this.item.total_nr_of_sockets) {
        case 1:
        case 2:
        case 3: {
          const j = this.item.total_nr_of_sockets - 1;
          if (this.item.inv_height > 2 || this.item.total_nr_of_sockets < 3) {
            return {
              transform: `translateX(-${x[0][0]}%) translateY(-${y[j][i]}%)`,
              top: `${y[j][i]}%`,
              left: `${x[0][0]}%`,
            };
          }
          const k = [y[2][0], y[2][2], y[2][2]];
          const l = [x[0][0], x[1][0], x[1][1]];
          return {
            transform: `translateX(-${l[i]}%) translateY(-${k[i]}%)`,
            top: `${k[i]}%`,
            left: `${l[i]}%`,
          };
        }
        case 4:
        case 6: {
          const j = (this.item.total_nr_of_sockets / 2) - 1;
          return {
            transform: `translateX(-${x[1][i % 2]}%) translateY(-${y[j][Math.floor(i / 2)]}%)`,
            top: `${y[j][Math.floor(i / 2)]}%`,
            left: `${x[1][i % 2]}%`,
          };
        }
        case 5: {
          const k = [y[2][0], y[2][0], y[2][2], y[2][2], y[2][1]];
          const l = [x[1][0], x[1][1], x[1][0], x[1][1], x[0][0]];
          return {
            transform: `translateX(-${l[i]}%) translateY(-${k[i]}%)`,
            top: `${k[i]}%`,
            left: `${l[i]}%`,
          };
        }
        default: {
          return { };
        }
      }
    },
    imgSrc(item) {
      const base = `/api/v1/img/${item.inv_file}.png`;
      return (item.inv_transform && item.transform_color)
        ? `${base}?inv_transform=${item.inv_transform}&transform_color=${item.transform_color}`
        : base;
    },
    itemName(item) {
      let name = item.type_name;
      if (item.magic_prefix_name) {
        name = `${item.magic_prefix_name} ${name}`;
      }
      if (item.magic_suffix_name) {
        name = `${name} ${item.magic_suffix_name}`;
      }
      if (item.rare_name) {
        name = `${item.rare_name} ${name}`;
      }
      if (item.rare_name2) {
        name = `${name} ${item.rare_name2}`;
      }
      const personalizedName = item.personalized_name ? `${item.personalized_name}'s ` : '';
      if (item.set_name) {
        name = `${name}\\n${personalizedName}${item.set_name}`;
      }
      if (item.unique_name) {
        name = `${name}\\n${personalizedName}${item.unique_name}`;
      }
      if (item.runeword_name) {
        const runes = item.socketed_items.map(e => e.type_name.split(' ')[0]).join('');
        name = `\\gold;'${runes}'\\n${name}\\n\\gold;${personalizedName}${item.runeword_name}`;
      }
      return name.split('\\n').map((d) => {
        const s = d.replace(/\\(.*?);/gi, (result, match) => `</div><div class="${match}">`);
        return `<div>${s}</div>`;
      }).reverse().join('');
    },
    itemNameClass(item) {
      if (item.given_runeword) {
        return 'white';
      }
      switch (item.quality) {
        case 1:
          return 'grey';
        case 2:
        case 3:
          return 'white';
        case 4:
          return 'blue';
        case 5:
          return 'green';
        case 6:
          return 'yellow';
        case 7:
          return 'gold';
        case 8:
          return 'orange';
        default:
          return 'white';
      }
    },
    statDescription(stat) {
      if (!stat.description || stat.visible === false) {
        return null;
      }
      const ds = stat.description.split('\\n');
      return ds.map((d) => {
        const s = d.replace(/\\(.*?);/gi, (result, match) => `</div><div class="${match}">`);
        return `<div>${s}</div>`;
      }).reverse().join('');
    },
    createPopper() {
      const vm = this;
      this.tooltip = new Tippy(this.$refs.itemRef, {
        content: this.$refs.tooltipRef,
        hideOnClick: false,
        duration: [0, 0],
        distance: 0,
        arrow: false,
        onShown: () => { vm.tooltipShown = true; },
        onHidden: () => { vm.tooltipShown = false; },
      });
    },
  },
};
</script>

<style>
</style>
