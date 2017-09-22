<template>
  <div class="container">
    <div class="flex-row row">
      <store-card v-for="store in stores" :key="store._id" :store="store">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. asdfasdfasdfsdfa asdfasdf sdfasfasdfasfasdfasdfasdfsd asdf asdf Distinctio, evenietsdf sdfsdfsdfsdfsdfsdf.
      </store-card>
    </div>
    {{allStoresCount}}
    {{filteredStoresCount}}
  </div>

</template>

<script>
  import { mapGetters } from 'vuex';
  import StoreCard from '@/components/StoreCard';

  export default {
    components: { StoreCard },
    computed: {
      ...mapGetters([
        'stores',
        'allStoresCount',
        'filteredStoresCount',
      ]),
    },
    async created() {
      await this.$store.dispatch('getStores');
    },
  };
</script>

<style>
  .flex-row {
    display: flex;
    flex-wrap: wrap;
  }

  .flex-row > [class*='col-'] {
    display: flex;
    flex-direction: column;
  }

  .flex-row .img-thumbnail,
  .flex-row .caption {
    flex-direction: column;
    display: flex;
    flex: 1 0 auto;
    height: auto;
    position: relative;
  }

  .flex-text {
    flex-grow: 1;
  }

  .flex-row img {
    min-width: 0;
    width: 100%;
  }
</style>
