<template>
  <div>
    <span class="tab"
          :class="{activeTab: selectedTab === tab}"
          v-for="(tab, index) in tabs" :key="index" @click="selectedTab = tab">
      {{ tab }}
    </span>
    <div v-show="selectedTab === 'Details'">
      <ul>
        <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
      </ul>
      <ul>
        <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
      </ul>
    </div>

    <div v-show="selectedTab === 'Shipping'">
      <p>Shipping Cost: {{ shipping }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'InfoTabs',
  props: {
    shipping: {
      required: true,
    },
    details: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tabs: ['Details', 'Shipping'],
      selectedTab: 'Details',
    };
  },
};
</script>

<style scoped>

</style>
