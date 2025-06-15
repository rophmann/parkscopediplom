<template>
  <div class="parking-detail">
    <div class="parking-image">
      <img :src="'/public/park.jpg'" alt="Парковка" />
    </div>

    <div class="detail-info">
      <div class="info-row">
        <span class="park__name">{{ parking.name }}</span>
        <span class="park__price">
          {{ parking.price }}₽<span class="per-hour">/час</span>
        </span>
      </div>

      <div class="info-row">
        <span class="park__addr">
          <img src="/public/icons/adrdot.svg" alt="" />
          {{ parking.name }}
        </span>
        <!-- <span class="distance">{{ parking.distance }}</span> -->
      </div>

      <div class="info-row">
        <span class="open-until">Открыто до 23:00</span>
      </div>

      <div class="info-row">
        <div class="places-info">
          <div class="place-row">
            <span class="free-label">Количество свободных мест:</span>
            <span class="free-count">{{ parking.places }}</span>
          </div>
          <div class="place-row">
            <span class="occupied-label">Занятых мест:</span>
            <span class="occupied-count">
              <template v-if="isLoading">Загрузка...</template>
              <template v-else>{{ aviablePlaces.car_count }}</template>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-buttons">
      <button class="route-button" @click="$emit('build-route')">
        Проложить маршрут
      </button>
      <button class="book-button" @click="openBooking">
        Забронировать место
      </button>
    </div>

    <div class="contacts">
      <div class="contacts__title">
        <img src="/public/icons/phone.svg" alt="" />
        <span>Контакты</span>
      </div>
      <div class="contacts__content">
        <span>+79894320234</span>
      </div>
    </div>
    <div class="contacts">
      <div class="contacts__title">
        <img src="/public/icons/watch.svg" alt="" />
        <span>Время работы</span>
      </div>
      <div class="contacts__content">
        <span>8:00 - 23:00</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  parking: {
    type: Object,
    required: true,
  },
});

let aviablePlaces = ref(0);
const store = useStore();
let isLoading = ref(true);
const openBooking = () => {
  store.commit("parking/SET_BOOKING_VIEW", true);
};

onMounted(async () => {
  try {
    const res = await fetch(
      `http://26.119.66.245:3000/send_camera?id=${props.parking.id}`
    );
    aviablePlaces.value = await res.json();
  } catch (error) {
    console.error("Ошибка при загрузке данных с камеры:", error);
  } finally {
    isLoading.value = false;
  }
});

// onMounted(async () => {
//    const response = await fetch(
//       `http://26.119.66.245:3000/send_camera?id=${props.parking.id}`
//     );
// })

defineEmits(["build-route", "book-parking"]);
</script>

<style lang="scss" scoped>
.parking-detail {
  margin-top: 20px;
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
  color: white;
}

.parking-image img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-bottom: 1px solid #333;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  margin-top: 24px;
}

.park__name {
  font-size: 18px;
  color: #fff;
  font-weight: 700;
}

.park__price {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.per-hour {
  font-size: 12px;
  color: #6e7fa1;
  margin-left: 4px;
}

.park__addr {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6e7fa1;
}

.distance {
  font-size: 12px;
  color: #6e7fa1;
}

.open-until {
  font-size: 14px;
  color: #0b03fd;
}

.places-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.place-row {
  display: flex;
  justify-content: space-between;
}

.free-label,
.occupied-label {
  font-size: 18px;
  font-weight: 500;
}

.free-label {
  color: #03fd5f;
}

.free-count {
  color: #03fd5f;
}

.occupied-label {
  color: #fd0303;
}

.occupied-count {
  color: #fd0303;
}

.detail-buttons {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  font-family: "Inter Tight", sans-serif;
  margin-top: 24px;
}

.route-button,
.book-button {
  flex: 1;
  padding: 10px 12px;
  border: none;
  border-radius: 64px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-family: "Inter Tight", sans-serif;
  transition: opacity 0.1s ease-in;

  &:hover {
    opacity: 0.8;
  }
}

.route-button {
  background: #0b03fd;
}

.book-button {
  background: #2f2f31;
}

.contacts {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.contacts__title {
  display: flex;
  column-gap: 16px;
  font-size: 18px;
  font-weight: 700;
}
.contacts__content {
  font-size: 14px;
  margin-left: 40px;
}

.loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>