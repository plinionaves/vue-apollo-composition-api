<template>
  <div>
    <input type="text" v-model="product.name" placeholder="Name" />
    <input
      type="text"
      v-model="product.description"
      placeholder="Description"
    />
    <input type="number" v-model.number="product.price" placeholder="Price" />
    <input type="text" v-model="product.unit" placeholder="Unit" />
    <button type="submit" @click.prevent="save">Save</button>
    <span v-if="loading">Saving...</span>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api';
import { useMutation } from '@vue/apollo-composable';

import { Product } from '../models';
import productsQuery from '@/graphql/products.query.gql';
import createProductMutation from '@/graphql/createProduct.mutation.gql';

export default createComponent({
  setup() {
    const product = reactive<Product>({
      name: '',
      description: '',
      price: 0,
      unit: '',
    });

    const { loading, mutate: saveProduct } = useMutation(
      createProductMutation,
      {
        context: {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGRkZDk3YjJlZDg4YzAwMjljM2YxZTUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE1Nzg1OTg2NDMsImV4cCI6MTU3ODYwNTg0M30.vHFpfTswKm31W1Op6v7ha_Aa9BFucEMwpjagm8RRg4s',
          },
        },
        update: (cache, res) => {
          console.log('Server Res: ', res);
          const {
            data: { createProduct },
          } = res;
          const query = productsQuery;
          const data = cache.readQuery({ query });
          data.products = [...data.products, createProduct];
          cache.writeQuery({ query, data });
        },
      },
    );

    const save = async () => {
      try {
        const savedProduct = await saveProduct({
          data: product,
        });

        console.log('Saved: ', savedProduct);
      } catch (err) {
        console.log('Error creating Product: ', err);
      }
    };

    return {
      loading,
      product,
      save,
    };
  },
});
</script>

<style lang="scss" scoped>
input {
  display: block;
  margin: 5px 0;
  font-size: 14px;
}
</style>
