<template>
  <v-container>
    <v-row>
      <v-col class="form">
        注文一覧
      </v-col>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="items">
          <template #[`item.weight`]="{ item }">
            <v-text-field v-model="item.weight" @change="change_weight(item.id, item.weight)" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row class="form">
      <v-col>
        <v-btn link rel="stylesheet" href="/orderlist">
          取消
        </v-btn>
      </v-col>
      <v-col>
        <v-btn link rel="stylesheet" href="/orderlist" @click="weightUpdate">
          更新
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getDatabase, ref, child, get, update } from 'firebase/database'
export default {
  data () {
    return {
      headers: [
        { text: 'ID', value: 'Uid' },
        { text: '野菜', value: 'yasai' },
        { text: '数量', value: 'weight' },
        { text: '受取日時', value: 'date' }
      ],
      items: [
      ],
      changed_items: []
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
        Object.keys(orders).forEach((k) => {
          const obj = orders[k]
          obj.id = k
          obj.changed = false
          this.items.push(obj)
        })
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
    },
    weightUpdate () {
      // eslint-disable-next-line no-console
      console.log(this.changed_items.length)
      const dbRef = ref(getDatabase())
      this.changed_items.forEach((e) => {
        // eslint-disable-next-line no-console
        console.log(e.id)
        // eslint-disable-next-line no-console
        console.log(e.weight)
        update(child(dbRef, 'orders/' + e.id), { weight: e.weight })
      /*
        get(child(dbRef, 'orders')).then((snapshot) => {
          if (snapshot.exists()) {
            // eslint-disable-next-line no-console
            console.log(snapshot.val())
            const orders = snapshot.val()
            Object.keys(orders).forEach((k) => {
              const obj = orders[k]
              obj.id = k
              obj.changed = false
              this.items.push(obj)
            })
          } else {
            // eslint-disable-next-line no-console
            console.log('No data available')
          }
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
        */
      })
    },
    change_weight (id, weight) {
      // eslint-disable-next-line no-console
      console.log(id)
      // eslint-disable-next-line no-console
      console.log(weight)
      this.changed_items.push({ id, weight })
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
