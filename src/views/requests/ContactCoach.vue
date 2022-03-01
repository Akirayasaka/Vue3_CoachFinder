<template>
    <form>
        <div class="form-control">
            <label for="email">Your E-Mail</label>
            <input type="email" id="email" v-model.trim="model.formData.email" />
        </div>
        <div class="form-control">
            <label for="message">Message</label>
            <textarea id="message" rows="5" v-model.trim="model.formData.message" ></textarea>
        </div>
        <p class="errors" v-if="!model.formData.formIsValid">Please enter a valid email and non-empty message.</p>
        <div class="actions">
            <base-button @click.prevent="submitForm">Send Message</base-button>
        </div>
    </form>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRoute, useRouter } from "vue-router";

export default {
    setup() {
        const model = reactive({
            formData: {
                email: '',
                message: '',
                formIsValid: true
            },
            error: null
        });
        const $store = useStore();
        const $route = useRoute();
        const $router = useRouter();

        const submitForm = () => {
            model.formData.formIsValid = true;
            if(model.formData.email === '' || !model.formData.email.includes('@') || model.formData.message === '' ){
                model.formData.formIsValid = false;
                return;
            }
            
            const dto = {
                coachId: $route.params.id,
                email: model.formData.email,
                message: model.formData.message
            }
            console.log(dto);
            $store.dispatch('requestsModule/contactCoach', dto);
            $router.replace('/coaches');
        }

        return {
            model,
            submitForm
        }
    },
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>