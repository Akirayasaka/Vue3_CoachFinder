<template>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <base-button link to="/register">Register as Coach</base-button>
            </div>
            <ul v-if="hasCoaches">
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
import { computed, reactive } from '@vue/runtime-core';
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
            }
        });

        const setFilters = (updatedFilters) => {
            model.activeFilters = updatedFilters;
        };

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
            return $store.getters['coachesModule/hasCoaches'];
        })

        return {
            model,
            setFilters,
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