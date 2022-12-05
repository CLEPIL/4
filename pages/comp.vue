<template>
  <v-container>
    <v-row class="comp">
      <v-col> 送信完了 </v-col>
    </v-row>
    <v-row class="comp">
      <v-col>
        <router-link to="/form">
          別の注文
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col>注文履歴</v-col>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="items" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getDatabase, ref, child, get } from 'firebase/database'
export default {
  data () {
    return {
      headers: [
        { text: '注文日時', value: 'date' },
        { text: '野菜', value: 'yasai' },
        { text: '数量', value: 'weight' }
      ],
      items: [
      ]
    }
  },
  mounted () {
    // eslint-disable-next-line no-console
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'orders')).then((snapshot) => {
      if (snapshot.exists()) {
        // eslint-disable-next-line no-console
        console.log(snapshot.val())
        const orders = snapshot.val()
        Object.keys(orders).forEach(k => this.items.push(orders[k]))
      } else {
        // eslint-disable-next-line no-console
        console.log('No data available')
      }
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
  methods: {
    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('この注文を承認しますか？') && this.items.splice(index, 1)
    }
  }
}
</script>
<style>
.tittle {
  color: #000000;
  text-align: center;
}
.comp {
  text-align: center;
}
.button {
  text-align: center;
}
</style>
