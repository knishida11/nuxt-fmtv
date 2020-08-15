<template>
  <div>
    <div v-if="!user">
      <sidebar-item path="/login">
        <template v-slot:icon>
          mdi-login
        </template>
        <template v-slot:title>
          Login
        </template>
      </sidebar-item>
      <sidebar-item path="/">
        <template v-slot:icon>
          mdi-magnify
        </template>
        <template v-slot:title>
          Search
        </template>
      </sidebar-item>
    </div>
    <div v-else>
      <sidebar-item-with-params name="id" :user="user.pageId">
        <template v-slot:icon>
          mdi-account-outline
        </template>
        <template v-slot:title>
          {{ user.displayName }}
        </template>
      </sidebar-item-with-params>
      <sidebar-item path="/">
        <template v-slot:icon>
          mdi-magnify
        </template>
        <template v-slot:title>
          Search
        </template>
      </sidebar-item>
      <sidebar-item path="likes">
        <template v-slot:icon>
          mdi-heart-outline
        </template>
        <template v-slot:title>
          Likes
        </template>
      </sidebar-item>
      <sidebar-item path="watch">
        <template v-slot:icon>
          mdi-eye-outline
        </template>
        <template v-slot:title>
          Watchlist
        </template>
      </sidebar-item>
      <sidebar-item path="settings">
        <template v-slot:icon>
          mdi-cog-outline
        </template>
        <template v-slot:title>
          Settings
        </template>
      </sidebar-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from '~/components/ui/SidebarItem.vue'
import SidebarItemWithParams from '~/components/ui/SidebarItemWithParams.vue'
export default {
  name: 'Sidebar',
  components: {
    SidebarItem,
    SidebarItemWithParams,
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
}
</script>

<style lang="scss" scoped></style>
