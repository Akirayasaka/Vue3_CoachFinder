import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
    namespace: true,
    state: {
        requests: []
    },
    actions,
    getters,
    mutations
};