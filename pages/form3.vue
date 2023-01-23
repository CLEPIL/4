<template>
  <v-app>
    <v-container style="margin-top: 20px; width: 500px">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            種類選択
          </v-stepper-step>
          <v-divider />
          <v-stepper-step :complete="e1 > 2" step="2">
            価格設定
          </v-stepper-step>
          <v-divider />
          <v-stepper-step step="3">
            確認
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-12">
              <v-list-item>
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
              </v-list-item>
            </v-card>
            <v-btn color="primary" @click="e1 = 2">
              次へ
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12">
              <v-list-item v-for="check in checkbox" :key="check" :check="check">
                <ValueSet :check="check" />
              </v-list-item>
            </v-card>
            <v-btn color="primary" @click="e1 = 3">
              次へ
            </v-btn>
            <v-btn @click="e1 = 1">
              キャンセル
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12" color="grey lighten-1" height="100px">
              <v-list-item>
                <v-list-item-title>ステップ3内容</v-list-item-title>
              </v-list-item>
            </v-card>
            <v-btn color="primary">
              完了
            </v-btn>
            <v-btn @click="e1 = 2">
              キャンセル
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </v-app>
</template>
<script>
import { getDatabase, set, ref, update, get, child } from 'firebase/database'
import ValueSet from '../components/ValueSet.vue'
export default {
  components: {
    ValueSet
  },
  data () {
    return {
      e1: 1,
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
        check: this.checkbox
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
