// function getlocation() {
//   if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(success, error)
//   } else {
//     alert('你的裝置不支援地理位置功能。')
//   }

//   function error() {
//     alert('無法取得你的地理位置')
//   }

//   function success(position) {
//     const location = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     }

//     locationVal.value = location
//   }
// }
// getlocation()

// function setlocation() {
//   if (locationVal.value == null) {
//     return
//   }
//   console.log(locationVal.value)

//   // initMap()
// }