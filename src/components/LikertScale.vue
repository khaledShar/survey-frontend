<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    modelValue: number | null
    name: string
    labels?: string[]
    required?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void
}>()

const texts = computed(() => props.labels ?? [
    'Totally disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Totally agree'
])

const items = computed(() => [1, 2, 3, 4, 5].map(v => ({
    value: v, label: texts.value[v - 1]
})))

function update(val: any) {
    const n = Number(val)
    emit('update:modelValue', Number.isFinite(n) ? n : null)
}
</script>

<template>
    <v-radio-group :model-value="modelValue ?? undefined" @update:model-value="update" :name="name"
        :rules="(required ?? true) ? [(v: any) => !!v || 'Pflichtfeld'] : []" inline>
        <v-radio v-for="it in items" :key="it.value" :label="`${it.value} – ${it.label}`" :value="it.value"
            density="comfortable" />
    </v-radio-group>
</template>
