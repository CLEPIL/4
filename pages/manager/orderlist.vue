<template>
  <v-container>
    <v-row>
      <v-col>注文一覧</v-col>
      <v-col cols="12">
        <v-data-table locale="jp-ja" :headers="headers" :items="items">
          <template #[`item.link`]="{ item }">
            <v-btn :href="item.link">
              連絡
            </v-btn>
          </template>
          <template #[`item.delete`]="{ item }">
            <v-btn small color="0" @click="deleteItem(item)">
              承認
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <router-link to="/manager/edi">
        編集
      </router-link>
    </v-row>
  </v-container>
</template>

<script>
import { getDatabase, ref, child, get } from 'firebase/database'
export default {
  data () {
    return {
      headers: [
        { text: '注文者', value: 'uname' },
        { text: '野菜', value: 'vegetable' },
        { text: '数量(kg)', value: 'weight' },
        { text: '支払金額', value: 'price' },
        { text: '受取日時', value: 'date' },
        { text: '連絡', value: 'link' }
        // { text: '', value: 'delete', sortable: false }
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
  .form {
    text-align: center;
  }
  .button {
    text-align: center;
  }
</style>
