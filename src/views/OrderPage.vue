<template>

  <section class="order">
    <order-header></order-header>
    <div class="order-steps">
      <div class="content">
        <div class="row paddings">
          <ul class="order-steps__content">
            <li class="order-steps__content-item">
              <a @click.prevent="setActive('step1')" :class="{ active: isActive('step1') }" href="#step1">Местоположение</a>
            </li>
            <li class="order-steps__content-item" v-bind:class="{ disabled: this.$store.state.isTab2Disabled }">
              <a @click.prevent="setActive('step2')" :class="{ active: isActive('step2') }" href="#step2">Модель</a>
            </li>
            <li class="order-steps__content-item" v-bind:class="{ disabled: this.$store.state.isTab3Disabled }">
              <a @click.prevent="setActive('step3')" :class="{ active: isActive('step3') }" href="#step3">Дополнительно</a>
            </li>
            <li class="order-steps__content-item" v-bind:class="{ disabled: this.$store.state.isTab4Disabled }">
              <a @click.prevent="setActive('step4')" :class="{ active: isActive('step4') }" href="#step4">Итого</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
    <div class="order-content">
      <div class="content">
        <div class="row">
          <div class="tab-content py-3" id="myTabContent">
            <div class="tab-pane fade" :class="{ 'active show': isActive('step1') }" id="step1">
              <order-step1 @selectModel="openModelTab"></order-step1>
            </div>
            <div class="tab-pane fade" :class="{ 'active show': isActive('step2') }" id="step2">
              <order-step2 @selectDetails="openDetailsTab"></order-step2>
            </div>
            <div class="tab-pane fade" :class="{ 'active show': isActive('step3') }" id="step3">
              <order-step3 @selectFinal="switchToFinal"></order-step3>
            </div>
            <div class="tab-pane fade" :class="{ 'active show': isActive('step4') }" id="step4">
              <order-step4></order-step4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>
<script>


import OrderHeader from "@/components/OrderHeader";
import OrderStep1 from "@/views/OrderStep1";
import OrderStep2 from "@/views/OrderStep2";
import OrderStep3 from "@/views/OrderStep3";
import OrderStep4 from "@/views/OrderStep4";

export default {
  components: {
    OrderStep1,
    OrderStep2,
    OrderStep3,
    OrderStep4,
    OrderHeader,
  },
  data () {
    return {
      publicPath: process.env.BASE_URL,
      activeItem: 'step1'
    }
  },
  methods: {
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },
    showMenu() {
      this.showcondition = !this.showcondition;
      this.seen = !this.seen;
    },
    closeMenu() {
      this.seen = !this.seen;
    },
    openModelTab () {
      this.setActive('step2')
    },
    openDetailsTab () {
      this.setActive('step3')
    },
    switchToFinal () {
      this.setActive('step4')
    }
  }
}
</script>
