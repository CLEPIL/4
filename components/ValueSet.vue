<template>
  <v-row class="ma-4">
    {{ check }}:<v-text-field v-model.number="value" />
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
