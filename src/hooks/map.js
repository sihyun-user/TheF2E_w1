import { ref } from 'vue';

export default function initMap(mapDivRef) {
  const map = ref(null)
  const marker = ref(null)

  map.value = new window.google.maps.Map(mapDivRef.value, {
    zoom:  12,
    mapTypeId: 'terrain',
    center: { lat: 25.0652969, lng: 121.6410026 },
    disableDefaultUI: false,
  });

  marker.value = new window.google.maps.Marker({
    position: { lat: 25.0652969, lng: 121.6410026 },
    map: map.value
  });
}