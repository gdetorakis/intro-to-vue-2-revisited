<template>
  <div>
    <div class="nav-bar"></div>
    <div class="cart">
      <p>Cart({{ cart.length }})</p>
    </div>
    <div id="app">
      <Product :premium="premium" @add-to-cart="updateCartAdd"
               @remove-from-cart="updateCartRemove"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Product from './components/Product';

export default {
  name: 'App',
  components: { Product },
  data() {
    return {
      premium: false,
      cart: [],
    };
  },
  methods: {
    updateCartAdd(id) {
      this.cart.push(id);
    },
    updateCartRemove(id) {
      if (this.cart.length > 0) {
        this.cart.splice(this.cart.findIndex(val => val === id), 1);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  color: #282828;
  margin: 0;
}

.nav-bar {
  background: linear-gradient(-90deg, #84CF6A, #16C0B0);
  height: 60px;
  margin-bottom: 15px;
}

img {
  border: 1px solid #d8d8d8;
  width: 70%;
  margin: 40px;
  box-shadow: 0 .5px 1px #d8d8d8;
}

.cart {
  margin-right: 25px;
  float: right;
  border: 1px solid #d8d8d8;
  padding: 5px 20px;
}

button {
  margin-top: 30px;
  border: none;
  background-color: #1E95EA;
  color: white;
  height: 40px;
  width: 100px;
  font-size: 14px;
}

input {
  width: 100%;
  height: 25px;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 60px;
}

</style>
