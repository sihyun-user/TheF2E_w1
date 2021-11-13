<template>
  <section class="explore">
    <div class="explore__content">
      <div class="info info__north" v-show="selectedmap == 'north'">
        <div class="info__text info__text--north">
          <div class="info__text--wrap">
            <h1>北部地區</h1>
            <p>「北部地區」包括臺北市、新北市、基隆市、宜蘭縣、桃園市、新竹縣及新竹市等7個縣市。您可以從臺灣最高樓-臺北101俯瞰臺北美景；前往故宮博物院一窺歷史典藏文物瑰寶；或走進知名老街如：九份、淡水、鶯歌、三峽等感受古街風情記憶。</p>
          </div>
        </div>

        <button class="btn btn--north">
          <router-link to="/storymap">深入探索</router-link>
        </button>

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

      <div class="info info__center" v-show="selectedmap == 'center'">
        <div class="info__text info__text--center">
          <div class="info__text--wrap">
            <h1>中部地區</h1>
            <p>「中部地區」包括苗栗縣、臺中市、彰化縣、南投縣及雲林縣等5個縣市，位於臺灣心臟地帶，常年氣候舒適，尤其是臺中市，四季氣溫宜人，非常適合旅行。中部地區擁有多處老少皆宜的渡假村及遊樂中心，包含苗栗西湖渡假村、臺中麗寶樂園、南投泰雅渡假村、九族文化村及雲林劍湖山世界等。喜歡文藝的朋友們不可錯過苗栗的木雕與燒陶藝術，可自己動手DIY實作體驗一番，臺中市國立臺灣美術館與自然科學博物館推薦遊客進入細細參觀，雲林縣是揚名世界的布袋戲演藝文化發源地，值得深入欣賞。</p>
          </div>
        </div>

        <button class="btn btn--center">
          <router-link to="/storymap">深入探索</router-link>
        </button>

        <div class="info__cities">
          <ul>
            <li>
              <h2>苗栗縣</h2>
              <img src="@/assets/img/city08.jpg">
            </li>
            <li>
              <h2>台中市</h2>
              <img src="@/assets/img/city09.jpg">
            </li>
            <li>
              <h2>彰化縣</h2>
              <img src="@/assets/img/city10.jpg">
            </li>
            <li>
              <h2>南投市</h2>
              <img src="@/assets/img/city11.jpg">
            </li>
            <li>
              <h2>雲林縣</h2>
              <img src="@/assets/img/city12.jpg">
            </li>
          </ul>
        </div>
      </div>

      <div class="info info__south" v-show="selectedmap == 'south'">
        <div class="info__text info__text--south">
          <div class="info__text--wrap">
            <h1>南部地區</h1>
            <p>
              臺灣南部地區散發著濃厚的歷史文化，臺南市是全台歷史最悠久的文化古都，十九世紀末期前，臺南一直是臺灣政治經濟文化重心，古蹟名勝特別多。嘉義縣因北迴歸線通過而建造的「北迴歸線天文廣場」，呈現北迴歸線的地理象徵。阿里山森林遊樂區舉世聞名，高山森林鐵路及深藏不露的林間古道，吸引大批國內外遊客造訪，而阿里山雲海、日出、晚霞等自然美景，遠近馳名，是旅遊臺灣必遊的重點景點之一。
              臺灣南部氣候四季如夏，位於屏東有「臺灣南洋」之稱的墾丁公園，得天獨厚，浮潛融入海中美景、暢玩水上新潮活動，再前往臺灣最南端的「鵝鑾鼻」，左看太平洋右覽臺灣海峽的壯碩景觀。
            </p>
          </div>
        </div>

        <button class="btn btn--south">
          <router-link to="/storymap">深入探索</router-link>
        </button>

        <div class="info__cities">
          <ul>
            <li>
              <h2>嘉義縣</h2>
              <img src="@/assets/img/city13.jpg">
            </li>
            <li>
              <h2>嘉義市</h2>
              <img src="@/assets/img/city14.jpg">
            </li>
            <li>
              <h2>台南市</h2>
              <img src="@/assets/img/city15.jpg">
            </li>
            <li>
              <h2>高雄市</h2>
              <img src="@/assets/img/city16.jpg">
            </li>
            <li>
              <h2>屏東縣</h2>
              <img src="@/assets/img/city17.jpg">
            </li>
          </ul>
        </div>
      </div>

      <div class="info info__east" v-show="selectedmap == 'east'">
        <div class="info__text info__text--east">
          <div class="info__text--wrap">
            <h1>東部地區</h1>
            <p>
              臺灣東部地區包含花蓮縣及臺東縣2個縣市，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置，最初葡萄牙人航行經過臺灣東部海岸時，看見壯麗的山川美景呈現於眼前，驚呼「FORMOSA」（美極了），臺灣「福爾摩沙」的稱號由此而來，東部極致的天然美景也由此可見。東部地區擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅，行走在這塊淨土上，放慢你的呼吸頻率，大口吸入甜甜的空氣香，long stay是最好的行程安排。
              太魯閣公園是臺灣必遊景點，以峽谷景觀聞名，雄偉壯麗的山川景色，多處景點展現出原始的險峻地形與奧妙的地質面貌。東部的秀姑巒溪，河道迂回，切穿海岸山脈，形成峽谷與曲流，刺激又有挑戰的泛舟活動吸引無數年輕人留下最英雄的回憶。
            </p>
          </div>
        </div>

        <button class="btn btn--east">
          <router-link to="/storymap">深入探索</router-link>
        </button>

        <div class="info__cities">
          <ul>
            <li>
              <h2>花蓮縣</h2>
              <img src="@/assets/img/city18.jpg">
            </li>
            <li>
              <h2>台東縣</h2>
              <img src="@/assets/img/city19.jpg">
            </li>
          </ul>
        </div>
      </div>

      <div class="info info__island" v-show="selectedmap == 'island'">
        <div class="info__text info__text--island">
          <div class="info__text--wrap">
            <h1>離島地區</h1>
            <p>
              臺灣主要島嶼之外，周邊的小島也為數可觀，澎湖、金門與連江三個縣市位於離島地區，原本曾神秘的軍事管制禁區─金門，開放觀光後成為熱絡的旅遊地區，具鄉土風味的金門特產三寶，鋼刀、貢糖、高粱酒，總讓人滿載而歸，而馬祖的老酒、八八坑道高粱、大麯酒，更令人齒頰留香。既是外島，各樣生鮮美饌種類繁多，讓遊客得以飽嘗頂級海鮮美味。澎湖，春夏花火節火樹銀花綻放熱情和浪漫，碧海藍天與柔白細緻沙灘的雙重享
            </p>
          </div>
        </div>

        <button class="btn btn--island">
          <router-link to="/storymap">深入探索</router-link>
        </button>

        <div class="info__cities">
          <ul>
            <li>
              <h2>澎湖縣</h2>
              <img src="@/assets/img/city20.jpg">
            </li>
            <li>
              <h2>金門縣</h2>
              <img src="@/assets/img/city21.jpg">
            </li>
            <li>
              <h2>連江縣</h2>
              <img src="@/assets/img/city22.jpg">
            </li>
          </ul>
        </div>
      </div>

      <div class="map">
        <img src="@/assets/img/map01.png" v-show="selectedmap == 'north'">
        <img src="@/assets/img/map02.png" v-show="selectedmap == 'center'">
        <img src="@/assets/img/map03.png" v-show="selectedmap == 'south'">
        <img src="@/assets/img/map04.png" v-show="selectedmap == 'east'">
        <img src="@/assets/img/map05.png" v-show="selectedmap == 'island'">

        <div class="map__btns">
          <div class="map__btns--north">
            <input type="radio" name="map" id="north" value="north" v-model="selectedmap">
            <label for="north">
              <i class="fas fa-map-marker-alt"></i>
              <span>北部地區</span>
            </label>
          </div>

          <div class="map__btns--center">
            <input type="radio" name="map" id="center" value="center" v-model="selectedmap">
            <label for="center">
              <i class="fas fa-map-marker-alt"></i>
              <span>中部地區</span>
            </label>
          </div>

          <div class="map__btns--south">
            <input type="radio" name="map" id="south" value="south" v-model="selectedmap">
            <label for="south">
              <i class="fas fa-map-marker-alt"></i>
              <span>南部地區</span>
            </label>
          </div>

          <div class="map__btns--east">
            <input type="radio" name="map" id="east" value="east" v-model="selectedmap">
            <label for="east">
              <i class="fas fa-map-marker-alt"></i>
              <span>東部地區</span>
            </label>
          </div>

          <div class="map__btns--island">
            <input type="radio" name="map" id="island" value="island" v-model="selectedmap">
            <label for="island">
              <i class="fas fa-map-marker-alt"></i>
              <span>離島地區</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const selectedmap = ref('north')

    return {
      selectedmap
    }
  }
}
</script>