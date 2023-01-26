<template>
  <v-row class="ma-0">
    <v-col cols="6" align-self="center" class="pa-0">
      {{ check }}:
    </v-col>
    <v-col cols="3" class="pa-0">
      <v-text-field v-model.number="value" inputmode="numeric" class="right" />
    </v-col>
    <v-col cols="3" align-self="center" class="pl-1">
      円/kg
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    check: String
  },
  data () {
    return {
      value: null
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
