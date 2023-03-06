<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn class="cen" @click="loginAccess">
        login
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'ホーム',
          to: '/'
        },
        {
          icon: 'mdi-form-select',
          title: '飲食店',
          to: '/form5'
        },
        {
          icon: 'mdi-form-select',
          title: '生産者',
          to: '/form2'
        }
        // {
        // icon: 'mdi-format-list-bulleted',
        // title: '注文履歴',
        // to: '/history'
        // }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'いちのせき野菜アプリ'
    }
  },
  methods: {
    loginAccess () {
      const details = {
        client_id: '6e1AHqNUbTld9yATwwv3',
        redirect_uri: 'https://blaze-lab-75c62.web.app',
        scope: 'user.profile.read',
        response_type: 'code',
        state: 'aBcDeF'
      }
      const url = 'https://auth.worksmobile.com/oauth2/v2.0/authorize'
      location.href = url + '?' + MetadataToUrl(details)
    }
  }
}
function MetadataToUrl (metadata) {
  const formBodyArr = []
  for (const property in metadata) {
    const encodedKey = encodeURIComponent(property)
    const encodedValue = encodeURIComponent(metadata[property])
    formBodyArr.push(encodedKey + '=' + encodedValue)
  }
  const formBody = formBodyArr.join('&')
  return formBody
}
</script>
