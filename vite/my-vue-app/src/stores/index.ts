import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';

const pinia = createPinia();

export default store(() => {
  return pinia;
});