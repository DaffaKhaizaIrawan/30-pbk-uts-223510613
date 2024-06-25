<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="=" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered content-style="top-padding">
      <q-list>
        <q-item clickable v-ripple @click="navigateTo('/')">
          <q-item-section>
            <q-item-label>Post</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/todo')">
          <q-item-section>
            <q-item-label>Todos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/album')">
          <q-item-section>
            <q-item-label>Album</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const leftDrawerOpen = ref(false);
const title = 'Daffa';
const router = useRouter();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function navigateTo(route) {
  leftDrawerOpen.value = false; // Close drawer when navigating
  router.push(route); // Navigate to the given route
}
</script>
