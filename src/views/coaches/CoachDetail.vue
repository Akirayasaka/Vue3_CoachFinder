<template>
    <section>
        <base-card>
            <h2>{{ fullName }}</h2>
            <h3>${{ rate }}</h3>
        </base-card>
    </section>
    <section>
        <base-card>
            <header>
                <h2>Interested? Reach out now!</h2>
                <base-button link :to="contactLink">Contact</base-button>
            </header>
            <router-view></router-view>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
            <p>{{ description }}</p>
        </base-card>
    </section>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRoute } from "vue-router";

export default {
    props: ['id'],
    setup(props) {
        const model = reactive({
            selectedCoach: null
        });
        const $store = useStore();
        const $route = useRoute();

        const fullName = computed(() => {
            return model.selectedCoach !== null ? model.selectedCoach?.firstName + ' ' + model.selectedCoach?.lastName : '';
        });
        const contactLink = computed(() => {
            return model.selectedCoach !== null ? $route.path + '/' + props.id + '/contact' : '' ;
        });
        const areas = computed(() => {
            return model.selectedCoach !== null ? model.selectedCoach.areas : [];
        });
        const rate = computed(()=>{
            return model.selectedCoach !== null ? model.selectedCoach.hourlyRate : '';
        });
        const description = computed(() => {
            return model.selectedCoach !== null ? model.selectedCoach.description : '';
        });

        onMounted(()=>{
            console.log($store.getters['coachesModule/coaches']);
            model.selectedCoach = $store.getters['coachesModule/coaches'].find(c => c.id === props.id);
        });

        return {
            model,
            fullName,
            contactLink,
            areas,
            rate,
            description
        }
    },
}
</script>