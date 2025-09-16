<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)
const SURVEY_ID = import.meta.env.VITE_SURVEY_ID
</script>

<template>
    <v-app>
        <v-app-bar color="primary" density="comfortable">
            <v-app-bar-nav-icon @click="drawer = !drawer" />
            <v-app-bar-title>Team Survey</v-app-bar-title>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" temporary>
            <v-list nav dense>
                <v-list-item prepend-icon="mdi-file-document-edit-outline" :to="`/surveys/${SURVEY_ID}`"
                    title="Survey" />
                <v-list-item prepend-icon="mdi-chart-bar" :to="`/surveys/${SURVEY_ID}/results`" title="Results" />
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container class="py-6">
                <router-view />
            </v-container>
        </v-main>
        <v-footer app>
            <v-container class="text-caption">
                © {{ new Date().getFullYear() }} – Happy employees
            </v-container>
        </v-footer>
    </v-app>
</template>
