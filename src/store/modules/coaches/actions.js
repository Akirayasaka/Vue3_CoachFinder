export default {
    registerCoach(context, data){
        const coachData = {
            id: context.rootGetters.getUserId,
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            hourlyRate: data.rate,
            areas: data.areas
        };

        context.commit('mutRegisterCoach', coachData);
    }
};