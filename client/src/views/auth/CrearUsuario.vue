<template>
  <div id="register">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Register</h5>
        <form @submit.prevent="submit">
          <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="mb-3">
            <label for="username" class="form-label">Rut</label>
            <input v-model="registerData.rut" type="text" class="form-control" id="username" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="first_name" class="form-label">Nombre</label>
            <input v-model="registerData.nombre" type="text" class="form-control" id="first_name" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Apellido</label>
            <input v-model="registerData.apellido" type="text" class="form-control" id="last_name" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Fecha Nacimiento</label>
            <input v-model="registerData.fecha_nac" type="Date" class="form-control" id="email" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Direccion</label>
            <input v-model="registerData.direccion" type="text" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">Telefono</label>
            <input v-model="registerData.telefono" type="number" class="form-control" id="password_confirm">
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Email</label>
            <input v-model="registerData.email" type="text" class="form-control" id="last_name" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Ciudad</label>
            <input v-model="registerData.ciudad" type="text" class="form-control" id="last_name" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Habilitado</label>
            <input v-model="registerData.habilitado" type="text" class="form-control" id="last_name" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Tipo Cargo</label>
            <input v-model="registerData.tipo_cargo" type="text" class="form-control" id="last_name" autocomplete="off">
          </div>
          <button type="submit" class="btn btn-success">Register</button>
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
  rut: "",
  nombre: "",
  apellido: "",
  fecha_nac: new Date(),
  direccion: "",
  telefono: 0,
  email: "",
  ciudad: "",
  habilitado:"",
  tipo_cargo: ""
})

const errorMessage = ref<string>("")

async function submit(){
  await authStore.register(registerData)
    .then(res => {
      router.replace({name: "home"})
    })
    .catch(err => {
      errorMessage.value = err.message
    })
}

</script>

<style scoped>
#register .card{
  max-width: 40vw;
  margin: auto;
}
</style>