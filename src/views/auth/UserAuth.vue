<template>
  <base-card>
    <form>
      <div class="form-contorl">
        <label for="email">E-mail</label>
        <input type="email" name="" id="email" v-model.trim="model.formData.email" />
      </div>
      <div class="form-contorl">
        <label for="password">Password</label>
        <input type="password" name="" id="password" v-model.trim="model.formData.password" />
      </div>
      <br/>
      <p v-if="!model.formIsValid">Please enter a valid email and password(must be at least 6 characters long.)</p>
      <base-button @click.prevent="submitForm">{{submitButtonCaption}}</base-button>
      <base-button type="button" mode="flat" @click.prevent="switchAuthMode">{{switchModeButtonCaption}}</base-button>
    </form>
  </base-card>
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
        password: ''
      },
      formIsValid: true,
      mode: 'login'
    });
    const $store = useStore();

    const submitForm = () => {
      model.formIsValid = true;
      if(model.formData.email === '' || !model.formData.email.includes('@') || model.formData.password.length < 6){
        model.formIsValid = false;
        return;
      }
      // send http request
      if(model.mode === 'login'){
        console.log(model.formData);
      }else{
        // vuex auth沒有namespaced, 可直接呼叫
        $store.dispatch('signup', model.formData);
      }
    };
    const switchAuthMode = () =>{
      if(model.mode === 'login'){
        model.mode = 'signup';
      }else{
        model.mode = 'login';
      }
    }

    const submitButtonCaption = computed(()=>{
      if(model.mode === 'login'){
        return 'Login';
      }else{
        return 'Signup';
      }
    });
    const switchModeButtonCaption = computed(()=>{
      if(model.mode === 'login'){
        return 'Signup instead';
      }else{
        return 'Login instead';
      }
    });

    return {
      model,
      submitForm,
      switchAuthMode,
      submitButtonCaption,
      switchModeButtonCaption
    }
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
