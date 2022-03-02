<template>
  <div>
    <base-dialog :show="!!model.error" title="An error occured" @close="handlerError">
      <p>{{ model.error }}</p>
    </base-dialog>
    <base-dialog :show="model.isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form>
        <div class="form-contorl">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="model.formData.email" />
        </div>
        <div class="form-contorl">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="model.formData.password" />
        </div>
        <br />
        <p v-if="!model.formIsValid">Please enter a valid email and password(must be at least 6 characters long.)</p>
        <base-button @click.prevent="submitForm">{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click.prevent="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
  setup() {
    const model = reactive({
      formData: {
        email: '',
        password: '',
      },
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    });
    const $store = useStore();

    const submitForm = async () => {
      model.formIsValid = true;
      if (
        model.formData.email === '' ||
        !model.formData.email.includes('@') ||
        model.formData.password.length < 6
      ) {
        model.formIsValid = false;
        return;
      }

      model.isLoading = true;

      // send http request
      try {
        if (model.mode === 'login') {
          console.log(model.formData);
        } else {
          // vuex auth沒有namespaced, 可直接呼叫
          await $store.dispatch('signup', model.formData);
        }
      } catch (err) {
        model.error = err.message || 'Failed to authenticate, try later.';
      }

      model.isLoading = false;
    };
    const switchAuthMode = () => {
      if (model.mode === 'login') {
        model.mode = 'signup';
      } else {
        model.mode = 'login';
      }
    };
    const handlerError = () => {
      model.error = null;
    };

    const submitButtonCaption = computed(() => {
      if (model.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    });
    const switchModeButtonCaption = computed(() => {
      if (model.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    });

    return {
      model,
      handlerError,
      submitForm,
      switchAuthMode,
      submitButtonCaption,
      switchModeButtonCaption,
    };
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
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
</style>
