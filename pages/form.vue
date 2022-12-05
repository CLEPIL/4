<template>
  <v-app>
    <v-form class="form">
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
          <v-text-field v-model.number="weight" />
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
                v-on="on"
              />
            </template>
            <v-date-picker v-model="picker" @input="formatDate(picker)" />
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
          <v-btn link rel="stylesheet" href="/fin" @click="writeOrderdata()">
            送信
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-app>
</template>
<script>
import { getDatabase, ref, push } from 'firebase/database'
export default {
  data () {
    return {
      items: ['野菜1', '野菜2', '野菜3'],
      yasai: null,
      weight: null,
      g: ['250', '500', '750', '1000'],
      menu: '',
      text: '',
      picker: null,
      price: '200'
    }
  },
  methods: {
    formatDate (date) {
      if (!date) { return null }
      const [year, month, day] = date.split('-')
      this.text = `${year}/${month}/${day}`
      this.menu = false
    },
    writeOrderdata () {
      const db = getDatabase()
      // eslint-disable-next-line no-console
      push(ref(db, 'orders/'), {
        yasai: this.yasai,
        weight: this.weight,
        date: this.picker
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
