export default {
    mutRegisterCoach(state, payload) {
        state.coaches.push(payload);
    },
    mutSetCoaches(state, payload) {
        state.coaches = payload;
    },
    mutSetFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    }
};