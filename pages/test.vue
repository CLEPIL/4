<template>
  <v-app>
    <h1>Hello, world!</h1>
    <v-row
      v-for="item in items"
      :key="item">
        <h2>選択中の野菜は {{ item }} です。</h2>
    </v-row>

    <v-row>
      {{ item }}
    </v-row>
  </v-app>
</template>

<script>
import { getDatabase, ref, child, get } from 'firebase/database'
export default {
  data () {
    return {
      items: []
    }
  },
  mounted () {
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'testUser'))
      .then((snapshot) => {
        if (snapshot.exist()) {
          const checkVeges = snapshot.true()
          Object.keys(checkVeges).forEach(k => this.items.push(checkVeges[k]))
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>

<style>
</style>
