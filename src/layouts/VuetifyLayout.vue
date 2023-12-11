<!-- src/layouts/VuetifyLayout.vue -->
<template>
    <v-app>
        <v-app-bar left style="height:60px;">
            <img @click="goHome()" 
                style="width:100%; height:100%; object-fit: contain; cursor: pointer; align-items: left; width:100px;" 
                src="https://github.com/msa-ez/cloud-iq/assets/149130268/66649787-f394-49f9-8a72-8002997161c6" 
            />
        </v-app-bar>
    <!-- Vuetify 레이아웃 구조 -->
        <div style="height: calc(100vh - 60px);">
            <slot/>
        </div>
    </v-app>
</template>
  
<script>
export default {
    name: 'VuetifyLayout',
    components: {
    },
    computed: {
    },
    data() {
        return {

        }
    },
    mounted() {
        document.title = 'cloudiq';
    },
    methods: {
        goHome() {
            this.$router.push('/');
        }
    },
    
}
</script>
  