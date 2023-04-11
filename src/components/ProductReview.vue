<template>
  <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </p>
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" />
    </p>
    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review" />
    </p>
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating" >
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
    <p>
      <input type="submit" value="Submit">
    </p>
  </form>
</template>

<script>
import { eventBus } from '../main';

export default {
  name: 'ProductReview',
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        const productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        };
        eventBus.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) {
          this.errors.push('Name required.');
        }
        if (!this.review) {
          this.errors.push('Review required.');
        }
        if (!this.rating) {
          this.errors.push('Rating required.');
        }
      }
    },
  },
};
</script>

<style scoped>
  .review-form {
    width: 400px;
    padding: 20px;
    margin: 40px;
    border: 1px solid #d8d8d8;
  }
</style>
