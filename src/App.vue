<template>
  <div class="p-0 m-0">
    <div class="d-flex justify-content-center">
      <!--<b-alert class="global-alert" variant="danger"
               :show="hasError">
        {{pendingErrors}}
      </b-alert>-->
      <notifications position="bottom right"/>
    </div>
    <app-header></app-header>
    <div class="container-fluid align-items-center justify-content-center d-flex">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import appHeader from '@/views/layouts/Header';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        showDismissibleAlert: true,
      };
    },
    components: {
      appHeader,
    },
    computed: {
      ...mapGetters([
        'hasError',
        'pendingErrors',
      ]),
    },
    mounted() {
//      Notify.setVueInstace(this.$notify);
    },
  };
</script>

<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Roboto:300);

  body {
    background-color: rgba(245, 245, 245, 0.5) !important;
  }

  .global-alert {
    position: fixed;
    z-index: 999999;
    width: 40%;
  }

  .flex-row {
    padding-left: 15px;
    padding-right: 15px;
  }

  @media only screen and (max-width: 480px) {
    .flex-row > [class*='col-'] {
      width: 100%;
    }
    .flex-row {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
</style>
