<template>
    <main>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title m-b-0">Reemplazos</h5>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered table-sm">
            <thead class="thead-light">
              <tr>
                <th>
                </th>

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
                <td>
                  <label class="customcheckbox">
                    <input type="checkbox" class="listCheckbox" @change="toggleSeleccion(index)" />
                    <span class="checkmark"></span>
                  </label>
                </td>

                <td class="small bg-warning">{{ reemplazo.rut_saliente }}</td>
                <td class="small bg-warning">{{ reemplazo.nombre_saliente }}</td>
                <td class="small bg-warning">{{ reemplazo.apellido_saliente }}</td>
                <td class="small bg-success">{{ reemplazo.rut_entrante }}</td>
                <td class="small bg-success">{{ reemplazo.nombre_entrante }}</td>
                <td class="small bg-success">{{ reemplazo.apellido_entrante }}</td>
                <td class="small">{{ reemplazo.tipo_turno }}</td>
                <td class="small">{{ reemplazo.fecha_inicio }}</td>
                <td class="small">{{ reemplazo.fecha_termino }}</td>
                <td class="small">{{ reemplazo.servicio }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="">
        <button @click="eliminar" class="btn btn-primary">Eliminar</button>
      </div>
      
    </main>
  </template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();

const user = ref<any[]>([]); // Definir user como una referencia a un array de cualquier tipo
const seleccionados = ref<number[]>([]);

onMounted(async () => {
    user.value = await authStore.mostrarReemplazos();
});

const toggleSeleccion = (index: number) => {
    const idx = seleccionados.value.indexOf(index);
    if (idx === -1) {
        seleccionados.value.push(index); // Si no está seleccionado, lo agrega
    } else {
        seleccionados.value.splice(idx, 1); // Si está seleccionado, lo quita
    }
};

const eliminar = async () => {
    for (const idx of seleccionados.value) {
        await authStore.eliminarReemplazo(user.value[idx]._id); // Suponiendo que cada reemplazo tiene un campo 'id'
    }
    user.value = user.value.filter((_, index) => !seleccionados.value.includes(index));
    seleccionados.value = [];
};

</script>