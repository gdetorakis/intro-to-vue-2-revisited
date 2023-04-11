<template>
  <div class="product">

    <div class="product-image">
      <img v-bind:src="image" alt="Product image">
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <h2>{{ description }}</h2>
      <a :href="link" target="_blank">More products like this</a>
      <p v-if="inStock">In Stock</p>
      <p v-else-if="inStock || (variants[selectedVariant].variantQuantity <= 10
            && variants[selectedVariant].variantQuantity > 0)">
        Almost out of stock!</p>
      <p v-else :class="{'out-of-stock': (!inStock || inventory === 0)}">Out of Stock</p>
      <span v-if="onSale">On Sale!</span>
      <InfoTabs :shipping="shipping" :details="details" :sizes="sizes"></InfoTabs>
      <div v-for="(variant, index) in variants" :key="index"
           class="color-box"
           :style="{backgroundColor: variant.variantColor}"
           @mouseover="updateProduct(index)"
      />
      <div>
        <button
          @click="addToCart" :disabled="!inStock"
          :class="{disabledButton: !inStock}"
        >Add to Cart
        </button>
        <button @click="removeFromCart">Remove from Cart</button>
      </div>
    </div>
    <ProductTabs :reviews="reviews"/>
  </div>
</template>

<script>
import ProductImageGreen from '../assets/vmSocks-green.jpg';
import ProductImageBlue from '../assets/vmSocks-blue.jpg';
import ProductTabs from './ProductTabs';
import { eventBus } from '../main';
import InfoTabs from './InfoTabs';


export default {
  name: 'Product',
  components: { InfoTabs, ProductTabs },
  props: {
    premium: Boolean,
    required: true,
  },
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      description: 'Product description...',
      selectedVariant: 0,
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      inventory: 100,
      onSale: true,
      details: ['80% cotton', '20% polyester', 'Gender Neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantQuantity: 100,
          variantImage: ProductImageGreen,
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantQuantity: 0,
          variantImage: ProductImageBlue,
        },
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      reviews: [],
    };
  },
  methods: {
    updateProduct(index) {
      this.selectedVariant = index;
    },
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.variants[this.selectedVariant].variantColor} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      }
      return 2.99;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
  },
  mounted() {
    eventBus.$on('review-submitted', (productReview) => {
      this.reviews.push(productReview);
    });
  },
};
</script>

<style scoped>
.product {
  display: flex;
  flex-flow: wrap;
  padding: 1rem;
}

.out-of-stock {
  text-decoration: line-through;
}

.product-image {
  width: 80%;
}

.product-image,
.product-info {
  margin-top: 10px;
  width: 50%;
}

.color-box {
  width: 40px;
  height: 40px;
  margin-top: 5px;
}

.disabledButton {
  background-color: #d8d8d8;
}
</style>
