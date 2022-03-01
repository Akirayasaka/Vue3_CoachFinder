export default {
    requests(state, getters, rootState, rootGetters) {
        const coachId = rootGetters.getUserId;
        return state.requests.filter(req => req.coachId === coachId);
    },
    hasRequests(state, getters) {
        //return state.requests && state.requests.length > 0;
        return getters.requests && getters.requests.length > 0;
    }
};