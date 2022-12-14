<template>
  <div>
    使い方をここに書く？書かない。
    <v-btn @click="loginAccess">
      CLICK
    </v-btn>
  </div>
</template>

<script>
import { getDatabase, ref, set } from 'firebase/database'
import addMessage from '@/api'
export default {
  data () {
    return {
      count: 0,
      age: 30
    }
  },
  mounted () {
    // eslint-disable-next-line no-console
    console.log(Object.keys(this.$route.query))
    if (Object.keys(this.$route.query).includes('code')) {
      addMessage({ code: this.$route.query.code }).then((result) => {
        // eslint-disable-next-line no-console
        console.log(result)
      })
    }
  },
  methods: {
    watchdb () {
      const database = getDatabase()
      // eslint-disable-next-line no-console
      console.log(database)
    },
    writeUserData (age) {
      const db = getDatabase()
      set(ref(db), {
        aage: age
      })
    },
    loginAccess () {
      const details = {
        client_id: '6e1AHqNUbTld9yATwwv3',
        redirect_uri: 'http://localhost:3000',
        scope: 'user.profile.read',
        response_type: 'code',
        state: 'aBcDeF'
      }
      const url = 'https://auth.worksmobile.com/oauth2/v2.0/authorize'
      location.href = url + '?' + MetadataToUrl(details)
    }
  }
}

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
</script>

<style>

</style>
