const functions = require('firebase-functions')
const axios = require('axios')

function MetadataToUrl (metadata) {
  const formBodyArr = []
  for (const property in metadata) {
    const encodedKey = encodeURIComponent(property)
    const encodedValue = encodeURIComponent(metadata[property])
    formBodyArr.push(encodedKey + '=' + encodedValue)
  }
  const formBody = formBodyArr.join('&')
  return formBody
}

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
exports.addMessage = functions.https.onCall((data, context) => {
  // eslint-disable-next-line no-console
  console.log(data)
  const url = 'https://auth.worksmobile.com/oauth2/v2.0/token'
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const details = {
    code: data.code,
    grant_type: 'authorization_code',
    client_id: '6e1AHqNUbTld9yATwwv3',
    client_secret: 'rBx0cEoeGf'
  }
  const metadataUrl = url + '?' + MetadataToUrl(details)
  return axios.post(metadataUrl, details, config).then((response) => {
    return response.data
  })
})
