export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length >0;
  },
  isCoach(_, getters, _2 , rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.getUserId;
    return coaches.some(coach => coach.id === userId);
  },
  shouldUpdate(state){
    const lastFetch = state.lastFetch;
    if(!lastFetch){
      return true;
    }
    const currentTimeStamp = new Date().getTime();

    // 大於1分鐘才return true;
    return (currentTimeStamp - lastFetch) /1000 > 60;
  }
};
