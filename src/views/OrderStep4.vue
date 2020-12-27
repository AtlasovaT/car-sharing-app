<template>
  <div>
    <div class="matte-overlay" v-show="visible">
      <div class="order-confirm-popup">
        <div class="order-confirm-popup__title">
          Подтвердить заказ
        </div>
        <div class="order-confirm-popup__group">
          <router-link class="order-confirm-popup__group-btn confirm-btn default-btn" to="/final">Подтвердить</router-link>
          <a class="order-confirm-popup__group-btn back-btn default-btn" @click="hideConfirm">Вернуться</a>
        </div>
      </div>
    </div>
    <div class="order-content__wrapper">
      <div class="order-content__wrapper-select order-select">
        <div class="order-select__result">
          <div class="order-select__result-content order-result-content">
            <div class="order-result-content__name">
              {{ this.$store.state.selectedCarModel }}
            </div>
            <div class="order-result-content__number">
              K 761 HA 73
            </div>
            <div class="order-result-content__characteristic">
              <b>Топливо</b> 100%
            </div>
            <div class="order-result-content__date">
              <b>Доступна с</b> {{ this.$store.state.startDate }}
            </div>
          </div>
          <div class="order-select__result-picture">
            <img :src="this.$store.state.selectedCarPicture" alt="selected car">
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
              <span>{{ this.$store.state.selectedColorSave }}</span>
            </div>
          </div>
          <div class="select-result__data-item select-result-item">
            <div class="select-result-item__note">
              Длительность аренды
            </div>
            <div class="select-result-item__value">
              <span>{{ this.$store.state.timeRangeSave.days }}д {{ this.$store.state.timeRangeSave.hours }}ч</span>
            </div>
          </div>
          <div class="select-result__data-item select-result-item">
            <div class="select-result-item__note">
              Тариф
            </div>
            <div class="select-result-item__value">
              <span>{{ this.$store.state.rateItemSave.rateName }}</span>
            </div>
          </div>
          <div class="select-result__data-item select-result-item">
            <div class="select-result-item__note">
              Полный бак
            </div>
            <div class="select-result-item__value">
              <span>{{ this.$store.state.option1Save }}</span>
            </div>
          </div>
          <div class="select-result__data-item select-result-item">
            <div class="select-result-item__note">
              Детское кресло
            </div>
            <div class="select-result-item__value">
              <span>{{ this.$store.state.option2Save }}</span>
            </div>
          </div>
          <div class="select-result__data-item select-result-item">
            <div class="select-result-item__note">
              Правый руль
            </div>
            <div class="select-result-item__value">
              <span>{{ this.$store.state.option3Save }}</span>
            </div>
          </div>
        </div>
        <div class="select-result__sum">
          <div class="select-result__sum-note">
            Цена:
          </div>
          <div class="select-result__sum-value">
            {{ this.$store.state.saveFinalSum }} ₽
          </div>
        </div>
        <a class="default-btn select-model" @click="showConfirm">Заказать</a>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  data () {
    return {
      visible: false,
      publicPath: process.env.BASE_URL,
    }
  },
  methods: {
    showConfirm() {
      this.visible = !this.visible;
    },
    hideConfirm() {
      this.visible = !this.visible;
    }
  },
  components: {

  }
}
</script>

<style scoped>

</style>
