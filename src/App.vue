<template>
  <div class="p-0 m-0">
    <div class="d-flex justify-content-center">
      <notifications position="bottom right"/>
    </div>
    <app-header></app-header>
    <div class="container-fluid align-items-center justify-content-center d-flex">
      <router-view></router-view>
    </div>
    <sweet-modal ref="modal" :icon="modal.icon" :overlay-theme="modal.theme" :modal-theme="modal.theme">
      {{modal.message}}
      <hr>
      <div class="float-right" v-if="modal.confirm">
        <a @click="modal.confirmAction" class="btn btn-lg text-white btn-primary">Yes</a>
        <a @click="modal.failAction" class="btn btn-lg text-white btn-danger">No</a>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { SweetModal } from 'sweet-modal-vue';
  import SweetButton from 'sweet-modal-vue/docs/components/Button';

  import appHeader from '@/views/layouts/Header';

  export default {
    data() {
      return {
        showDismissibleAlert: true,
      };
    },
    components: {
      appHeader,
      SweetModal,
      SweetButton,
    },
    computed: {
      ...mapGetters([
        'hasError',
        'pendingErrors',
        'confirmMessage',
        'modal',
      ]),
    },
    methods: {
      ...mapActions([
        'setModalRef',
      ]),
    },
    mounted() {
      this.setModalRef(this.$refs.modal);
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

  btn {
    color: #fff;
  }
</style>
