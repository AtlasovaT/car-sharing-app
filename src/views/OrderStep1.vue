<template>

    <div class="order-content__wrapper">
            <div class="order-content__wrapper-select order-select">
              <div class="inputs-group">
                <div class="order-select__input">
                  <label class="order-select__input-label">Город</label>
                  <div data-app>
                    <v-autocomplete
                        v-model="select1"
                        :loading="loading"
                        :items="items"
                        :search-input.sync="search1"
                        cache-items
                        class="mx-4 order-select__input-custom"
                        flat
                        hide-no-data
                        hide-details
                        label=""
                        solo-inverted
                    ></v-autocomplete>
                  </div>
                </div>
                <div class="order-select__input">
                  <label class="order-select__input-label">Пункт выдачи</label>
                  <div data-app>
                    <v-autocomplete
                        v-model="select2"
                        :loading="loading"
                        :items="points"
                        :search-input.sync="search2"
                        cache-items
                        class="mx-4 order-select__input-custom"
                        flat
                        hide-no-data
                        hide-details
                        label="Начните вводить пункт ..."
                        solo-inverted
                    ></v-autocomplete>
                  </div>
                </div>
              </div>
              <div class="order-select__map">
                <div class="order-select__map-title">
                  Выбрать на карте:
                </div>
                <div class="order-select__map-wrapper map-element">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d298158.34010772913!2d48.10513579429616!3d54.279862707450924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x415d365f8f42b3f5%3A0x2152ff0847091be4!2z0KPQu9GM0Y_QvdC-0LLRgdC6LCDQo9C70YzRj9C90L7QstGB0LrQsNGPINC-0LHQuy4!5e0!3m2!1sru!2sru!4v1606246910331!5m2!1sru!2sru" width="736" height="352" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
              </div>
            </div>
            <div class="order-content__wrapper-column select-result">
              <div class="select-result__title">
                Ваш заказ:
              </div>
              <div class="select-result__data">
                <div class="select-result__data-item select-result-item">
                  <div class="select-result-item__note">
                    Пункт выдачи
                  </div>
                  <div class="select-result-item__value" v-show="hasAddress">
                    <span>{{ selectedCity }}</span>
                    <span>{{ selectedPoint }}</span>
                  </div>
                </div>
              </div>
<!--              <div class="select-result__sum">-->
<!--                <div class="select-result__sum-note">-->
<!--                  Цена:-->
<!--                </div>-->
<!--                <div class="select-result__sum-value">-->
<!--                  от 8 000 до 12 000 ₽-->
<!--                </div>-->
<!--              </div>-->
              <a class="default-btn select-model" v-bind:class="{ disabled: isDisabled }" @click="sendAddress">Выбрать модель</a>
            </div>
          </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      publicPath: process.env.BASE_URL,
      getCitiesJson: [],
      getPointsJson: [],
      cities: [],
      points: [],
      loading: false,
      items: [],
      getPoints: [],
      search1: null,
      search2: null,
      select1: null,
      select2: null,
      selectedCity: null,
      selectedPoint: null,
      isDisabled: true,
      hasAddress: false,
      isTab2Disabled: false
    }
  },
  components: {
    // Autocomplete
  },
  created() {
    const headers = {
      "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b"
    };
    axios.get("/api/db/city", {
      headers: headers
    }).then(response => {
      this.getCitiesJson = response.data
    } );
    axios.get("/api/db/point", {
      headers: headers
    }).then(response => {
      this.getPointsJson = response.data
    } );
  },
  computed: {

  },
  watch: {
    search1 (val) {
      val && val !== this.select1 && this.querySelectionsCity(val)
      this.selectedCity = val
      this.$store.state.selectedCitySave = this.selectedCity
    },
    search2 (val) {
      val && val !== this.select2 && this.querySelectionsPoints(val)
      this.selectedPoint = val
      this.$store.state.selectedPointSave = this.selectedPoint
      if ((this.select1 !== null) && (this.select2 !== null)) {
        this.hasAddress = !this.hasAddress
        this.isDisabled = !this.isDisabled
      }
    },
  },
  methods: {
    getCitiesArray () {
      let citylist = this.getCitiesJson['data'];
      let length = this.getCitiesJson['count']
      // let getCities = []
      for (let i = 0; i < length; i++) {
        this.cities.push(citylist[i].name);
      }
      return this.cities
    },
    getPointsArray () {
      let pointsList = this.getPointsJson['data'];
      let length = this.getPointsJson['count']
      for (let i = 0; i < length; i++) {
        if (pointsList[i].cityId.name == this.selectedCity) {
          this.getPoints.push(pointsList[i].address);
        }
      }
      return this.getPoints
    },
    querySelectionsCity (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.getCitiesArray().filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)

    },
    querySelectionsPoints (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.points = this.getPointsArray().filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)

    },
    sendAddress() {
      this.$store.commit('switchTo2Tab')
      this.$store.state.isTab2Disabled
      this.$emit('selectModel')
    }
  },
}
</script>

