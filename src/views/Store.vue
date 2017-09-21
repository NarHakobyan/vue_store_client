<template>
  <div class="page">
    STORES
    {{stores}}
    {{allStoresCount}}
    {{filteredStoresCount}}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    components: {},
    computed: {
      ...mapGetters([
        'stores',
        'allStoresCount',
        'filteredStoresCount',
      ]),
    },
    async created() {
      await this.$store.dispatch('getStores');
      console.log(this);
    },
  };
</script>
