<template>
    <base-card>
        <h2>Find Your Coach</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" checked @change="setFilter" />
            <label for="frontend">Frontend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="backtend" checked @change="setFilter" />
            <label for="backend">Backtend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="career" checked @change="setFilter" />
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    setup(props, context) {
        const model = reactive({
            filters:{
                frontend: true,
                backend: true,
                career: true
            }
        });

        const setFilter = (event) => {
            const inputId = event.target.id;
            const isActive = event.target.checked;
            const updatedFilters = {
                ...model.filters,
                [inputId]: isActive
            };
            model.filters = updatedFilters;
            context.emit('change-filter', updatedFilters);
        };
        
        return {
            model,
            setFilter
        }
    }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>