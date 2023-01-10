<template>
  <v-app>
    <v-form v-model="isValid" class="form">
      <v-row>
        ID<v-text-field v-model="id" />
      </v-row>
      <v-row>
        <v-col> 野菜 </v-col>
        <v-col> 数量 </v-col>
        <v-col> 受取日 </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="yasai"
            :items="items"
          />
        </v-col>
        <v-col>
          <v-text-field v-model.number="weight" :rules="rules" />
        </v-col>
        <v-col>
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
        </v-col>
      </v-row>
      <v-row class="button">
        <!-- <v-col>
          <v-btn @click="copy(index)">
            フォーム追加
          </v-btn>
        </v-col> -->
        <v-col>
          <v-btn
            :disabled="!isValid || loading"
            link
            rel="stylesheet"
            href="/fin"
            block
            @click="writeOrderdata()"
          >
            送信
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
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
      g: ['250', '500', '750', '1000'],
      menu: '',
      text: '',
      picker: null,
      price: '200',
      isValid: null
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
        id: this.id,
        link: 'https://line.worksmobile.com/message/send?version=18&message=&emailList=' + this.id,
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
