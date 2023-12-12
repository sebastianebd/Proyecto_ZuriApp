<template>
    <main>
      <router-link :to="{ name: 'crear' }" class="btn btn-primary btn-md mb-3">
        <span class="text">+ Crear Reemplazo</span>
      </router-link>
      <div class="card mt-2">
        <div class="card-body">
          <h5 class="card-title m-b-0">Reemplazos</h5>
        </div>
        <div class="table-responsive" >
          <table class="table table-bordered table-sm">
            <thead class="thead-light">
              <tr>
                <th scope="col" class="small">Rut Saliente</th>
                <th scope="col" class="small">Nombre Saliente</th>
                <th scope="col" class="small">Apellido Saliente</th>
                <th scope="col" class="small">Rut Entrante</th>
                <th scope="col" class="small">Nombre Entrante</th>
                <th scope="col" class="small">Apellido Entrante</th>
                <th scope="col" class="small">Tipo de Turno</th>
                <th scope="col" class="small">Fecha Inicio</th>
                <th scope="col" class="small">Fecha Termino</th>
                <th scope="col" class="small">Servicio</th>
            </tr>
            </thead>
            <tbody class="customtable">
              <tr v-for="(reemplazo, index) in user" :key="index">
                <td class="small bg-warning">{{ reemplazo.rut_saliente }}</td>
                <td class="small bg-warning">{{ reemplazo.nombre_saliente }}</td>
                <td class="small bg-warning">{{ reemplazo.apellido_saliente }}</td>
                <td class="small bg-success">{{ reemplazo.rut_entrante }}</td>
                <td class="small bg-success">{{ reemplazo.nombre_entrante }}</td>
                <td class="small bg-success">{{ reemplazo.apellido_entrante }}</td>
                <td class="small">{{ reemplazo.tipo_turno }}</td>
                <td class="small">{{ formatearFecha(reemplazo.fecha_inicio) }}</td>
                <td class="small">{{ formatearFecha(reemplazo.fecha_termino) }}</td>
                <td class="small">{{ reemplazo.servicio }}</td>
                <td>
                  <button @click="eliminar(index)" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
                <td>
                  <button @click="mostrarModal(index)" class="btn btn-warning btn-sm">Modificar</button>
                </td>
              </tr>
            </tbody>           
          </table>    
        </div>       
      </div>

      <div class="modal" :class="{ 'show': modalVisible }" id="modificarModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-md" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modificar Registro</h5>
        <button type="button" class="close" @click="cerrarModal" aria-label="Close">
          <span aria-hidden="true" class="h1">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-6">
            <!-- Columna izquierda con 5 campos -->
            <div class="mb-3">
              <label for="rutSaliente" class="form-label form-label-sm">Rut Saliente</label>
              <input type="text" id="rutSaliente" v-model="registroActual.rut_saliente" class="form-control form-control-sm">
            </div>
            <div class="mb-3">
                <label for="nombreSaliente" class="form-label form-label-sm">Nombre Saliente</label>
                <input type="text" id="nombreSaliente" v-model="registroActual.nombre_saliente" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label for="nombreSaliente" class="form-label form-label-sm">Apellido Saliente</label>
                <input type="text" v-model="registroActual.apellido_saliente" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label for="nombreSaliente" class="form-label form-label-sm">Rut Entrate</label>
                <input type="text" v-model="registroActual.rut_entrante" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label for="nombreSaliente" class="form-label form-label-sm">Nombre Entrante</label>
                <input type="text" v-model="registroActual.nombre_entrante" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label for="nombreSaliente" class="form-label form-label-sm">Apellido Entrante</label>
                <input type="text" v-model="registroActual.apellido_entrante" class="form-control form-control-sm">
              </div>
          </div>
          <div class="col-md-6">
            <!-- Columna derecha con 5 campos -->
            <div class="mb-3">
              <label for="tipoTurno" class="form-label form-label-sm">Tipo Turno</label>
              <select v-model="registroActual.tipo_turno" class="form-control form-control-sm">
                <option v-for="turno in listaDeTurnos" :key="turno" :value="turno">{{ turno }}</option>
              </select>
            </div>
            <div class="mb-3">
                <label for="nombreSaliente" class="form-label form-label-sm">Fecha Inicio</label>
                <input type="date" v-model="registroActual.fecha_inicio" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label for="nombreSaliente" class="form-label form-label-sm">Fecha Termino</label>
                <input type="date" v-model="registroActual.fecha_termino" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label for="nombreSaliente" class="form-label form-label-sm">Servicio</label>
                <select v-model="registroActual.servicio" class="form-control form-control-sm">
                  <option v-for="servicio in listaDeServicios" :key="servicio" :value="servicio">{{ servicio }}</option>
                </select>
              </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
        <button type="button" class="btn btn-primary" @click="guardarCambios">Guardar</button>
      </div>
    </div>
  </div>
</div>
    </main>
  </template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const user = ref<any[]>([]); 
const listaDeTurnos = ref<string[]>([]);
const listaDeServicios = ref<string[]>([]);

onMounted(async () => {
  const opciones = await authStore.mostrarOpciones();
    user.value = await authStore.mostrarReemplazos();

    listaDeTurnos.value = opciones.tiposTurno
    listaDeServicios.value = opciones.servicios
});

const eliminar = async (index: number) => {
  await authStore.eliminarReemplazo(user.value[index]._id); 
  user.value.splice(index, 1);
};

const modalVisible = ref(false); 
const registroActual = ref<any>({}); 

const formatearFecha = (fecha: string) => {
  return new Date(fecha).toISOString().split('T')[0].split('-').reverse().join('-');
};

const mostrarModal = (index: number) => {
  modalVisible.value = true;
  const { fecha_inicio, fecha_termino, ...resto } = user.value[index];
  registroActual.value = {...resto,
    fecha_inicio: fecha_inicio.slice(0, 10),
    fecha_termino: fecha_termino.slice(0, 10),
  };
};

const cerrarModal = () => {
  modalVisible.value = false;
  registroActual.value = {};
};

const guardarCambios = async () => {
  await authStore.actualizarReemplazo(registroActual.value._id, registroActual.value);
  cerrarModal();
  user.value = await authStore.mostrarReemplazos();
};
</script>

<style>
.modal {
  display: none; 
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  overflow: hidden;
  outline: 0;
}
.modal.show {
  display: block;
}
</style>


