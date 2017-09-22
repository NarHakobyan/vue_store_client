<template>
  <div class="card m-2" style="background-color: #EEEEEE; border-color: #E0E0E0;">
    <div class="card-block">
      <h3 class="card-title">{{user.name}}</h3>
      <p class="card-text">{{user.email}}</p>
      <a href="#" class="btn btn-danger float-right">delete admin</a>
    </div>
  </div>
</template>

<script>

  export default {
    props: ['user'],
    data() {
      return {};
    },
    methods: {},
  };
</script>
