<template>
    <form>
        <div class="form-control" :class="{invalid: !model.formData.firstName.isValid}">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" v-model="model.formData.firstName.val" @blur="clearValidity('firstName')" />
            <p v-if="!model.formData.firstName.isValid">Firstname must not be empty.</p>
        </div>
        <div class="form-control" :class="{invalid: !model.formData.lastName.isValid}">
            <label for="lastname">Lastname</label>
            <input type="text" id="lastname" v-model.trim="model.formData.lastName.val" @blur="clearValidity('lastName')" />
            <p v-if="!model.formData.lastName.isValid">Lastname must not be empty.</p>
        </div>
        <div class="form-control" :class="{invalid: !model.formData.description.isValid}">
            <label for="description">Description</label>
            <textarea id="description" rows="5" v-model.trim="model.formData.description.val" @blur="clearValidity('description')"></textarea>
            <p v-if="!model.formData.description.isValid">Description must not be empty.</p>
        </div>
        <div class="form-control" :class="{invalid: !model.formData.rate.isValid}">
            <label for="rate">Hourly Rate</label>
            <input type="number" id="rate" v-model.number="model.formData.rate.val" @blur="clearValidity('rate')" />
            <p v-if="!model.formData.rate.isValid">Rate must be greater than 0.</p>
        </div>
        <div class="form-control" :class="{invalid: !model.formData.areas.isValid}">
            <h3>Areas of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="model.formData.areas.val" @blur="clearValidity('areas')" />
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="model.formData.areas.val" @blur="clearValidity('areas')" />
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="model.formData.areas.val" @blur="clearValidity('areas')" />
                <label for="career">Career Advisory</label>
            </div>
            <p v-if="!model.formData.areas.isValid">At least one expertise must be selected.</p>
        </div>
        <p v-if="!model.formData.formIsValid">Please fix the above errors and submit again.</p>
        <base-button @click.prevent="submitForm">Register</base-button>
    </form>
</template>

<script>
import { reactive } from '@vue/reactivity';

export default {
    setup(props, context) {
        const model = reactive({
            formData: {
                firstName: {
                    val: '',
                    isValid: true
                },
                lastName: {
                    val: '',
                    isValid: true
                },
                description: {
                    val: '',
                    isValid: true
                },
                rate: {
                    val: null,
                    isValid: true
                },
                areas: {
                    val: [],
                    isValid: true
                },
                formIsValid: true
            }
        });

        const validateForm = () => {
            model.formData.formIsValid = true;
            if(model.formData.firstName.val === ''){
                model.formData.firstName.isValid = false;
                model.formData.formIsValid = false;
            }
            if(model.formData.lastName.val === ''){
                model.formData.lastName.isValid = false;
                model.formData.formIsValid = false;
            }
            if(model.formData.description.val === ''){
                model.formData.description.isValid = false;
                model.formData.formIsValid = false;
            }
            if(!model.formData.rate || model.formData.rate < 0){
                model.formData.rate.isValid = false;
                model.formData.formIsValid = false;
            }
            if(model.formData.areas.val.length === 0){
                model.formData.areas.isValid = false;
                model.formData.formIsValid = false;
            }
        };

        const clearValidity = (input) => {
            model.formData[input].isValid = true;
        };

        const submitForm = () => {
            validateForm();

            if(!model.formData.formIsValid){
                return;
            }

            const dto = {
                firstName: model.formData.firstName.val,
                lastName: model.formData.lastName.val,
                description: model.formData.description.val,
                rate: model.formData.rate.val,
                areas: model.formData.areas.val
            };
            context.emit('save-data', dto);
        };

        return {
            model,
            clearValidity,
            submitForm
        }
    }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>