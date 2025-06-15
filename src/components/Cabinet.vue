<template>
   <div class="cabinet__header">
      <router-link to="/dashboard" class="btn">Найти парковку</router-link>
   </div>
   <div class="cabinet">

      <div class="cabinet__content">
         <div class="left">
            <div class="ava">
               <img style="border-radius: 8px;" src="/public/ava.jpg" alt="">
            </div>
         </div>
         <div class="right">
            <div class="phone">
               <span style="font-size: 14px; font-weight: 400;">Номер телефона</span>
               <span style="font-size: 16px; font-weight: 600;">+7 123 456 78 90</span>
            </div>
            <div class="email">
               <span style="font-size: 14px; font-weight: 400;">Email</span>
               <span style="font-size: 16px; font-weight: 600;">qwe0rty@mail.ru</span>
            </div>
            <div class="fio">
               <span style="font-size: 14px; font-weight: 400;">ФИО</span>
               <span style="font-size: 16px; font-weight: 600;">Иванов Иванов</span>
            </div>
         </div>

      </div>
      <div class="btns">
         <!-- <router-link to="/dashboard/edit-profile" class="btn">Редактировать</router-link> -->
         <button class="btn">Выйти из аккаунта</button>
      </div>
   </div>
   <div class="park__history">
      <h2 class="park__history-title">История парковок</h2>
      <div class="park__item" v-for="i of 2">
         <div class="col">
            <div class="park__item-date">14.05</div>
            <div class="park__item-time">60 минут</div>
            <div class="park__item-shedule">11:32</div>
         </div>
         <div class="col">
            <div class="park__item-address">Ул. Советская</div>
            <div class="park__item-price">200 <span>/час</span></div>
         </div>
      </div>
   </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.cabinet__header {
   text-align: center;
   margin: 48px 0;
}

.cabinet {
   border: 1px solid transparent;
   border-image: linear-gradient(to right, #1C1C1E, #FFFFFF, #1C1C1E);
   border-image-slice: 1;
}

.cabinet__content {
   padding: 24px 0;
   display: flex;
   column-gap: 27px;

}

.left {
   width: 40%;
}

.right {
   display: flex;
   flex-direction: column;

   color: #fff;
}

.phone,
.email,
.fio {
   display: flex;
   flex-direction: column;
   row-gap: 13px;
   margin-bottom: 16px;
}

.btns {
   display: flex;
   flex-direction: column;
   row-gap: 16px;
   margin: 20px;
}

.btn {
   background-color: #0B03FD;
   padding: 8px 110px;
   border-radius: 64px;
   color: #fff;
   font-size: 16px;
}

.park__history {
   margin-top: 24px;
}

.park__history-title {
   font-weight: 600;
   font-size: 16px;
   color: #fff;
   margin-bottom: 16px;

}

.park__item {
   display: flex;
   justify-content: space-between;
   margin-bottom: 15px;
   padding-bottom: 10px;

   color: #fff;
   font-size: 14px;
   font-weight: 600;
   border-bottom: 1px solid #c6c6c672;
}

.col {
   display: flex;
   flex-direction: column;
   row-gap: 14px;
}

.park__item-price {
   font-size: 20px;
   font-weight: 700;

   span {
      color: #6E7FA1;
      font-size: 12px;
   }
}
</style>