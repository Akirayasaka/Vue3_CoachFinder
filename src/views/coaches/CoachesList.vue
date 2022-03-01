<template>
    <base-dialog :show="!!model.error" title="An error occurred!" @close="handleError">
        <p>{{ model.error }}</p>
    </base-dialog>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click.prevent="loadCoaches">Refresh</base-button>
                <base-button v-if="!isCoach && !model.isLoading" link to="/register">Register as Coach</base-button>
            </div>
            <div v-if="model.isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoaches">
                <!-- <li v-for="coach in filteredCoaches" :key="coach.id">
                    {{coach.firstName}}
                </li> -->
                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id" :firstName="coach.firstName" :lastName="coach.lastName" :areas="coach.areas" :rate="coach.hourlyRate"></coach-item>
            </ul>
            <h3 v-else>No coaches found.</h3>
        </base-card>
    </section>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core';
import { useStore } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: { CoachItem, CoachFilter },
    setup() {
        const $store = useStore();
        const model = reactive({
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            },
            isLoading: false,
            error: null
        });

        const setFilters = (updatedFilters) => {
            model.activeFilters = updatedFilters;
        };
        const loadCoaches = async () => {
            model.isLoading = true;
            try{
                await $store.dispatch('coachesModule/loadCoaches');
            }catch(error){
                model.error = error.message || 'Something went wrong!';
            }
            model.isLoading = false;
        };
        const handleError = () => {
            model.error = null;
        };

        const isCoach = computed(() => {
            return $store.getters['coachesModule/isCoach'];
        });
        const filteredCoaches = computed(() => {
            //return $store.getters['coachesModule/coaches'];
            const coaches = $store.getters['coachesModule/coaches'];
            return coaches.filter(coach => {
                if(model.activeFilters.frontend && coach.areas.includes('frontend')){
                    return true;
                }
                if(model.activeFilters.backend && coach.areas.includes('backend')){
                    return true;
                }
                if(model.activeFilters.career && coach.areas.includes('career')){
                    return true;
                }
                return false;
            });
        });
        const hasCoaches = computed(()=>{
            return !model.isLoading && $store.getters['coachesModule/hasCoaches'];
        })

        onMounted(() => {
            loadCoaches();
        });

        return {
            model,
            loadCoaches,
            handleError,
            setFilters,
            isCoach,
            filteredCoaches,
            hasCoaches
        }
    },
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>