<template>
  <router-view />
</template>

<script setup>
import { provideAuth } from './contexts/authContext';
provideAuth();
</script>
