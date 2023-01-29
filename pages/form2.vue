<template>
  <v-app>
    ID : {{ this.$store.state.todo.Udata.email }}
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
          <v-stepper-content step="1" class="pa-4">
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
                      @change="changeCheckbox"
                    />
                  </v-col>
                </v-row>
              </v-list-item>
            </v-card>
            <v-btn color="primary" @click="e1 = 2">
              次へ
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2" class="pa-3">
            <v-card class="mb-12">
              <v-list-item v-for="(check, i) in checkbox" :key="check" class="pa-0" :check="check">
                <ValueSet :check="check" :index="i" @value="changedValue" />
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
            <v-card class="mb-12">
              <v-col>
                下記の内容で更新します。よろしいですか？
              </v-col>
              <v-col v-for="inv in inventory" :key="inv.name">
                {{ inv.name }}: {{ inv.value }}円/kg
              </v-col>
            </v-card>
            <v-btn color="primary" @click="WrightZaiko()">
              更新
            </v-btn>
            <v-dialog v-model="dialog" title="更新完了">
              <v-card>
                <v-card-text class="update">
                  更新を完了しました
                </v-card-text>
              </v-card>
            </v-dialog>
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
      checkbox: [],
      previous_checkbox: [],
      items: [],
      inventory: [],
      headers: [],
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
    wtInt () {
      const db = getDatabase()
      // eslint-disable-next-line no-console
      update(ref(db, 'int/' + this.$store.state.todo.Udata.email), {
        check: this.checkbox
      })
    },
    WrightZaiko () {
      this.dialog = true
      const db = getDatabase()
      update(ref(db, 'int/' + 'testman'), {
        zaiko: this.inventory
      })
    },
    rvage () {
      const db = getDatabase()
      // eslint-disable-next-line no-console
      set(ref(db, 'vages/'), {
        choices: ['ニンジン', 'ネギ', '大根']
      })
    },
    changedValue (value, index) {
      this.inventory.splice(index, 1, { name: this.inventory[index].name, value })
      // eslint-disable-next-line no-console
      console.log(this.inventory)
    },
    changeCheckbox () {
      if (this.previous_checkbox.length < this.checkbox.length) {
        // push
        const pushKey = this.checkbox.find(e => !this.previous_checkbox.includes(e))
        this.previous_checkbox.push(pushKey)
        this.inventory.push({ name: pushKey, value: null })
      } else {
        // pop
        const popIndex = this.previous_checkbox.findIndex(e => !this.checkbox.includes(e))
        this.previous_checkbox.splice(popIndex, 1)
        this.inventory.splice(popIndex, 1)
      }
    }
  }
}
</script>
