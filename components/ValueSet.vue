<template>
  <v-row class="ma-4">
    {{ check }}:<v-text-field v-model.number="value" />
  </v-row>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    check: Object
  },
  data () {
    return {
      value: null
    }
  }
}
</script>
