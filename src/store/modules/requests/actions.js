export default {
    async contactCoach(context, payload) {
        //id 改由firebase自動產生
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };

        // 新增request
        const response = await fetch(`https://vue-http-demo-82225-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        // firebase 產生的unique id, 欄位名稱為 name
        newRequest.id = responseData.name;
        // 頁面上用到的數值, 不會存入firebase
        newRequest.coachId = payload.coachId;

        context.commit('mutAddRequest', newRequest);
    },
    async fetchRequests(context){
        const coachId = context.rootGetters.userId;
        // requests -> index.js 有 namespaced 屬性, 需要從底層取得token
        const token = context.rootGetters.getToken;
        const response = await fetch(`https://vue-http-demo-82225-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`);
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch requests.');
            throw error;
        }

        const requests = [];

        for(const key in responseData){
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            }
            requests.push(request);
        }

        context.commit('mutSetRequests', requests);
    }
};