<template>
      <div class="order-content__wrapper">
        <div class="order-content__wrapper-select order-select">
          <div class="order-select__title">Цвет</div>
          <div class="order-select__checkboxes">
            <label class="order-select__checkboxes-item checkbox-item" v-for="(color, index) in this.$store.state.selectedCarColor" v-bind:key="index">
              <input type="radio" name="color" class="checkbox-item__hidden" v-bind:value='{ color }' v-model="selectedColor">
              <span class="checkbox-item__fake"></span>
              <span class="checkbox-item__text">{{ color }}</span>
            </label>
          </div>
          <div class="order-select__title">Дата аренды</div>
          <div class="inputs-group">
            <div class="order-select__input">
              <label class="order-select__input-label">С</label>
              <datetime type="datetime" class="order-select__input-custom" v-model="datetime1"></datetime>
            </div>
            <div class="order-select__input">
              <label class="order-select__input-label">По</label><datetime type="datetime" class="order-select__input-custom" v-model="datetime2"></datetime>
            </div>

          </div>
          <div class="order-select__title">Тариф</div>

            <div v-for="(item, index) in rate" v-bind:key="index">
              <label class="checkbox-item">
                <input type="radio" name="tarif" class="checkbox-item__hidden" v-bind:value='{ rateName: item.rateName, ratePrice: item.ratePrice, rateUnit: item.rateUnit }' v-model="rateItem">
                <span class="checkbox-item__fake"></span>
                <span class="checkbox-item__text">{{ item.rateName }}, {{ item.ratePrice }} ₽/ {{ item.rateUnit }} </span>
              </label>
            </div>


          <div class="order-select__title">Доп услуги</div>
          <label class="checkbox-item" @click="checked1Value()">
            <input type="checkbox" id="service1" name="service1" class="checkbox-item__hidden" v-model="checked1">
            <span class="checkbox-item__fake"></span>
            <span class="checkbox-item__text">Полный бак, 500р</span>
          </label>
          <label class="checkbox-item" @click="checked2Value()">
            <input type="checkbox" id="service2" name="service2" class="checkbox-item__hidden" v-model="checked2">
            <span class="checkbox-item__fake"></span>
            <span class="checkbox-item__text">Детское кресло, 200р</span>
          </label>
          <label class="checkbox-item" @click="checked3Value()">
            <input type="checkbox" id="service3" name="service3" class="checkbox-item__hidden" v-model="checked3">
            <span class="checkbox-item__fake"></span>
            <span class="checkbox-item__text">Правый руль, 1600р</span>
          </label>
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
              <div class="select-result-item__value">
                <span>{{ this.$store.state.selectedCitySave }}</span>
                <span>{{ this.$store.state.selectedPointSave }}</span>
              </div>
            </div>
            <div class="select-result__data-item select-result-item">
              <div class="select-result-item__note">
                Модель
              </div>
              <div class="select-result-item__value">
                <span>{{ this.$store.state.selectedCarModel }}</span>
              </div>
            </div>
            <div class="select-result__data-item select-result-item">
              <div class="select-result-item__note">
                Цвет
              </div>
              <div class="select-result-item__value">
                <span>{{ selectedColor.color }}</span>
              </div>
            </div>
            <div class="select-result__data-item select-result-item">
              <div class="select-result-item__note">
                Длительность аренды
              </div>
              <div class="select-result-item__value">
                <span v-show="Time.days">{{ Time.days }}д {{ Time.hours }}ч</span>
              </div>
            </div>
            <div class="select-result__data-item select-result-item">
              <div class="select-result-item__note">
                Тариф
              </div>
              <div class="select-result-item__value">
                <span>{{ tariff() }}</span>
              </div>
            </div>
            <div class="select-result__data-item select-result-item">
              <div class="select-result-item__note">
                Полный бак
              </div>
              <div class="select-result-item__value">
                <span>{{ option1 }}</span>
              </div>
            </div>
            <div class="select-result__data-item select-result-item">
              <div class="select-result-item__note">
                Детское кресло
              </div>
              <div class="select-result-item__value">
                <span>{{ option2 }}</span>
              </div>
            </div>
            <div class="select-result__data-item select-result-item">
              <div class="select-result-item__note">
                Правый руль
              </div>
              <div class="select-result-item__value">
                <span>{{ option3 }}</span>
              </div>
            </div>
          </div>
          <div class="select-result__sum">
            <div class="select-result__sum-note">
              Цена:
            </div>
            <div class="select-result__sum-value">
              {{ Sum }} ₽
            </div>
          </div>
          <a class="default-btn select-model" v-bind:class="{ disabled: isDisabledFinallyBtn }" @click="goToSummary">Итого</a>
        </div>
      </div>

