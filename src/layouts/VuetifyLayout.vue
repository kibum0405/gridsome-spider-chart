<!-- src/layouts/VuetifyLayout.vue -->
<template>
    <v-app>
    <!-- Vuetify 레이아웃 구조 -->
        <v-container class="align-center justify-center">
            <slot/>
        </v-container>
    </v-app>
</template>
  
<script>
    export default {
        name: 'VuetifyLayout'
    }
</script>
  