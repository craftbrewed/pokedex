"use strict";

const state = {
    timeOfDay: "Day"
};

const getters = {
    getTimeOfDay(state){
        return state.timeOfDay;
    }
};

const mutations = {
    setTimeOfDay(state, tod){
        state.timeOfDay = tod;
    }
};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions
};