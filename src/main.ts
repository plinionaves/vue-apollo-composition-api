import Vue from 'vue';
import VueCompositionApi, { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import apolloClient from '@/apollo';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

new Vue({
  setup() {
    provide(DefaultApolloClient, apolloClient);
    return {};
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app');
