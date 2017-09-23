<template>
  <div class="col-6 col-sm-4 col-lg-3 mt-2">
    <div class="img-thumbnail">
      <div class="caption">
        <h3>{{store.name}}</h3>
        <p class="flex-text text-muted">
          <slot/>
        </p>
        <p>
          <router-link class="btn btn-primary" :to="{ name: 'singleStore', params: { storeId: store['_id'] }}">Info</router-link>
          <button class="btn btn-danger float-right" @click="handleDelete(store['_id'])">Delete</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: ['store'],
    data() {
      return {};
    },
    methods: {
      ...mapActions([
        'deleteStore',
        'showConfirmModal',
      ]),
      handleDelete(id) {
        this.showConfirmModal({
          message: 'working',
          confirmAction: () => {
            this.deleteStore(id);
          },
        });
      },
    },
  };
</script>
