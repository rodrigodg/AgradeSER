<template>

  <v-container fluid fill-height>
    <v-flex style="text-align: center" xs12 sm12 lg12>

      <v-progress-circular
        v-if="mostrarLoading"
        indeterminate
        :size="70"
        :width="7"
        color="primary"/>

    </v-flex>
  </v-container>

</template>

<script>

  export default {
    name: 'loading',
    data: () => ({
      mostrarLoading: true,
    }),

  };
</script>

<style scoped>

</style>
