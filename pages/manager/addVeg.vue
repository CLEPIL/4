<template>
  <v-app>
    <v-col>
      <v-text-field v-model="NewVege" />
      <v-btn @click="writeNewVege">
        追加
      </v-btn>
      <v-dialog v-model="dialog" title="更新完了">
        <v-card>
          <v-card-text class="update">
            追加しました
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-app>
</template>

<script>
import { getDatabase, ref, set, get, child } from 'firebase/database'
export default {
  data () {
    return {
      NewVege: [],
      items: [],
      dialog: false
    }
  },
  mounted () {
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'vages/choices'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // eslint-disable-next-line no-console
          console.log(snapshot.val())
          const vages = snapshot.val()
          Object.keys(vages).forEach(k => this.items.push(vages[k]))
        } else {
          // eslint-disable-next-line no-console
          console.log('No data available')
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  },
  methods: {
    writeNewVege () {
      this.items.push(this.NewVege)
      const db = getDatabase()
      // eslint-disable-next-line no-console
      set(ref(db, 'vages/'), {
        choices: this.items
      })
      this.dialog = true
    }
  }
}
</script>
