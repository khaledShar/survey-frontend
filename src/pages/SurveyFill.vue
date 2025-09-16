<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'
import LikertScale from '@/components/LikertScale.vue'
import type { AnswerDTO } from '@/types/api'

const route = useRoute()
const router = useRouter()
const store = useSurveyStore()

const answers = reactive<Record<string, number | null>>({})
const submitting = ref(false)

const allAnswered = computed(() => {
  if (!store.currentSurvey) return false
  return store.currentSurvey.questions.every(q => {
    const v = answers[q.id]
    return typeof v === 'number' && v >= 1 && v <= 5
  })
})

const ready = computed(() => !!store.currentSurvey && !store.loading)

onMounted(async () => {
    await store.fetchSurvey(route.params.id as string)
    store.currentSurvey?.questions?.forEach(q => { answers[q.id] = null })
})

async function submit() {
    submitting.value = true
    try {
        const payload: AnswerDTO[] = Object.entries(answers).map(([questionId, score]) => ({
            questionId,
            score: Number(score)
        }))
        if (payload.some(a => !a.score || a.score < 1 || a.score > 5)) {
            throw new Error('All questions must be answered')
        }
        await store.submitResponses(route.params.id as string, payload)
        router.push(`/surveys/${route.params.id}/results`)
    } catch {
        if (!store.error) store.error = 'Submission failed.'
    } finally {
        submitting.value = false
    }
}
</script>

<template>
    <v-skeleton-loader v-if="store.loading && !store.currentSurvey" type="article" />
    <v-alert v-else-if="store.error" type="error">{{ store.error }}</v-alert>

    <v-card v-else-if="ready">
        <v-card-title>{{ store.currentSurvey!.title }}</v-card-title>
        <v-card-text>
            <div class="d-flex flex-column ga-6">
                <div v-for="q in store.currentSurvey!.questions" :key="q.id" class="my-2">
                    <div class="mb-2 text-subtitle-1"><strong>{{ q.position }}. {{ q.text }}</strong></div>
                    <LikertScale v-model="answers[q.id]" :name="`q-${q.id}`" />
                </div>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="primary" class="text-none" :disabled="!allAnswered || submitting" :loading="submitting" @click="submit">Submit</v-btn>
        </v-card-actions>
    </v-card>
</template>
