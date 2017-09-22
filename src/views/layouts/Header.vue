<template>
  <nav class="navbar navbar-toggleable-md navbar-inverse bg-faded">
    <button class="navbar-toggler navbar-toggler-right" type="button">
      <span class="navbar-toggler-icon" @click="showDropDown = !showDropDown"></span>
    </button>
    <router-link class="navbar-brand" to="/">Koa Vue </router-link>
    <spinner :class="{'visibility--hidden': !isPending}" :line-size="4"></spinner>
    <div class="collapse navbar-collapse" :class="{show: showDropDown}">
      <ul class="navbar-nav mr-auto" v-if="isLoggedIn">
        <router-link class="nav-item" tag="li" :to="{name: 'stores'}" exact activeClass="active">
          <a class="nav-link">Stores</a>
        </router-link>
        <router-link class="nav-item" tag="li" :to="{name: 'createStore'}" exact activeClass="active">
          <a class="nav-link">Create Store</a>
        </router-link>
      </ul>
      <ul class="navbar-nav">
        <router-link class="nav-item" tag="li" to="/" exact activeClass="active">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link v-if="!isLoggedIn" class="nav-item" tag="li" to="/login" exact activeClass="active">
          <a class="nav-link">Login</a>
        </router-link>
        <router-link v-if="!isLoggedIn" class="nav-item" tag="li" to="/register" exact activeClass="active">
          <a class="nav-link">Register</a>
        </router-link>
        <li class="nav-item"><a href="#" v-if="isLoggedIn" class="nav-link" @click="logout">Logout</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import Spinner from 'vue-simple-spinner';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      Spinner,
    },
    data() {
      return {
        showDropDown: false,
      };
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout');
        this.$router.push('/login');
      },
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'isPending',
      ]),
    },
  };
</script>
<style lang="scss" scoped>
  nav {
    background-color: #4CAF50;
  }

  .visibility--hidden {
    visibility: hidden;
  }
</style>
