<template>
  <nav class="navbar navbar-toggleable-md navbar-inverse bg-faded">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" @click="showDropdown = !showDropdown"></span>
    </button>
    <a class="navbar-brand" href="#">Koa Vue</a>
    <div class="collapse navbar-collapse" :class="{show: showDropdown}">
      <ul class="navbar-nav mr-auto">
        <li v-if="isLoggedIn" class="nav-item active">
          <router-link class="nav-link" to="/stores">Stores</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <router-link class="nav-item" tag="li" to="/" exact activeClass="active">
          <a class="nav-link" >Home</a>
        </router-link>
        <router-link v-if="!isLoggedIn" class="nav-item" tag="li" to="/login" exact activeClass="active">
          <a class="nav-link" >Login</a>
        </router-link>
        <router-link v-if="!isLoggedIn" class="nav-item" tag="li" to="/register" exact activeClass="active">
          <a class="nav-link" >Register</a>
        </router-link>
        <li class="nav-item"><a href="#" v-if="isLoggedIn" class="nav-link" @click="logout">Logout</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import Counter from '@/components/Counter';

  export default {
    components: {
      Counter,
    },
    data() {
      return {
        showDropdown: false,
      };
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout');
        this.$router.push('/login');
      },
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      },
    },
  };
</script>
<style lang="scss" scoped>
  nav {
    background-color: #4CAF50;
  }


</style>
