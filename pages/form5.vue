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
            生産者指定
          </v-stepper-step>
          <v-divider />
          <v-stepper-step step="3">
            詳細入力
          </v-stepper-step>
          <v-divider />
          <v-stepper-step step="4">
            確認
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1" class="pa-4">
            <v-card class="mb-12">
              <v-row class="pa-4">
                注文する野菜を選択
              </v-row>
              <v-row class="ma-4">
                <v-select
                  v-model="yasai"
                  :items="items"
                />
              </v-row>
            </v-card>
            <v-btn color="primary" @click="e1 = 2">
              次へ
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2" class="pa-3">
            <v-card class="mb-12">
              <v-row class="pa-4">
                生産者を指定する
              </v-row>
              <v-row class="ma-4">
                <v-select
                  v-model="n"
                  :items="names"
                />
              </v-row>
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
              <v-row>
                <v-col cols="4">
                  重量
                </v-col>
                <v-col cols="4" class="pa-0">
                  <v-text-field v-model.number="value" inputmode="numeric" class="right" @change="value_change" />
                </v-col>
                <v-col cols="4" align-self="center" class="pl-1">
                  kg
                </v-col>
              </v-row>
              <v-col>
                <v-row>
                  受取日時
                </v-row>
                <v-row>
                  <v-menu v-model="menu">
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="text"
                        v-bind="attrs"
                        label="ここから選択"
                        readonly
                        clearable
                        :rules="rules"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker v-model="picker" locale="jp-ja" :day-format="(date) => new Date(date).getDate()" :allowed-dates="allowedDate" @input="formatDate(picker)" />
                  </v-menu>
                </v-row>
              </v-col>
            </v-card>
            <v-btn color="primary" @click="e1 = 4">
              次へ
            </v-btn>
            <v-btn @click="e1 = 2">
              キャンセル
            </v-btn>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-card class="mb-12">
              <v-col>
                下記の内容でよろしいですか？
              </v-col>
              <v-col>
                {{ yasai }}({{ n }}):{{ weight }}kg
              </v-col>
              <v-col>
                受取日時：{{ picker }}
              </v-col>
              <v-col>
                お支払金額：{{ m }}円
              </v-col>
            </v-card>
            <v-btn color="primary" @click="e1 = 4">
              送信
            </v-btn>
            <v-btn @click="e1 = 3">
              キャンセル
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </v-app>
</template>
<script>
import { getDatabase, ref, push, get, child } from 'firebase/database'
export default {
  data () {
    return {
      rules: [v => !!v || ''],
      items: [],
      yasai: null,
      weight: null,
      id: '',
      m: '1200',
      g: ['250', '500', '750', '1000'],
      names: ['文字数文字数文字数', 'b', 'c'],
      menu: '',
      text: '',
      picker: null,
      price: '200',
      isValid: null,
      e1: 1
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
    formatDate (date) {
      if (!date) { return null }
      const [year, month, day] = date.split('-')
      this.text = `${year}/${month}/${day}`
      this.menu = false
    },
    allowedDate: function (val) {
      // 今日～100日後までを選べるようにする
      let today = new Date()
      today = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )
      let maxAllowedDay = new Date()
      maxAllowedDay.setDate(
        today.getDate() + 100
      )
      maxAllowedDay = new Date(
        maxAllowedDay.getFullYear(),
        maxAllowedDay.getMonth(),
        maxAllowedDay.getDate()
      )
      return today <= new Date(val) && new Date(val) <= maxAllowedDay
    },
    writeOrderdata () {
      const db = getDatabase()
      // eslint-disable-next-line no-console
      push(ref(db, 'orders/'), {
        id: this.$store.state.todo.Udata.email,
        link: 'https://line.worksmobile.com/message/send?version=18&message=&emailList=' + this.$store.state.todo.Udata.email,
        yasai: this.yasai,
        weight: this.weight,
        date: this.picker,
        jt: '未承認'
      })
    }
  }
}
</script>
<style>
.tittle {
  color: #000000;
  text-align: center;
}
.form {
  text-align: center;
}
.button {
  text-align: center;
}
</style>
