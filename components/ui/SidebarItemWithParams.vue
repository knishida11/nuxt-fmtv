<template>
  <v-list-item
    link
    :to="{
      name: name,
      params: {
        id: user,
      },
    }"
    nuxt
  >
    <v-list-item-action>
      <v-icon>
        <slot name="icon" />
      </v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>
        <slot name="title" />
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '/',
    },
    user: {
      type: String,
      default: '/',
    },
  },
}
</script>
