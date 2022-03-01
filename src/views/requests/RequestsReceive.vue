<template>
  <div>
    <base-dialog :show="!!model.error" title="An error occurred!" @close="handleError">
      <p>{{ model.error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="model.isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !model.isLoading">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          >
          </request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core';
import { useStore } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: { RequestItem },
  setup() {
    const model = reactive({
      isLoading: false,
      error: null
    });
    const $store = useStore();

    const loadRequests =  async() => {
      model.isLoading =  true;
      try{
        await $store.dispatch('requestsModule/fetchRequests');
      }catch(error){
        model.error = error.message || 'Something failed!';
      }
      model.isLoading = false;
    };
    const handleError = () =>{
      model.error = null;
    }

    const receivedRequests = computed(() => {
      return $store.getters['requestsModule/requests'];
    });
    const hasRequests = computed(() => {
      return $store.getters['requestsModule/hasRequests'];
    });

    onMounted(()=>{
      loadRequests();
    });

    return {
      model,
      receivedRequests,
      hasRequests,
      loadRequests,
      handleError
    };
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
