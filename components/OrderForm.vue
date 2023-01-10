<template>
  <v-row>
    <v-col>
      <v-select :items="items" />
    </v-col>
    <v-col>
      <v-text-field />
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
        <v-date-picker v-model="picker" locale="jp-ja" :day-format="(date) => new Date(date).getDate()" @input="formatDate(picker)" />
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
      items: ['野菜1', '野菜2', '野菜3'],
      g: ['250', '500', '750', '1000'],
      menu: '',
      text: '',
      picker: '',
      price: '200'
    }
  },
  methods: {
    formatDate (date) {
      if (!date) { return null }
      const [year, month, day] = date.split('-')
      this.text = `${year}/${month}/${day}`
      this.menu = false
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
