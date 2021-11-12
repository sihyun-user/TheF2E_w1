<template>
  <section class="explore">
    <div class="explore__content">
      <div class="info">
        <div class="info__text">
          <div class="info__text--wrap">
            <h1>北部地區</h1>
            <p>「北部地區」包括臺北市、新北市、基隆市、宜蘭縣、桃園市、新竹縣及新竹市等7個縣市。您可以從臺灣最高樓-臺北101俯瞰臺北美景；前往故宮博物院一窺歷史典藏文物瑰寶；或走進知名老街如：九份、淡水、鶯歌、三峽等感受古街風情記憶。</p>
          </div>
          <div class="info__text--wrap">
            <button class="btn btn--north">深入探索</button>
          </div>
        </div>

        <div class="info__cities">
          <ul>
            <li>
              <h2>台北市</h2>
              <img src="@/assets/img/city01.jpg">
            </li>
            <li>
              <h2>基隆市</h2>
              <img src="@/assets/img/city02.jpg">
            </li>
            <li>
              <h2>新竹縣</h2>
              <img src="@/assets/img/city03.jpg">
            </li>
            <li>
              <h2>新北市</h2>
              <img src="@/assets/img/city04.jpg">
            </li>
            <li>
              <h2>桃園市</h2>
              <img src="@/assets/img/city05.jpg">
            </li>
            <li>
              <h2>新竹市</h2>
              <img src="@/assets/img/city06.jpg">
            </li>
            <li>
              <h2>宜蘭市</h2>
              <img src="@/assets/img/city07.jpg">
            </li>
          </ul>
        </div>
      </div>

      <div class="map">
        <div class="map__north">
          <img src="@/assets/img/map01.png">
        </div>

        <div class="map__btns">
          <button class="map__btns--north">
            <i class="fas fa-map-marker-alt"></i>
            <span>北部地區</span>
          </button>

          <button class="map__btns--center">
            <i class="fas fa-map-marker-alt"></i>
            <span>中部地區</span>
          </button>

          <button class="map__btns--south">
            <i class="fas fa-map-marker-alt"></i>
            <span>南部地區</span>
          </button>

          <button class="map__btns--east">
            <i class="fas fa-map-marker-alt"></i>
            <span>東部地區</span>
          </button>

          <button class="map__btns--island">
            <i class="fas fa-map-marker-alt"></i>
            <span>離島地區</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  setup() {

  }
}
</script>