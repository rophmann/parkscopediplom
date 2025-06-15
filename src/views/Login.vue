<template>
   <div class="auth-container">
     <div class="auth-wrapper">
 
       <!-- Auth Form Container -->
       <div class="auth-form-container">
         <!-- Tab Switcher -->
         <div class="tab-switcher">
           <button
             @click="activeTab = 'login'"
             :class="['tab-button', { active: activeTab === 'login' }]"
           >
             Вход
           </button>
           <button
             @click="activeTab = 'register'"
             :class="['tab-button', { active: activeTab === 'register' }]"
           >
             Регистрация
           </button>
         </div>
 
         <!-- Login Form -->
         <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="auth-form">
           <div class="form-group">
             <label class="form-label">Email</label>
             <div class="input-wrapper">
               <input
                 v-model="loginForm.email"
                 type="email"
                 required
                 class="form-input"
                 placeholder="your@email.com"
               />
             </div>
           </div>
 
           <div class="form-group">
             <label class="form-label">Пароль</label>
             <div class="input-wrapper">
               <input
                 v-model="loginForm.password"
                 :type="showPassword ? 'text' : 'password'"
                 required
                 class="form-input"
                 placeholder="••••••••"
               />
               <button
                 type="button"
                 @click="showPassword = !showPassword"
                 class="password-toggle"
               >
                 {{ showPassword ? '👁️' : '👁️‍🗨️' }}
               </button>
             </div>
           </div>
 
           <div class="form-options">
             <label class="checkbox-wrapper">
               <input type="checkbox" class="checkbox" />
               <span class="checkbox-text">Запомнить меня</span>
             </label>
             <a href="#" class="forgot-password">Забыли пароль?</a>
           </div>
 
           <button
           @click="$router.push('/dashboard')"
             type="submit"
             :disabled="isLoading"
             class="submit-button"
           >
             <span v-if="!isLoading">Войти</span>
             <div v-else class="loading-spinner"></div>
           </button>
         </form>
 
         <!-- Register Form -->
         <form v-if="activeTab === 'register'" @submit.prevent="handleRegister" class="auth-form">
           <div class="form-row">
             <div class="form-group">
               <label class="form-label">Имя</label>
               <div class="input-wrapper">
                 <input
                   v-model="registerForm.firstName"
                   type="text"
                   required
                   class="form-input"
                   placeholder="Иван"
                 />
               </div>
             </div>
             <div class="form-group">
               <label class="form-label">Фамилия</label>
               <div class="input-wrapper">
                 <input
                   v-model="registerForm.lastName"
                   type="text"
                   required
                   class="form-input"
                   placeholder="Иванов"
                 />
               </div>
             </div>
           </div>
 
           <div class="form-group">
             <label class="form-label">Email</label>
             <div class="input-wrapper">
               <input
                 v-model="registerForm.email"
                 type="email"
                 required
                 class="form-input"
                 placeholder="your@email.com"
               />
             </div>
           </div>
 
           <div class="form-group">
             <label class="form-label">Телефон</label>
             <div class="input-wrapper">
               <input
                 v-model="registerForm.phone"
                 type="tel"
                 required
                 class="form-input"
                 placeholder="+7 (999) 123-45-67"
               />
             </div>
           </div>
 
           <div class="form-group">
             <label class="form-label">Пароль</label>
             <div class="input-wrapper">
               <input
                 v-model="registerForm.password"
                 :type="showPassword ? 'text' : 'password'"
                 required
                 class="form-input"
                 placeholder="••••••••"
               />
               <button
                 type="button"
                 @click="showPassword = !showPassword"
                 class="password-toggle"
               >
                 {{ showPassword ? '👁️' : '👁️‍🗨️' }}
               </button>
             </div>
           </div>
 
           <div class="form-group">
             <label class="form-label">Подтвердите пароль</label>
             <div class="input-wrapper">
               <input
                 v-model="registerForm.confirmPassword"
                 :type="showConfirmPassword ? 'text' : 'password'"
                 required
                 class="form-input"
                 placeholder="••••••••"
               />
               <button
                 type="button"
                 @click="showConfirmPassword = !showConfirmPassword"
                 class="password-toggle"
               >
                 {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
               </button>
             </div>
           </div>
 
           <div class="form-group">
             <label class="checkbox-wrapper">
               <input type="checkbox" required class="checkbox" />
               <span class="checkbox-text">
                 Я согласен с 
                 <a href="#" class="link">условиями использования</a> 
                 и 
                 <a href="#" class="link">политикой конфиденциальности</a>
               </span>
             </label>
           </div>
 
           <button
             type="submit"
             :disabled="isLoading"
             class="submit-button"
           >
             <span v-if="!isLoading">Зарегистрироваться</span>
             <div v-else class="loading-spinner"></div>
           </button>
         </form>
       </div>
 
       <!-- Success Message -->
       <div v-if="showSuccess" class="success-message">
         <span class="success-icon">✅</span>
         <span>{{ successMessage }}</span>
       </div>
     </div>
   </div>
 </template>
 
 <script setup>
 import { ref } from 'vue'
 
 const activeTab = ref('login')
 const showPassword = ref(false)
 const showConfirmPassword = ref(false)
 const isLoading = ref(false)
 const showSuccess = ref(false)
 const successMessage = ref('')
 
 const loginForm = ref({
   email: '',
   password: ''
 })
 
 const registerForm = ref({
   firstName: '',
   lastName: '',
   email: '',
   phone: '',
   password: '',
   confirmPassword: ''
 })
 
 const handleLogin = async () => {
   isLoading.value = true
   
   setTimeout(() => {
     isLoading.value = false
     showSuccess.value = true
     successMessage.value = 'Добро пожаловать в ParkSpot!'
     
     setTimeout(() => {
       showSuccess.value = false
     }, 3000)
   }, 1500)
 }
 
 const handleRegister = async () => {
   if (registerForm.value.password !== registerForm.value.confirmPassword) {
     alert('Пароли не совпадают!')
     return
   }
   
   isLoading.value = true
   
   setTimeout(() => {
     isLoading.value = false
     showSuccess.value = true
     successMessage.value = 'Регистрация успешна! Проверьте email для подтверждения.'
     
     setTimeout(() => {
       showSuccess.value = false
       activeTab.value = 'login'
     }, 3000)
   }, 2000)
 }
 </script>
 
 <style scoped>
 * {
   box-sizing: border-box;
 }
 
 .auth-container {
   font-family: "Inter Tight", sans-serif;
   min-height: 100vh;
   background: #1C1C1E;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 20px;
   position: relative;
   overflow: hidden;
 }
 
 .background-pattern {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   opacity: 0.1;
   pointer-events: none;
 }
 
 .auth-wrapper {
   width: 100%;
   max-width: 450px;
   position: relative;
   z-index: 1;
 }
 
 .auth-header {
   text-align: center;
   margin-bottom: 2rem;
   font-family: "Inter Tight", sans-serif;
 }
 

 
 .auth-form-container {
   background: #1C1C1E;
   backdrop-filter: blur(10px);
   border-radius: 20px;
   padding: 2rem;
   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
   border: 1px solid rgba(255, 255, 255, 0.2);

   font-family: "Inter Tight", sans-serif;
 }
 
 .tab-switcher {
   display: flex;
   background: #1C1C1E;
   border-radius: 12px;
   padding: 4px;
   margin-bottom: 1.5rem;
 }
 
 .tab-button {
   flex: 1;
   padding: 12px 16px;
   border: none;
   background: transparent;
   border-radius: 8px;
   font-weight: 500;
   cursor: pointer;
   transition: all 0.3s ease;
   color: #64748b;
   font-family: "Inter Tight", sans-serif;
 }
 
 .tab-button.active {
   background: rgb(55, 55, 55);
   color: #3b82f6;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
 }
 
 .tab-button:hover:not(.active) {
   color: #3b82f6;
 }
 
 .auth-form {
   display: flex;
   flex-direction: column;
   gap: 1rem;
 }
 
 .form-row {
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: 1rem;
 }
 
 .form-group {
   display: flex;
   flex-direction: column;
 }
 
 .form-label {
   font-weight: 500;
   color: #374151;
   margin-bottom: 0.5rem;
   font-size: 0.875rem;
 }
 
 .input-wrapper {
   position: relative;
   display: flex;
   align-items: center;
 }
 
 .input-icon {
   position: absolute;
   left: 12px;
   font-size: 1rem;
   z-index: 1;
 }
 
 .form-input {
   width: 100%;
   padding: 12px 12px 12px 20px;
   border: 1px solid #e5e7eb;
   border-radius: 12px;
   font-size: 1rem;
   transition: all 0.3s ease;
   background: white;
 }
 
 .form-input::placeholder {
  color: #fff;
 }

 /* .form-input:focus {
   outline: none;
   border-color: #3b82f6;
   box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
 } */
 
 .password-toggle {
   position: absolute;
   right: 12px;
   background: none;
   border: none;
   cursor: pointer;
   font-size: 1rem;
   padding: 4px;
   border-radius: 4px;
   transition: background-color 0.2s;
 }
 
 .password-toggle:hover {
   background-color: #f3f4f6;
 }
 
 .form-options {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin: 0.5rem 0;
 }
 
 .checkbox-wrapper {
   display: flex;
   align-items: center;
   cursor: pointer;
 }
 
 .checkbox {
   margin-right: 0.5rem;
   accent-color: #3b82f6;
 }
 
 .checkbox-text {
   font-size: 0.875rem;
   color: #6b7280;
 }
 
 .forgot-password, .link {
   color: #3b82f6;
   text-decoration: none;
   font-size: 0.875rem;
   font-weight: 500;
 }
 
 .forgot-password:hover, .link:hover {
   text-decoration: underline;
 }
 
 .submit-button {
   width: 100%;
   background: #0B03FD;
   color: white;
   border: none;
   padding: 14px;
   border-radius: 64px;
   font-size: 1rem;
   font-weight: 600;
   cursor: pointer;
   transition: all 0.3s ease;
   margin-top: 0.5rem;
   position: relative;
   overflow: hidden;
   font-family: "Inter Tight", sans-serif;
 }
 
 .submit-button:hover:not(:disabled) {
   background: linear-gradient(135deg, #2563eb, #1e40af);
   transform: translateY(-2px);
   box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
 }
 
 .submit-button:disabled {
   opacity: 0.7;
   cursor: not-allowed;
   transform: none;
 }
 
 .loading-spinner {
   width: 20px;
   height: 20px;
   border: 2px solid rgba(255, 255, 255, 0.3);
   border-top: 2px solid white;
   border-radius: 50%;
   animation: spin 1s linear infinite;
   margin: 0 auto;
 }
 
 @keyframes spin {
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
 }
 
 .social-login {
   margin-top: 1.5rem;
 }
 
 .divider {
   position: relative;
   text-align: center;
   margin: 1.5rem 0;
 }
 
 .divider::before {
   content: '';
   position: absolute;
   top: 50%;
   left: 0;
   right: 0;
   height: 1px;
   background: #e5e7eb;
 }
 
 .divider-text {
   background: rgba(255, 255, 255, 0.95);
   padding: 0 1rem;
   color: #6b7280;
   font-size: 0.875rem;
 }
 
 .social-buttons {
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: 0.75rem;
 }
 
 .social-button {
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 0.5rem;
   padding: 12px;
   border: 2px solid #e5e7eb;
   border-radius: 12px;
   background: white;
   cursor: pointer;
   font-weight: 500;
   transition: all 0.3s ease;
 }
 
 .social-button:hover {
   background: #f9fafb;
   border-color: #d1d5db;
   transform: translateY(-1px);
 }
 
 .social-button.google {
   color: #4285f4;
 }
 
 .social-button.facebook {
   color: #1877f2;
 }
 
 .social-icon {
   font-size: 1.2rem;
 }
 
 .success-message {
   margin-top: 1rem;
   background: linear-gradient(135deg, #10b981, #059669);
   color: white;
   padding: 1rem;
   border-radius: 12px;
   display: flex;
   align-items: center;
   gap: 0.5rem;
   animation: slideIn 0.5s ease-out;
 }
 
 @keyframes slideIn {
   from {
     opacity: 0;
     transform: translateY(20px);
   }
   to {
     opacity: 1;
     transform: translateY(0);
   }
 }
 
 .success-icon {
   font-size: 1.2rem;
 }
 
 /* Responsive Design */
 @media (max-width: 768px) {
   .auth-container {
     padding: 10px;
   }
   
   .auth-form-container {
     padding: 1.5rem;
   }
   
   .form-row {
     grid-template-columns: 1fr;
   }
   
   .app-title {
     font-size: 2rem;
   }
   
   .social-buttons {
     grid-template-columns: 1fr;
   }
 }
 
 @media (max-width: 480px) {
   .form-options {
     flex-direction: column;
     gap: 0.5rem;
     align-items: flex-start;
   }
   
   .checkbox-text {
     font-size: 0.8rem;
   }
 }
 </style>