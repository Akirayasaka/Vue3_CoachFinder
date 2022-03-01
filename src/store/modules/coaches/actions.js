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

        // Use FireBase for backend
        const response = await fetch(`https://vue-http-demo-82225-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
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
    }
};