<template>
  <div>
    <h2 v-if="loading">Loading...</h2>
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} | R$ {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { createComponent, Ref } from '@vue/composition-api';
import { useQuery, useResult } from '@vue/apollo-composable';

import { Product } from '@/models';
import productsQuery from '@/graphql/products.query.gql';

export default createComponent({
  name: 'Products',
  setup() {
    const { loading, result } = useQuery<{ products: Product[] }>(
      productsQuery,
    );
    const products = useResult(result, null, data => data.products);

    return {
      loading,
      products,
    };
  },
});
</script>
