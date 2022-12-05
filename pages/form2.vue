<template>
  <v-app>
    <v-checkbox
      v-model="selected"
      label="John"
      value="John"
    />
    <v-checkbox
      v-model="selected"
      label="Jacob"
      value="Jacob"
    />
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      selected: ['John']
    }
  }
}
</script>
