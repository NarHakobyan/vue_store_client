<template>
  <div class="p-0 m-0">
    <div class="d-flex justify-content-center">
    <b-alert class="global-alert" variant="danger"
             dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
      Dismissible Alert!
    </b-alert>
  </div>
    <app-header></app-header>
    <div class="container-fluid align-items-center justify-content-center d-flex">

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import appHeader from '@/views/layouts/Header';
  import { bAlert } from 'bootstrap-vue/lib/components';

  export default {
    data() {
      return {
        showDismissibleAlert: true,
      };
    },
    components: {
      appHeader,
      bAlert,
    },
    methods: {

    },
  };
</script>

<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Roboto:300);

  body {
    background-color: rgba(245, 245, 245, 0.5) !important;
  }
  .global-alert {
    position: absolute;
    z-index: 999999;
    width: 40%;
  }
</style>
