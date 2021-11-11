// export default function getlocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position){
//       console.log(position)
//     }, function(){
//       alert('Could not get ypur position')
//     })
//   }
// }

import { ref } from 'vue'

export default function getlocation() {
  const setPosition = ref(null)

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error)
  } else {
    alert('你的裝置不支援地理位置功能。')
  }

  function error() {
    alert('無法取得你的地理位置')
  }

  function success(position) {
    setPosition.value = position
  }

  return { setPosition }
}