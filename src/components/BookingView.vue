<template>
   <div class="booking-view">
      <div class="booking-info">
         <div class="left">
            <h2 class="parking_name">{{ parking.name }}</h2>
            <p class="address">{{ parking.address }}</p>
            <p class="date">Время работы: 08:00 – 23:00</p>
         </div>
         <div class="right">
            <p class="price">{{ parking.price }}₽/час</p>
         </div>
      </div>

      <div class="slots-grid">
         <div v-for="slot in parkingPlaces" :key="slot.number" :class="['slot', { occupied: slot.isOccupied }]"
            @click="handleSlotClick(slot)">
            <template v-if="slot.isOccupied">
               <img v-if="slot.isUserCar" src="/public/icons/user-car.svg" alt="Машина пользователя" class="car-icon" />
               <img v-else src="/public/icons/car.svg" alt="Машина" class="car-icon" />
            </template>
            <template v-else>
               {{ slot.number < 10 ? '0' + slot.number : slot.number }} </template>
         </div>
      </div>

      <div class="info">
         <div class="distance">
            <img src="/public/icons/man.svg" alt="">
            <span style="font-size: 16px; font-weight: 500;">Через 1.2 км</span>
         </div>
         <div class="places">
            <img src="/public/icons/p.svg" alt="">
            <span style="color: #03FD5F; font-size: 16px; font-weight: 500;">17 свободных мест</span>
         </div>
      </div>

      <div class="btns">
         <!-- <button @click="$emit('close')" class="close-btn">Закрыть</button> -->
         <button @click="cancelAllUserBookings" class="cancel-btn">Отменить бронь</button>
      </div>


      <Transition name="popup-fade">
         <BookingPopup v-if="showPopup" :slotNumber="selectedSlot" @close="showPopup = false"
            @confirm="handleConfirmBooking" />
      </Transition>
   </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import BookingPopup from './BookingPopup.vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
   parking: Object
})

defineEmits(['close'])

const showPopup = ref(false)
const selectedSlot = ref(null)

// Локальное состояние парковочных мест
const parkingPlaces = ref([])

// Функция инициализации парковочных мест из props.parking
function initParkingPlaces() {
   if (!props.parking) {
      parkingPlaces.value = []
      return
   }

   const total = props.parking.places
   const occupiedSlots = props.parking.occupiedSlots || []  // массив занятых мест всеми
   const userSlots = store.getters['user/getUserSlotsForParking'](props.parking.id)

   parkingPlaces.value = []

   for (let i = 1; i <= total; i++) {
      parkingPlaces.value.push({
         number: i,
         isOccupied: occupiedSlots.includes(i) || userSlots.includes(i),
         isUserCar: userSlots.includes(i)
      })
   }
}

// Инициализируем при загрузке и при изменении parking
initParkingPlaces()
watch(() => props.parking, () => {
   initParkingPlaces()
})

// Обработчик клика по месту
function handleSlotClick(slot) {
   if (!slot.isOccupied) {
      selectedSlot.value = slot.number
      showPopup.value = true
   }
}

// После подтверждения бронирования — отмечаем место как занятое
function handleConfirmBooking(data) {
   const slot = parkingPlaces.value.find(s => s.number === selectedSlot.value)
   if (slot) {
      slot.isOccupied = true
      slot.isUserCar = true

      // Записываем в Vuex, что текущий пользователь занял это место
      store.dispatch('user/addBooking', {
         parkingId: props.parking.id, // id текущей парковки
         slotNumber: selectedSlot.value
      })
   }
   showPopup.value = false
}

// Отмена всех бронирований пользователя для текущей парковки
function cancelAllUserBookings() {
   const userSlots = store.getters['user/getUserSlotsForParking'](props.parking.id)

   // Удаляем все брони пользователя для этой парковки
   userSlots.forEach(slotNumber => {
      store.dispatch('user/removeBooking', {
         parkingId: props.parking.id,
         slotNumber
      })
   })

   // Обновляем локальный статус парковочных мест
   initParkingPlaces()
}
</script>



<style lang="scss" scoped>
.booking-view {
   background: transparent;
   padding: 20px;
   color: white;
   display: flex;
   flex-direction: column;
   gap: 16px;
}


.booking-info {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 24px;
}

.left {
   display: flex;
   flex-direction: column;
   row-gap: 10px;
}

.parking_name {
   color: #fff;
   font-weight: 700;
   font-size: 18px;
}

.address {
   color: #6E7FA1;
   font-size: 14px;
   font-weight: 400;
}

.date {
   color: #0B03FD;
   font-size: 14px;
   font-weight: 400;
}

.right {
   align-self: flex-start;
}

.price {
   font-weight: 700;
   font-size: 20px;
   color: #fff;
}

.slot-title {
   margin-top: 16px;
   font-size: 18px;
   font-weight: 600;
}

.slots-grid {
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   /* Было: 4 столбца, стало: 2 */
   gap: 12px;
}

// .slot {
//    background: #2e2e3e;
//    padding: 10px;
//    border-radius: 6px;
//    text-align: center;
//    font-weight: bold;
//    font-size: 16px;
//    border: 2px solid #3e3e5e;
//    transition: background 0.2s;
//    cursor: pointer;
// }

.slot:hover {
   background: #3a3a50;
}

.slot {
   // background: #2e2e3e;
   padding: 20px;
   border-radius: 6px;
   text-align: center;
   font-weight: bold;
   font-size: 16px;
   cursor: pointer;
   border-bottom: 1px solid #101010;
   border-right: 1px solid #101010;
   transition: background 0.2s;
}

/* Убрать левую границу у первого в строке (1, 4, 7...) */
.slot:nth-child(1n + 1) {
   border-left: none;
}

.slot:hover {
   background: #3a3a50;
}

.slot.occupied {
   background: #555555;
   cursor: not-allowed;
   color: #aaa;
   border-color: #444444;
}

.slot.occupied:hover {
   background: #555555;
}

.car-icon {
   width: 90px;
   height: 40px;
   object-fit: cover;
   display: block;
   margin: 0 auto;
}

.close-btn {
   background: #ff4444;
   color: white;
   padding: 10px 130px;
   border: none;
   border-radius: 64px;
   margin-top: auto;
   font-size: 16px;
   font-weight: 700;
}



.popup-fade-enter-active,
.popup-fade-leave-active {
   transition: all 0.3s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
   opacity: 0;
   transform: scale(0.95);
}

.cancel-btn {
   background: #4444ff;
   color: white;
   padding: 10px 100px;
   border: none;
   font-size: 16px;
   font-weight: 700;
   border-radius: 64px;
   margin-top: 10px;
   cursor: pointer;
   transition: background 0.2s ease;
}

.cancel-btn:hover {
   background: #2222cc;
}

.btns {
   display: flex;
   flex-direction: column;
}

.info {
   display: flex;
   justify-content: space-between;
}
.distance, .places {
   display: flex;
   align-items: center;
   column-gap: 16px;
}

</style>