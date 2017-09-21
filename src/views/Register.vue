<template>
  <div class="login-page">
    <div class="form">
      <form @submit.prevent="register()">
        <span class="text-danger" v-if="errors.firstByRule('name', 'required')">Name is required</span>
        <input type="text" v-model="regForm.name" v-validate="'required'" name="name" placeholder="Name"/>
        <span class="text-danger" v-if="errors.firstByRule('email', 'required')">Email is required</span>
        <span class="text-danger" v-if="errors.firstByRule('email', 'email')">Email is not valid</span>
        <input type="text" v-validate="'required|email'" v-model="regForm.email" name="email" placeholder="Email"/>
        <span class="text-danger" v-if="errors.firstByRule('password', 'required')">Password is required</span>
        <span class="text-danger" v-if="errors.firstByRule('password', 'min')">Minimum 6 characters</span>
        <input type="password" v-validate="'required|min:6'" v-model="regForm.password" name="password" placeholder="Password"/>
        <span class="text-danger" v-if="errors.firstByRule('confirmPassword', 'required')">Confirm password is required</span>
        <span class="text-danger" v-if="errors.firstByRule('confirmPassword', 'confirmed')">Passwords are not much</span>
        <input type="password" v-validate="'required|confirmed:password'" name="confirmPassword" placeholder="Confirm password"/>
        <button>create</button>
        <p class="message">Already registered?
          <router-link to="/login">Sign In</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
  /* eslint-disable arrow-parens,no-console */

  export default {
    data() {
      return {
        regForm: {
          name: '',
          email: '',
          password: '',

        },
      };
    },
    methods: {
      register() {
        this.$validator.validate().then(isValid => {
          console.log(this.regForm);
          if (isValid) {
            this.$store.dispatch('register', this.regForm).then(() => {
              this.$router.push('/');
            }).catch((err) => {
              console.log(err);
            });
          }
        });
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
