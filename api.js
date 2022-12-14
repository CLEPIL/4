import { initializeApp } from 'firebase/app'
import { getFunctions, httpsCallable } from 'firebase/functions'

const app = initializeApp({
  projectId: 'blaze-lab-75c62',
  apiKey: 'AIzaSyARYmwkEzz0WY6LCzToU0t9Kb2uXirbfVI',
  authDomain: 'blaze-lab-75c62.firebaseapp.com'
})
const functions = getFunctions(app)
const addMessage = httpsCallable(functions, 'addMessage')
export default addMessage
