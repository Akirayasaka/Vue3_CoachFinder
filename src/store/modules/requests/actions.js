export default {
    contactCoach(context, payload) {
        const newRequest = {
            id: new Date().toISOString(),
            //id: context.rootGetters.getUserId,
            coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message
        };
        context.commit('mutAddRequest', newRequest);
    }
};