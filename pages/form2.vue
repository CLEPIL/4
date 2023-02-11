<template>
  <v-app>
    ID : {{ this.$store.state.todo.Udata.email }}
    <v-container style="margin-top: 20px; width: 90vw">
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
            <v-card class="item-list">
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
        choices: ['リーキ', 'ベルギーエシャロット（訳あり）', 'ケール', 'サニーレタス', 'アイスプラント', '小松菜', 'アスパラ菜', '菜花', 'つぼみ菜', '葉わさび', '根わさび', 'ちぢみ雪菜', '寒じめほうれん草', 'ほうれん草', 'カブ', '黒大根', '紅芯大根', 'ジャガイモ／メークイン', 'ジャガイモ／シャドークイン', 'ジャガイモ／十勝こがね', 'ヤーコン', '里芋', '菊芋', '銀杏', 'とうがらし', '青豆', '黒あずき', 'キクラゲ', 'ヒラタケ', 'シイタケ(菌床)', 'シイタケ(原木)', '小ネギ', 'さつまいも／紅はるか', 'さつまいも／シルクスイート']
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
<style>
.item-list {
  height: 70vh;
  overflow-y: auto;
}
</style>
