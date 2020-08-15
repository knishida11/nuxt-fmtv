<template>
  <v-list-item
    link
    :to="{
      path: path,
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
    path: {
      type: String,
      default: '/',
    },
  },
}
</script>
