<template>
    <div id="register">
      <div class="container">
        <div class="card card-body mt-4">
          <h5 class="card-title">Register</h5>
          <form @submit.prevent="submit">
            <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
  
            <!-- Primer paso: Datos de TENS (salida) -->
            <div v-if="currentStep === 1">
              <div class="mb-3">
                <label for="username" class="form-label">Rut</label>
                <input v-model="registerData.rut_saliente" type="text" class="form-control" id="username" autocomplete="off">
              </div>
              <div class="mb-3">
                <label for="first_name" class="form-label">Nombre</label>
                <input v-model="registerData.nombre_saliente" type="text" class="form-control" id="first_name" autocomplete="off">
              </div>
              <div class="mb-3">
                <label for="last_name" class="form-label">Apellido</label>
                <input v-model="registerData.apellido_saliente" type="text" class="form-control" id="last_name" autocomplete="off">
              </div>
              <button @click.prevent="nextStep" class="btn btn-primary">Siguiente</button>
            </div>
  
            <!-- Segundo paso: Datos de TENS (entrante) -->
            <div v-if="currentStep === 2">
              <div class="mb-3">
                <label for="username" class="form-label">Rut</label>
                <input v-model="registerData.rut_entrante" type="text" class="form-control" id="username" autocomplete="off">
              </div>
              <div class="mb-3">
                <label for="first_name" class="form-label">Nombre</label>
                <input v-model="registerData.nombre_entrante" type="text" class="form-control" id="first_name" autocomplete="off">
              </div>
              <div class="mb-3">
                <label for="last_name" class="form-label">Apellido</label>
                <input v-model="registerData.apellido_entrante" type="text" class="form-control" id="last_name" autocomplete="off">
              </div>
              <button @click.prevent="nextStep" class="btn btn-primary">Siguiente</button>
            </div>
            <div v-if="currentStep === 2">
            <button @click="prevStep" class="btn btn-secondary">Volver</button>
            </div>
  
            <!-- Tercer paso: configuración de turno -->
            <div v-if="currentStep === 3">
              <div class="mb-3">
                <label for="username" class="form-label">Tipo Turno</label>
                <input v-model="registerData.tipo_turno" type="text" class="form-control" id="username" autocomplete="off">
              </div>
              <div class="mb-3">
                <label for="first_name" class="form-label">Fecha Inicio</label>
                <input v-model="registerData.fecha_inicio" type="date" class="form-control" id="first_name" autocomplete="off">
              </div>
              <div class="mb-3">
                <label for="last_name" class="form-label">Fecha Termino</label>
                <input v-model="registerData.fecha_termino" type="date" class="form-control" id="last_name" autocomplete="off">
              </div>
              <div class="mb-3">
                <label for="last_name" class="form-label">Servicio</label>
                <input v-model="registerData.servicio" type="text" class="form-control" id="last_name" autocomplete="off">
              </div>
              <button @click.prevent="submit" class="btn btn-success">Guardar</button>
            </div>
            <div v-if="currentStep === 3">
            <button @click="prevStep" class="btn btn-secondary">Volver</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
    
    <script setup lang="ts">
    import { useAuthStore, type RegisterData } from '../../stores/auth';
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    
    const authStore = useAuthStore()
    const router = useRouter()
    
  
  
    const registerData = reactive<RegisterData>({
      rut_saliente: "",
      nombre_saliente: "",
      apellido_saliente: "",
  
      rut_entrante: "",
      nombre_entrante: "",
      apellido_entrante: "",
  
      tipo_turno:"",
      fecha_inicio: new Date(),
      fecha_termino:new Date (),
      servicio:""
  
    })
    
    const errorMessage = ref<string>("")
    
    const currentStep = ref<number>(1); // Utilizamos 'const' en lugar de 'let'
  
    async function submit() {
      if (currentStep.value === 1) {
        // Lógica para manejar el primer paso (username, nombre, apellidos)
        currentStep.value++;
      } else if (currentStep.value === 2) {
        // Lógica para manejar el segundo paso (email)
        currentStep.value++;
      } else if (currentStep.value === 3) {
        // Lógica para manejar el tercer paso (password)
        await authStore.register(registerData)
          .then(res => {
            router.replace({ name: "home" });
          })
          .catch(err => {
            errorMessage.value = err.message;
          });
      }
    }
  
    function nextStep() {
      // Función para manejar el paso siguiente
      submit(); // Llamar a submit() en este ejemplo, puedes ajustarlo según la lógica deseada
    }
    
    function prevStep() {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    }
  
    </script>
    
    <style scoped>
    #register .card{
      max-width: 40vw;
      margin: auto;
    }
    </style>
  
  <script setup lang="ts">
  
  
  </script>