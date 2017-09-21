<template>
  <div class="login-page">
    <div class="form">
      <form @submit.prevent="login()">
        <span class="text-danger" v-if="errors.firstByRule('email', 'required')">Email is required</span>
        <input type="text" v-model="loginForm.email" v-validate="'required'" placeholder="email" name="email"/>
        <span class="text-danger" v-if="errors.firstByRule('password', 'required')">Password is required</span>
        <input type="password" v-model="loginForm.password" v-validate="'required'" placeholder="password" name="password"/>
        <button>login</button>
        <p class="message">Not registered?
          <router-link to="/register">Create an account</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        loginForm: {
          email: '',
          password: '',

        },
      };
    },
    methods: {
      login() {
        this.$validator.validate().then((isValid) => {
          console.log(this.loginForm);
          if (isValid) {
            this.$store.dispatch('login', this.loginForm).then(() => {
              this.$router.push('/');
            });
          }
        });
      },
    },
    beforeCreate() {
      this.$store.dispatch('logout');
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
