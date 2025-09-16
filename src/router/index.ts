import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SurveyFill from '@/pages/SurveyFill.vue'
import SurveyResults from '@/pages/SurveyResults.vue'

const DEFAULT_ID = import.meta.env.VITE_SURVEY_ID || '1'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: `/surveys/${DEFAULT_ID}` },
  { path: '/surveys/:id', component: SurveyFill, meta: { title: ' Teamwork Survey' } },
  { path: '/surveys/:id/results', component: SurveyResults, meta: { title: 'Results' } },
  { path: '/:pathMatch(.*)*', redirect: `/surveys/${DEFAULT_ID}` }
]

const router = createRouter({ history: createWebHistory(), routes })
router.afterEach((to) => {
  document.title = to.meta?.title ? `${to.meta.title} · Survey` : 'Survey'
})
export default router
