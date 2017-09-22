<template>
  <div class="login-page">
    <div class="form">
      <h3 class="text-capitalize">create store</h3>
      <form class="form-inline" @submit.prevent="createStore()">
        <span class="text-danger" v-if="errors.firstByRule('name', 'required')">Name is required</span>
        <input type="text" v-model="createStoreForm.name" v-validate="'required'" name="name" placeholder="Name"/>
        <label class="form-check-label w-100 align-items-baseline px-1">
          is store public?
          <input style=" margin-left: auto; width: auto; " class="form-check-input" v-model="createStoreForm.public" type="checkbox">
        </label>
        <input type="file" id="file">
        <button type="submit">create</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        createStoreForm: {
          name: '',
          public: true,
        },
      };
    },
    methods: {
      async createStore() {
        const isValid = await this.$validator.validate();
        if (isValid) {
          await this.$store.dispatch('createStore', this.createStoreForm);
          this.$router.push({ name: 'stores' });
        }
      },
    },
  };
</script>
<style scoped>
  .login-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
  }

  .form {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }

  .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #4CAF50;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    cursor: pointer;
  }

  .form button:hover, .form button:active, .form button:focus {
    background: #43A047;
  }

  .form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
  }

  .form .message a {
    color: #4CAF50;
    text-decoration: none;
  }

  .form .register-form {
    display: none;
  }
</style>
