export default {
    async registerCoach(context, data){
        const userId = context.rootGetters.getUserId;
        const coachData = {
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            hourlyRate: data.rate,
            areas: data.areas
        };

        // coaches->index.js 有 namespaced 屬性, 需要從底層取得token
        const token = context.rootGetters.getToken;

        // Use FireBase for backend
        const response = await fetch(`https://vue-http-demo-82225-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        //const responseData = await response.json();

        if(!response.ok) {
            //error ..
        }

        //context.commit('mutRegisterCoach', coachData);
        context.commit('mutRegisterCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload) {
        if(!context.getters.shouldUpdate && !payload.forceRefresh){
            return;
        }

        const response = await fetch(`https://vue-http-demo-82225-default-rtdb.firebaseio.com/coaches.json`);
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = [];

        for(const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            }
            coaches.push(coach);
        }

        context.commit('mutSetCoaches', coaches);
        // set cache time
        context.commit('mutSetFetchTimestamp');
    }
};