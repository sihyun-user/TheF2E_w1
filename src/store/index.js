import { createStore } from "vuex"
import { API_URL, FILTER_PIC, RES_PER_PAGE } from "../config.js"
import getAuthorizationHeader from '../helpers.js'

const store = createStore({
  state() {
    return {
      scenicSpot: [],
      restaurant: [],
      hotel: [],
      results: [],
      resultsPerPage: RES_PER_PAGE,
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
    setPageResults(state, payload) {
      state.results = payload
    }
  },
  actions: {
    async setScenicSpot(context, {val, city}) { 
      const API = val ? `${API_URL}/v2/Tourism/ScenicSpot?$top=${val}&$format=JSON&${FILTER_PIC}`  
      : ( city ? `${API_URL}/v2/Tourism/ScenicSpot/${city}?$format=JSON&${FILTER_PIC}` : `${API_URL}/v2/Tourism/ScenicSpot?$format=JSON&${FILTER_PIC}`)

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
    async setRestaurant(context, {val, city}) {
      const API = val ? `${API_URL}/v2/Tourism/Restaurant?$top=${val}&$format=JSON&${FILTER_PIC}`  
      : ( city ? `${API_URL}/v2/Tourism/Restaurant/${city}?$format=JSON&${FILTER_PIC}` : `${API_URL}/v2/Tourism/Restaurant?$format=JSON&${FILTER_PIC}`)
      
      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得觀光餐飲資料失敗')
      }

      const responseData = await response.json()

      context.commit('setRestaurant', responseData)
    },
    async setHotel(context, {val, city}) {
      const API = val ? `${API_URL}/v2/Tourism/Hotel?$top=${val}&$format=JSON&${FILTER_PIC}`  
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
    setPageResults(context, data , page) {
      const resultsPerPage = context.state.resultsPerPage

      // page(1)抓取 0 - 7 的陣列項目 | page(2)抓取 8 - 15 的陣列項目
      const start = (page -1) * resultsPerPage // 0
      const end = page * resultsPerPage // 7
      
      const filterData = data.slice(start, end)
      
      context.commit('setPageResults', filterData)
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
    results(state) {
      return state.results
    }
  }
})

export default store