export default {
    mutSetUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogout = false;
    },
    mutSetAutoLogout(state) {
        state.didAutoLogout = true;
    }
};
