import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTab2Disabled: true,
    isTab3Disabled: true,
    isTab4Disabled: true,
    selectedCity: null,
    selectedPoint: null,
    activeItem: 'step1',
    selectedCarColor: [],
    selectedCarModel: [],
    selectedCarPrice: [],
    selectedCitySave: null,
    selectedPointSave: null,
    selectedColorSave: null,
    rateItemSave: [],
    option1Save: 'Нет',
    option2Save: 'Нет',
    option3Save: 'Нет',
    selectedCarPicture: null,
    startDate: null,
    timeRangeSave: null,
    saveFinalSum: null
  },
  mutations: {
    switchTo2Tab (state) {
      state.isTab2Disabled = false
    },
    switchTo3Tab (state) {
      state.isTab3Disabled = false
    },
    switchTo4Tab (state) {
      state.isTab4Disabled = false
    },
  },
  actions: {
  },
  modules: {
  }
})

