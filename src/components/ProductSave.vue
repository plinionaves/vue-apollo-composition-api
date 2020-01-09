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
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api';
import { useMutation } from '@vue/apollo-composable';

import { Product } from '../models';
import createProductMutation from '@/graphql/createProduct.mutation.gql';

export default createComponent({
  setup() {
    const product = reactive<Product>({
      name: '',
      description: '',
      price: 0,
      unit: '',
    });

    const { mutate: saveProduct } = useMutation(createProductMutation);

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
      save,
      product,
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
