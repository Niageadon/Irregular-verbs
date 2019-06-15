<template>
  <div class="row q-ma-md justify-center q-gutter-xs">
    <q-card disable class="col-xs-6 col-md-5 q-mt-md " rounded outlined v-model="array[0].present" label="Present">
      <draggable>
        <q-card-section>ff</q-card-section>
      </draggable>
    </q-card>
    <q-card disable class="col-xs-grow col-md-5 q-mt-md " rounded outlined v-model="array[0].past" label="Past">
      <draggable>
        <q-card-section>aa</q-card-section>
      </draggable>
    </q-card>
    <q-card disable class="col-xs-6 col-md-5 q-mt-md " rounded outlined v-model="array[0].pastParticiple" label="Past Participle">
      <q-card-section>ff</q-card-section>
    </q-card>
    <q-card disable class="col-xs-grow col-md-5 q-mt-md " rounded outlined v-model="array[0].translate" label="Translate">
      <q-card-section>ff</q-card-section>
    </q-card>
    <!--  -->
    <q-separator class="col-12 q-mt-md" color="orange" inset></q-separator>
    <div class="col-12 q-mt-lg">
      <q-card>
        <q-card-section>ff</q-card-section>
      </q-card>
      <q-card>
        <q-card-section>ff</q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import verbs from '../assets/irregular-verbs'
import draggable from 'vuedraggable'
export default {
  name: 'learningPage',
  comments: { draggable: draggable },
  data () {
    return {
      answer: { present: '', past: '', pastParticiple: '' },
      array: verbs
    }
  },
  mounted () {
    console.log(this.array)
  }
}
</script>

<style scoped>

</style>
