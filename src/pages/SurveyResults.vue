<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

const route = useRoute()
const store = useSurveyStore()

onMounted(async () => {
    await store.fetchResults(route.params.id as string)
})

const rows = computed(() => {
    const r = store.results?.results ?? []
    return r.map(x => ({
        question: x.text,
        average: Number(x.average).toFixed(2),
        d1: x.distribution['1'],
        d2: x.distribution['2'],
        d3: x.distribution['3'],
        d4: x.distribution['4'],
        d5: x.distribution['5'],
    }))
})

const headers = [
    { title: 'Question', value: 'question', width: '40%' },
    { title: 'Ø', value: 'average', width: 80 },
    { title: '1', value: 'd1' },
    { title: '2', value: 'd2' },
    { title: '3', value: 'd3' },
    { title: '4', value: 'd4' },
    { title: '5', value: 'd5' }
]
</script>

<template>
    <v-skeleton-loader v-if="store.loading && !store.results" type="table" />
    <v-alert v-else-if="store.error" type="error">{{ store.error }}</v-alert>

    <v-card v-else>
        <v-card-title>Results</v-card-title>
        <v-card-text>
            <v-data-table :headers="headers" :items="rows" class="mb-6" />
            <v-btn :to="`/surveys/${route.params.id}`" variant="tonal">Back to Survey</v-btn>
        </v-card-text>
    </v-card>
</template>
