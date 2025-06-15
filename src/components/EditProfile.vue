<template>
   <div class="edit">
     <h2 class="edit__title">Редактировать профиль</h2>
 
     <div class="edit__form">
       <label>
         Номер телефона
         <input v-model="form.phone" type="tel" placeholder="+7 123 456 78 90" />
       </label>
 
       <label>
         Email
         <input v-model="form.email" type="email" placeholder="example@mail.ru" />
       </label>
 
       <label>
         ФИО
         <input v-model="form.name" type="text" placeholder="Иванов Иван Иванович" />
       </label>
 
       <div class="edit__buttons">
         <button class="btn" @click="saveProfile">Сохранить</button>
         <router-link to="/cabinet" class="btn btn--secondary">Отмена</router-link>
       </div>
     </div>
   </div>
 </template>
 
 <script>
 export default {
   data() {
     return {
       form: {
         phone: '+7 123 456 78 90',
         email: 'qwe0rty@mail.ru',
         name: 'Иванов Иванов'
       }
     }
   },
   methods: {
     saveProfile() {
       // Здесь должен быть вызов API или сохранение в store
       console.log('Профиль сохранён:', this.form)
 
       // Возврат назад
       this.$router.push('/cabinet')
     }
   }
 }
 </script>
 
 <style scoped lang="scss">
 .edit {
   padding: 24px;
   max-width: 500px;
   margin: 0 auto;
   color: #fff;
 }
 
 .edit__title {
   font-size: 24px;
   font-weight: 700;
   margin-bottom: 24px;
   text-align: center;
 }
 
 .edit__form {
   display: flex;
   flex-direction: column;
   gap: 16px;
 
   label {
     display: flex;
     flex-direction: column;
     font-size: 14px;
     font-weight: 500;
 
     input {
       margin-top: 6px;
       padding: 10px 12px;
       border-radius: 8px;
       border: none;
       font-size: 16px;
     }
   }
 }
 
 .edit__buttons {
   display: flex;
   gap: 12px;
   margin-top: 20px;
   justify-content: space-between;
 }
 
 .btn {
   background-color: #0B03FD;
   padding: 10px 24px;
   border-radius: 64px;
   color: #fff;
   font-size: 16px;
   cursor: pointer;
   text-align: center;
   text-decoration: none;
 }
 
 .btn--secondary {
   background-color: #444;
 }
 </style>
 