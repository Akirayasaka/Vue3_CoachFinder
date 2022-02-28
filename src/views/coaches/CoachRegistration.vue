<template>
    <section>
        <base-card>
            <h2>Register as a coach now!</h2>
            <coach-form @save-data="saveData"></coach-form>
        </base-card>
    </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

export default {
    components: { CoachForm },
    setup() {

        const $store = useStore();
        const $router = useRouter();

        const saveData = (formData) => {
            $store.dispatch('coachesModule/registerCoach', formData);

            // 如同location.replace, 無法返回上一頁
            $router.replace('/coaches');

            // 如同location.href, 可返回上一頁
            //$router.push('/coaches');
        };

        return {
            saveData
        }
    },
}
</script>