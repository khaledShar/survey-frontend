import { defineStore } from 'pinia'
import api from '@/services/http'
import type {
  SurveyDTO, ResultsDTO,
  SubmitResponseDTO, AnswerDTO
} from '@/types/api'

interface State {
  currentSurvey: SurveyDTO | null
  results: ResultsDTO | null
  loading: boolean
  error: string | null
}

export const useSurveyStore = defineStore('survey', {
  state: (): State => ({
    currentSurvey: null,
    results: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchSurvey(id: string): Promise<void> {
      this.loading = true; this.error = null
      try {
        const { data } = await api.get<SurveyDTO>(`/surveys/${id}`)
        this.currentSurvey = data
      } catch (e: any) {
        this.error = e?.response?.data?.message ?? 'Survey not found'
        throw e
      } finally {
        this.loading = false
      }
    },

    async submitResponses(id: string, answers: AnswerDTO[]): Promise<void> {
      this.loading = true; this.error = null
      try {
        const payload: SubmitResponseDTO = { surveyId: Number(id), answers }
        await api.post<void>(`/surveys/${id}/responses`, payload)
      } catch (e: any) {
        this.error = e?.response?.data?.message ?? 'Error submitting responses'
        throw e
      } finally {
        this.loading = false
      }
    },

    async fetchResults(id: string): Promise<void> {
      this.loading = true; this.error = null
      try {
        const { data } = await api.get<ResultsDTO>(`/surveys/${id}/results`)
        this.results = data
      } catch (e: any) {
        this.error = e?.response?.data?.message ?? 'Error fetching results'
        throw e
      } finally {
        this.loading = false
      }
    },

    clear(): void {
      this.currentSurvey = null
      this.results = null
      this.error = null
    }
  }
})
