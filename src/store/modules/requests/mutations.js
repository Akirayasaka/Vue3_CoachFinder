export default {
    mutAddRequest(state, payload){
        state.requests.push(payload);
    },
    mutSetRequests(state, payload){
        state.requests = payload;
    }
};