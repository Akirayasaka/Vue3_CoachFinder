export default {
    async login(context, payload){
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    async signup(context, payload){
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        });
    },
    async auth(context, payload) {
        const mode = payload.mode;
        const ApiKey = "firebaseApiKey";

        // firebase restAPI: https://firebase.google.com/docs/reference/rest/auth
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ApiKey}`;
        if(mode === 'signup'){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ApiKey}`;
        }
        
        const response = await fetch(url , {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if(!response.ok){
            //console.log(responseData);
            const error = new Error(responseData.message || 'Failed to login. Check your login data.');
            throw error;
        }

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);

        //console.log(responseData);
        context.commit('mutSetUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });
    },
    tryLogin(context) {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if(token && userId) {
            context.commit('mutSetUser', {
                token: token,
                userId: userId,
                tokenExpiration: null
            });
        }
    },
    logout(context) {
        context.commit('mutSetUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        });
    }
};