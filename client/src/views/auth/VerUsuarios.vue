<template>

    <main>
        <div class="table-responsive">
            <div class="mb-3">
                <input type="text" v-model="filtroRut" placeholder="Buscar por RUT">
            </div>
  <table class="table table-bordered table-sm">
    <thead class="thead-light">
      <tr>
        <th scope="col" class="small">Rut</th>
        <th scope="col" class="small">Nombre</th>
        <th scope="col" class="small">Apellido</th>
        <th scope="col" class="small">Dirección</th>
        <th scope="col" class="small">Teléfono</th>
        <th scope="col" class="small">Email</th>
        <th scope="col" class="small">Ciudad</th>
        <th scope="col" class="small">Habilitado</th>
      </tr>
    </thead>
    <tbody class="customtable">
      <tr v-for="(usuario, index) in usuariosFiltrados" :key="index">
        <td class="small">{{ usuario.rut }}</td>
        <td class="small">{{ usuario.nombre }}</td>
        <td class="small">{{ usuario.apellido }}</td>
        <td class="small">{{ usuario.direccion }}</td>
        <td class="small">{{ usuario.telefono }}</td>
        <td class="small">{{ usuario.email }}</td>
        <td class="small">{{ usuario.ciudad }}</td>
        <td class="small">{{ usuario.habilitado }}</td>
      </tr>
    </tbody>
  </table>
</div>
    </main>

</template>

<script setup lang="ts">
    import { useAuthStore } from '../../stores/auth';
    import { ref, onMounted, computed } from 'vue';
    
    const authStore = useAuthStore()
    const user = ref<any[]>([]); 
    const filtroRut = ref("");


    onMounted(async () => {
    const opciones = await authStore.mostrarOpciones();
    user.value = await authStore.mostrarUsuarios();

});

const usuariosFiltrados = computed(() => {
    if (filtroRut.value !== "") {
    return user.value.filter(usuario => usuario.rut.startsWith(filtroRut.value));
    } else {
    return user.value;
    }
});



</script>