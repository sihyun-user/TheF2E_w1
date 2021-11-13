import { createStore } from "vuex"
import { API_URL, FILTER_PIC, TOP_DATA } from "../config.js"
import getAuthorizationHeader from '../helpers.js'
import createPersistedState from "vuex-persistedstate"

const store = createStore({
  plugins: [createPersistedState()],
  state() {
    return {
      scenicSpot: [],
      restaurant: [],
      hotel: [],
      hot: []
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
    },
    setPositions(state, payload) {
      state.positions = payload
    },
    setHot(state, payload) {
      return state.hot = payload
    }
  },
  actions: {
    async setScenicSpot(context, city) { 
      const API = !city ? `${API_URL}/v2/Tourism/ScenicSpot?$top=${TOP_DATA}&$format=JSON&${FILTER_PIC}`  
      : `${API_URL}/v2/Tourism/ScenicSpot/${city}?$format=JSON&${FILTER_PIC}`

      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得景點資料失敗')
      }

      const responseData = await response.json()
      // console.log(responseData)

      context.commit('setScenicSpot', responseData)
    },
    async setRestaurant(context, city) {
      const API = !city ? `${API_URL}/v2/Tourism/Restaurant?$top=${TOP_DATA}&$format=JSON&${FILTER_PIC}`  
      : `${API_URL}/v2/Tourism/Restaurant/${city}?$format=JSON&${FILTER_PIC}`
      
      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得餐飲資料失敗')
      }

      const responseData = await response.json()
      // console.log(responseData)

      context.commit('setRestaurant', responseData)
    },
    async setHotel(context, city) {
      const API = !city ? `${API_URL}/v2/Tourism/Hotel?$top=${TOP_DATA}&$format=JSON&${FILTER_PIC}`  
      : `${API_URL}/v2/Tourism/Hotel/${city}?$format=JSON&${FILTER_PIC}`
      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得旅宿資料失敗')
      }
      

      const responseData = await response.json()

      context.commit('setHotel', responseData)
    },
    async setHot(context, type) {
      let API
      if(type == 'restaurant') {
        API = `${API_URL}/v2/Tourism/Restaurant?$top=${TOP_DATA}&$format=JSON&${FILTER_PIC}`
      }else if(type == 'hotel') {
        API = `${API_URL}/v2/Tourism/Hotel?$top=${TOP_DATA}&$format=JSON&${FILTER_PIC}`
      }else {
        API = `${API_URL}/v2/Tourism/ScenicSpot?$top=${TOP_DATA}&$format=JSON&${FILTER_PIC}`
      }

      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得熱門資料失敗')
      }
      
      const responseData = await response.json()

      context.commit('setHot', responseData)
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
    },
    hot(state) {
      return state.hot
    }
  }
})

export default store