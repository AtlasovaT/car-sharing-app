<template>
          <div class="order-content__wrapper">
            <div class="order-content__wrapper-select order-select">
              <div class="order-select__checkboxes">
                <label class="order-select__checkboxes-item checkbox-item">
                  <input type="radio" name="model" class="checkbox-item__hidden" v-bind:value="'Все модели'" v-model="selectedCategory" checked>
                  <span class="checkbox-item__fake"></span>
                  <span class="checkbox-item__text">Все модели</span>
                </label>
                <label class="order-select__checkboxes-item checkbox-item">
                  <input type="radio" name="model" class="checkbox-item__hidden" v-bind:value="'Эконом'" v-model="selectedCategory">
                  <span class="checkbox-item__fake"></span>
                  <span class="checkbox-item__text">Эконом</span>
                </label>
                <label class="order-select__checkboxes-item checkbox-item">
                  <input type="radio" name="model" class="checkbox-item__hidden" v-bind:value="'Премиум'" v-model="selectedCategory">
                  <span class="checkbox-item__fake"></span>
                  <span class="checkbox-item__text">Премиум</span>
                </label>
              </div>
              <div class="order-select__list">
                <label class="order-select__list-item card-item"  v-for="(item, index) in filerCars" v-bind:key="index" @click="selectCard">
                  <input type="radio" class="card-item__hidden" name="car" v-bind:value="{ name: item.name, priceFrom: item.priceFrom, priceTo: item.priceTo, colors: item.colors, img: item.img }" v-model="selectCar">
                  <div class="card-item__content">
                    <div class="card-item__content-name">
                      {{ item.name }}
                    </div>
                    <div class="card-item__content-range">
                      {{ item.priceFrom }} - {{ item.priceTo }} ₽
                    </div>
                    <div class="card-item__content-image">
                      <img :src=item.img alt="car">
                    </div>
                  </div>
                </label>

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
                    <span>{{ selectCarName().name }}</span>
                  </div>
                </div>
              </div>
              <div class="select-result__sum">
                <div class="select-result__sum-note">
                  Цена:
                </div>
                <div class="select-result__sum-value">
                  от {{ selectCarName().priceFrom }} до {{ selectCarName().priceTo }} ₽
                </div>
              </div>
              <a class="default-btn select-model" v-bind:class="{ disabled: isDisabledMoreBtn }" @click="moreDetails">Дополнительно</a>
            </div>
          </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "OrderStep2",
  data () {
    return {
      publicPath: process.env.BASE_URL,
      getCarsJson: [],
      cars: [],
      selectedCategory: 'Все модели',
      selectCar: {},
      isDisabledMoreBtn: true,
      isTab3Disabled: false,
      selectedVariant: null
      }
  },
  // watch: {
  //  n (val) {
  //    console.log(val)
  //  }
  // },
  computed: {
    filerCars() {
      let renderCars
      if (this.selectedCategory !== 'Все модели') {
        renderCars = this.cars.filter(category => category.category == this.selectedCategory);
      } else {
        renderCars = this.cars
      }
      return renderCars
    }
  },
  created() {
    const headers = {
      "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b"
    };
    axios.get("/api/db/car", {
      headers: headers
    }).then(response => {
      this.getCarsJson = response.data
      let carslist = this.getCarsJson.data;
      let length = this.getCarsJson['count'];
      for (let i = 0; i < length; i++) {
        this.cars.push({name: carslist[i].name, priceFrom: carslist[i]['priceMin'], priceTo: carslist[i]['priceMax'], img: carslist[i]['thumbnail'].path, category: carslist[i]['categoryId'].name, colors: carslist[i]['colors'] });
      }
      return this.cars
    } );
  },
  components: {

  },
  methods: {
    selectCarName() {
      this.$store.state.selectedCarColor = this.selectCar.colors
      this.$store.state.selectedCarModel = this.selectCar.name
      this.$store.state.selectedCarPrice = this.selectCar.priceFrom
      this.$store.state.selectedCarPicture = this.selectCar.img
      // console.log(this.selectCar.priceFrom)
      return this.selectCar
    },
    selectCard() {
      this.isDisabledMoreBtn = false
    },
    moreDetails() {
      this.$store.commit('switchTo3Tab')
      this.$store.state.isTab3Disabled
      this.$emit('selectDetails')
    }
  }
}
</script>

<style scoped>

</style>
