<template>
  <div>
    <q-drawer v-model="drawer" side="left" overlay elevated>
    <!-- drawer content -->
    <div class="row q-gutter-md">
      <q-btn class="col-11" to="/AssociationsMethod">AM</q-btn>
      <q-btn class="col-11" to="/EmotionsRead">RE</q-btn>
    </div>
    </q-drawer>
  </div>
</template>

<script>
export default {
  name: 'drawer',
  data () {
    return {
      drawer: true
    }
  }
}

</script>

<style scoped>

</style>
