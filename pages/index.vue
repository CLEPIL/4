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
  async mounted () {
    if (Object.keys(this.$route.query).includes('code')) {
      const result = await addMessage({ code: this.$route.query.code })
      if (result.data.status === 200) {
        const accessToken = result.data.access_token
        const refreshToken = result.data.refresh_token
        const expiresIn = result.data.expires_in
        const user = result.data.user
        // eslint-disable-next-line no-console
        console.log('accessToken')
        // eslint-disable-next-line no-console
        console.log(accessToken)
        // eslint-disable-next-line no-console
        console.log('refreshToken')
        // eslint-disable-next-line no-console
        console.log(refreshToken)
        // eslint-disable-next-line no-console
        console.log('expiresIn')
        // eslint-disable-next-line no-console
        console.log(expiresIn)
        // eslint-disable-next-line no-console
        console.log('user')
        // eslint-disable-next-line no-console
        console.log(user)
      }
      // eslint-disable-next-line no-console
      console.log(result)
      /*
      if (result.data.status === 200) {
        // ログインに成功したときの処理

        // 全体の流れは以下の通り
        // ユーザーは、アプリの利用を開始する
        // アプリは、LINE WORKSにユーザー認可を要求する（Client ID, Redirect URLを送信)
        // LINE WORKSは、ユーザーの資格情報(Credentials)を確認し、認証していない場合はログイン画面を表示する
        // ユーザーは、ログイン画面でIDとパスワードを入力してログインする
        // LINE WORKSは、認証成功時にAuthorization Code(認可コード)を発行し、指定されたRedirect URLにリダイレクトする
        // アプリは、Authorization CodeをもとにAccess Tokenを発行する ←今ここが終わったところ
        // アプリは、Access Tokenの有効期限が過ぎた場合、Refresh Tokenをもとに再発行する

        // data.access_token 有効期限: 24時間
        // data.refresh_token 有効期限: 90日
        // 通常、これらはCookieに入れられ、わざわざログインしなくてもいいようにする
        const data = result.data.data
        // eslint-disable-next-line no-console
        console.log(data)
      }
      */
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
