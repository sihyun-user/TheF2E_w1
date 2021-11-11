import { createStore } from "vuex"
import { API_URL, FILTER_PIC } from "../config.js"
import getAuthorizationHeader from '../helpers.js'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [createPersistedState()],
  state() {
    return {
      scenicSpot: [],
      restaurant: [],
      hotel: [],
      positions: []
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
    setPositions (state, payload) {
      state.positions = payload
    }
  },
  actions: {
    async setScenicSpot(context, {val, city}) { 
      const API = val && !city ? `${API_URL}/v2/Tourism/ScenicSpot?$top=${val}&$format=JSON&${FILTER_PIC}`  
      : ( city ? `${API_URL}/v2/Tourism/ScenicSpot/${city}?$format=JSON&${FILTER_PIC}` : `${API_URL}/v2/Tourism/ScenicSpot?$format=JSON&${FILTER_PIC}`)

      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得觀光景點資料失敗')
      }

      const responseData = await response.json()
      // console.log(responseData)

      context.commit('setScenicSpot', responseData)
    },
    async setRestaurant(context, {val, city}) {
      const API = val && !city ? `${API_URL}/v2/Tourism/Restaurant?$top=${val}&$format=JSON&${FILTER_PIC}`  
      : ( city ? `${API_URL}/v2/Tourism/Restaurant/${city}?$format=JSON&${FILTER_PIC}` : `${API_URL}/v2/Tourism/Restaurant?$format=JSON&${FILTER_PIC}`)
      
      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得觀光餐飲資料失敗')
      }

      const responseData = await response.json()

      // console.log(responseData)

      context.commit('setRestaurant', responseData)
    },
    async setHotel(context, {val, city}) {
      const API = val && !city ? `${API_URL}/v2/Tourism/Hotel?$top=${val}&$format=JSON&${FILTER_PIC}`  
      : ( city ? `${API_URL}/v2/Tourism/Hotel/${city}?$format=JSON&${FILTER_PIC}` : `${API_URL}/v2/Tourism/Hotel?$format=JSON&${FILTER_PIC}`)
      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得觀光旅宿資料失敗')
      }
      

      const responseData = await response.json()

      context.commit('setHotel', responseData)
    },
    setPositions(context) {
      const posData = []
      const data = [
        ...context.getters.restaurant, 
        ...context.getters.scenicSpot,
        ...context.getters.hotel
      ]
      data.forEach(el => {
        const pos = {
          id: el.ID,
          name: el.Name,
          phoen: el.Phone,
          address: el.Address,
          picture: el.Picture.PictureUrl1,
          lat: el.Position.PositionLat, 
          lng: el.Position.PositionLon,
        }
        posData.push(pos)
      });

      context.commit('setPositions', posData)
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
    positions(state) {
      return state.positions
    }
  }
})

export default store