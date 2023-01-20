<template>
  <v-app>
    ID : {{ this.$store.state.todo.Udata.email }}
    <v-form class="form">
      <v-row class="isCheck">
        選択中: {{ checkbox }}
      </v-row>
      <v-row>
        <v-col
          v-for="list in items"
          :key="list"
          class="checkbox"
          :cols="11"
        >
          <v-checkbox
            v-model="checkbox"
            :label="list"
            :value="list"
          />
        </v-col>
      </v-row>

      <v-row class="button" justify="center" align-content="center">
        <v-btn @click="wtInt()">
          更新
        </v-btn>
        <v-dialog v-model="dialog" title="更新完了">
          <v-card>
            <v-card-text class="update">
              更新を完了しました
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-form>
  </v-app>
</template>

<script>
import { getDatabase, set, ref, update, get, child } from 'firebase/database'
export default {
  data () {
    return {
      id: null,
      lists: [
        { selected: 0, name: '要素1' },
        { selected: 0, name: '要素2' },
        { selected: 0, name: '要素3' },
        { selected: 0, name: '要素4' },
        { selected: 0, name: '要素5' },
        { selected: 0, name: '要素6' }
      ],
      checkbox: [],
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
    showModal () {
      (this.dialog = true)(this.checkbox = [])
    },
    wtInt () {
      const db = getDatabase()
      // eslint-disable-next-line no-console
      update(ref(db, 'int/' + this.$store.state.todo.Udata.email), {
        check: this.checkbox,
        id: this.$store.state.todo.Udata.email
      })
    },
    rvage () {
      const db = getDatabase()
      // eslint-disable-next-line no-console
      set(ref(db, 'vages/'), {
        choices: ['ニンジン', 'ネギ', '大根']
      })
    }
  }
}
</script>

<style>
.isCheck {
  padding-top: 2vh;
  justify-content: center;
}
.checkbox {
  padding-left: 50px;
}
.update {
  height: 3vh;
  text-align: center;
}
.form {
  text-align: center;
}
.button {
  text-align: center;
}
</style>
