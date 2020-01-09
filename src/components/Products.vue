<template>
  <div>
    <h1>Products</h1>

    <ProductSave />

    <h2 v-if="loading">Loading...</h2>
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        <span>{{ product.name }} | R$ {{ product.price }}</span>
        <button @click="deleteProduct(product)">x</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';

import { Product } from '@/models';
import ProductSave from './ProductSave.vue';
import deleteProductMutation from '@/graphql/deleteProduct.mutation.gql';
import productsQuery from '@/graphql/products.query.gql';

export default createComponent({
  name: 'Products',
  components: {
    ProductSave,
  },
  setup() {
    const { loading, result } = useQuery<{ products: Product[] }>(
      productsQuery,
    );
    const products = useResult(result);

    const { mutate: deleteProductExec } = useMutation<Product, { id: string }>(
      deleteProductMutation,
      {
        context: {
          headers: {
            Authorization: 'Bearer token',
          },
        },
        update: (cache, response) => {
          console.log('Res: ', response);
          const {
            data: { deleteProduct },
          } = response;
          const query = productsQuery;
          const data = cache.readQuery({ query });
          data.products = data.products.filter(
            p => p._id !== deleteProduct._id,
          );
          cache.writeQuery({ query, data });
        },
      },
    );

    const deleteProduct = async (product: Product) => {
      const { _id, name } = product;

      const confirm = window.confirm(
        `Are you sure to delete "${name}" product?`,
      );

      if (confirm) {
        let message: string;
        try {
          await deleteProductExec({ _id });
          message = 'Sucess!';
        } catch (err) {
          message = `Error deleting product: ${err.message}`;
        }
        window.alert(message);
      }
    };

    return {
      deleteProduct,
      loading,
      products,
    };
  },
});
</script>
