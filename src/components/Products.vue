<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.name }} | R$ {{ product.price }}
    </li>
  </ul>
</template>

<script lang="ts">
import { createComponent, Ref } from '@vue/composition-api';
import { useQuery, useResult } from '@vue/apollo-composable';

import { Product } from '@/models';
import productsQuery from '@/graphql/products.query.gql';

export default createComponent({
  name: 'Products',
  setup() {
    const { result } = useQuery<{ products: Product[] }>(productsQuery);
    const products = useResult(result, null, data => data.products);

    return {
      products,
    };
  },
});
</script>
