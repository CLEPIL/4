import { initializeApp } from 'firebase/app'
import { getFunctions, httpsCallable } from 'firebase/functions'
import apiConfig from './api_config'

const app = initializeApp({
  projectId: apiConfig.projectId,
  apiKey: apiConfig.apiKey,
  authDomain: apiConfig.authDomain
})
const functions = getFunctions(app)
const addMessage = httpsCallable(functions, 'addMessage')
export default addMessage
