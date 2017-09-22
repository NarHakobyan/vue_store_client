<template>
  <div class="container">
    <div class="flex-row row" v-if="storeAdmins">
      <admin-card v-for="admin in storeAdmins" :key="admin._id" :user="admin"></admin-card>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex';
  import AdminCard from '@/components/AdminCard';

  export default {
    components: { AdminCard },
    computed: {
      ...mapGetters([
        'storeAdmins',
      ]),
    },
    async created() {
      await this.$store.dispatch('getStoreAdmins', this.$route.params.storeId);
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
