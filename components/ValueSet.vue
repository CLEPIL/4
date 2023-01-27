<template>
  <v-row class="ma-0">
    <v-col cols="1" />
    <v-col cols="5" align-self="center" class="pa-0">
      {{ check }}:
    </v-col>
    <v-col cols="3" class="pa-0">
      <v-text-field v-model.number="value" inputmode="numeric" class="right" @change="value_change" />
    </v-col>
    <v-col cols="3" align-self="center" class="pl-1">
      円/kg
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    check: String(),
    index: Number()
  },
  data () {
    return {
      value: null
    }
  },
  methods: {
    value_change () {
      this.$emit('value', this.value, this.index)
    }
  }
}
</script>

<style>
.right input{
  text-align: right;
  padding-bottom: 0;
}
</style>
