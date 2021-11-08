import { createStore } from "vuex"
import { API_URL, FILTER_PIC } from "../config.js"
import getAuthorizationHeader from '../helpers.js'

const store = createStore({
  state() {
    return {
      scenicSpot: [],
      restaurant: [],
      hotel: []
    }
  },
  mutations: {
    setScenicSpot(state, payload) {
      state.scenicSpot = payload
    },
    setRestaurant(state, payload) {
      state.restaurant = payload
    },
    setHotel(state, payload) {
      state.hotel = payload
    }
  },
  actions: {
    async setScenicSpot(context, val) { 
      const API = val ? `${API_URL}/v2/Tourism/ScenicSpot?$top=${val}&${FILTER_PIC}&$format=JSON` : `${API_URL}/v2/Tourism/ScenicSpot&${FILTER_PIC}`
      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得觀光景點資料失敗')
      }

      const responseData = await response.json()

      console.log(responseData)

      context.commit('setScenicSpot', responseData)
    },
    async setRestaurant(context, val) {
      const API = val ? `${API_URL}/v2/Tourism/Restaurant?$top=${val}&${FILTER_PIC}&$format=JSON` : `${API_URL}/v2/Tourism/Restaurant&${FILTER_PIC}`
      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得觀光餐飲資料失敗')
      }

      const responseData = await response.json()

      context.commit('setRestaurant', responseData)
    },
    async setHotel(context, val) {
      const API = val ? `${API_URL}/v2/Tourism/Hotel?$top=${val}&${FILTER_PIC}&$format=JSON` : `${API_URL}/v2/Tourism/Hotel&${FILTER_PIC}`
      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得觀光旅宿資料失敗')
      }
      

      const responseData = await response.json()

      context.commit('setHotel', responseData)
    }
  },
  getters: {
    scenicSpot(state) {
      return state.scenicSpot
    },
    restaurant(state) {
      return state.restaurant
    },
    hotel(state) {
      return state.hotel
    }
  }
})

export default store