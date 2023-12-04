<script setup lang="ts">
import Sidebar from '../components/SidebarMenu.vue'
import NavBar from '../components/NavBar.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
	<NavBar />
    <Sidebar />
	<div class="content">
      <RouterView />
    </div>
  </main>
</template>


<style lang="scss">
:root {
	--primary: #000000;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}



</style>