</template>

<script>

import axios from 'axios'

import { Datetime } from 'vue-datetime'

export default {
  name: "OrderStep3",
  data () {
    return {
      selectedColor: { color: 'Любой' },
      rateItem: [],
      rate: [],
      datetime1: null,
      datetime2: null,
      service1: false,
      service2: false,
      service3: false,
      service1Sum: 0,
      service2Sum: 0,
      service3Sum: 0,
      price1: null,
      price2: null,
      price3: null,
      option1: 'Нет',
      option2: 'Нет',
      option3: 'Нет',
      isTab4Disabled: false,
      checked1: false,
      checked2: false,
      checked3: false,
      isDisabledFinallyBtn: true,
      disabledItem: false,
      publicPath: process.env.BASE_URL
    }
  },
  components: {
    datetime: Datetime
  },
  created() {
    const headers = {
      "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b"
    };
    axios.get("/api/db/rate", {
      headers: headers
    }).then(response => {
      this.getRateJson = response.data
      let rateList = this.getRateJson.data;
      let length = this.getRateJson['count'];
      for (let i = 0; i < length; i++) {
        this.rate.push({ rateName: rateList[i].rateTypeId.name, ratePrice: rateList[i].price, rateUnit: rateList[i].rateTypeId.unit });
      }
      return this.rate
    } );
  },
  computed: {
    Time() {
      let firstDate
      let lastDate
      if (new Date(this.datetime1) > new Date(this.datetime2)) {
        firstDate = new Date(this.datetime2)
        lastDate = new Date(this.datetime1)
      } else {
        firstDate = new Date(this.datetime1)
        lastDate = new Date(this.datetime2)
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.$store.state.startDate = firstDate.toLocaleString()
      let difference = (lastDate - firstDate) / (1000 * 60 * 60)
      let countDays = Math.trunc(difference / 24)
      let countHours = Math.ceil(difference - countDays * 24)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.$store.state.timeRangeSave = { minutes: difference * 60, days: countDays, hours: countHours }
      return { minutes: difference * 60, days: countDays, hours: countHours }
    },
    Sum() {
      let tarifPriceCalc;
      switch (this.rateItem.rateUnit) {
        case 'сутки':
          tarifPriceCalc = Math.round(this.Time.minutes / 60 * this.rateItem.ratePrice / 24)
          break
        case '7 дней':
          tarifPriceCalc = Math.round(this.Time.minutes / (60 * 24) * this.rateItem.ratePrice / 7)
          break;
        case 'мин':
          tarifPriceCalc = Math.round(this.Time.minutes * this.rateItem.ratePrice)
          break;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.$store.state.selectedColorSave = this.selectedColor.color
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.$store.state.rateItemSave = this.rateItem
      if (tarifPriceCalc) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isDisabledFinallyBtn = false
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.$store.state.saveFinalSum = this.service1Sum + this.service2Sum + this.service3Sum + tarifPriceCalc + this.$store.state.selectedCarPrice
      return this.service1Sum + this.service2Sum + this.service3Sum + tarifPriceCalc + this.$store.state.selectedCarPrice
    }
  },
  methods: {
    tariff() {
      return this.rateItem.rateName
    },
    checked1Value() {
      let checkresult = !this.checked1
      console.log(checkresult)
      if (checkresult == true) {
        this.service1Sum = 500
        this.option1 = 'Да'
      } else {
        this.service1Sum = 0
        this.option1 = 'Нет'
      }
      this.$store.state.option1Save = this.option1
      return this.option1
    },
    checked2Value() {
      let checkresult = !this.checked2
      console.log(checkresult)
      if (checkresult == true) {
        this.service2Sum = 200
        this.option2 = 'Да'
      } else {
        this.service2Sum = 0
        this.option2 = 'Нет'
      }
      this.$store.state.option2Save = this.option2
      return this.option2
    },
    checked3Value() {
      let checkresult = !this.checked3
      console.log(checkresult)
      if (checkresult == true) {
        this.service3Sum = 1600
        this.option3 = 'Да'
      } else {
        this.service3Sum = 0
        this.option3 = 'Нет'
      }
      this.$store.state.option3Save = this.option3
      return this.option3
    },
    goToSummary() {
      this.$store.commit('switchTo4Tab')
      this.$store.state.isTab4Disabled
      this.$emit('selectFinal')
    }
  }
}
</script>

<style scoped>

</style>
