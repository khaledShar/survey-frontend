export interface SurveyDTO {
  id: number
  title: string
  questions: QuestionDTO[]
}
export interface QuestionDTO {
  id: number
  text: string
  position: number
}
export interface AnswerDTO {
  questionId: number
  score: number
}
export interface SubmitResponseDTO {
  surveyId: number
  answers: AnswerDTO[]
}
export interface ResultsDTO {
  surveyId: number
  results: QuestionResultDTO[]
}
export interface QuestionResultDTO {
  questionId: number
  text: string
  average: number
  distribution: Record<'1'|'2'|'3'|'4'|'5', number>
}
