<template>
  <div>Products</div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { useQuery } from '@vue/apollo-composable';

import { Product } from '@/models';
import productsQuery from '@/graphql/products.query.gql';

export default createComponent({
  name: 'Products',
  setup() {
    const { result } = useQuery<Product[]>(productsQuery);

    return {
      result,
    };
  },
});
</script>
