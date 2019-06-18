<template>
  <div class="row q-ma-md justify-center ">
    <div class="contentContainer row col-12 justify-around">
      <div class="contentItem col-xs-5 col-md-5 q-my-xs">
        <div class="dragBox">Present
          <div class="contentBox">
            <draggable @change="putOption['present'] = !putOption['present']" class="dragBox" v-bind="getPresentOption" v-model="answer.present">
              <q-card class="col-xs-5 col-md-5 draggableItem" outlined rounded v-for="(item, index) in answer.present" :key="index"> {{item.name}}
                {{item}}
              </q-card>
            </draggable>
          </div>
        </div>
      </div>
      <!--------------------------------------------------->
      <div class="contentItem col-xs-5 col-md-5 q-my-xs">
        <div class="dragBox" >Past
          <div class="contentBox">
            <draggable class="dragBox" @change="putOption['past'] = !putOption['past']" v-model="answer.past" v-bind="getPastOption">
              <q-card class="col-xs-5 col-md-5 draggableItem" outlined rounded v-for="(item, index) in answer.past" :key="index"> {{item.name}}
              {{item}}
              </q-card>
            </draggable>
          </div>
        </div>
      </div>
      <!--------------------------------------------------->
      <div class="contentItem col-xs-5 col-md-5 q-my-xs">
        <div class="dragBox" >Past Participle
          <div class="contentBox">
            <draggable class="dragBox" @change="putOption['pastParticiple'] = !putOption['pastParticiple']" v-model="answer.pastParticiple" v-bind="getPPOption">
              <q-card class="col-xs-5 col-md-5 draggableItem" outlined rounded v-for="(item, index) in answer.pastParticiple" :key="index"> {{item.name}}
                {{item}}
              </q-card>
            </draggable>
          </div>
        </div>
      </div>
      <!--------------------------------------------------->
      <div class="contentItem col-xs-5 col-md-5 q-my-xs">
        <div class="dragBox">Translate
          <div class="contentBox">
            <draggable class="dragBox" @change="putOption['translate'] = !putOption['translate']" v-model="answer.translate" v-bind="getTranslateOption">
              <q-card class="col-xs-5 col-md-5 draggableItem" outlined rounded v-for="(item, index) in answer.translate" :key="index"> {{item.name}}
                {{item}}
              </q-card>
            </draggable>
          </div>
        </div>
      </div>
    </div> <!--answer blank-->
    <!-------------------------------------------------------->
    <!-------------------------------------------------------->
    <q-btn @click="generateRandomWord">Next</q-btn>
    <q-separator class="col-12 q-mt-md" color="orange" inset></q-separator>
    <draggable v-model="list1" class="contentContainer col-12 row q-mt-lg justify-around" v-bind="getVariantOption" >
      <q-card v-for="(item, index) in list1" :key="index" outlined rounded class="col-xs-5 col-md-5 draggableItem" >
        {{item.name}}
      </q-card>
    </draggable>
  </div>
</template>

<script>
import verbs from '../assets/irregular-verbs'
import draggable from 'vuedraggable'
export default {
  name: 'learningPage',
  components: { draggable },
  /*
  * 1 этап - генерация случайного индекса для массива глаголов {method: generateRandomWord()}
  * 2 этап - генерация ответа для одного случайного элемента бланка
  * 3 этап - заполнение бланка ответа {data: answer}
  * 4 этап - валидация ответа
  * */
  data () {
    return {
      irregularVerbs: verbs,
      answer: { present: [], past: [], pastParticiple: [], translate: [] },
      putOption: { present: true, past: true, pastParticiple: true, translate: true },
      pullOption: { present: true, past: true, pastParticiple: true, translate: true },
      list1: [ { name: 'suka3' }, { name: 'suka2' } ]
    }
  },
  methods: {
    generateRandomWord () {
      const maxIndex = this.irregularVerbs.length - 1
      const currentItem = Math.floor(Math.random() * (maxIndex + 1))
      const types = ['present', 'past', 'pastParticiple', 'translate']
      const openedType = Math.floor(Math.random() * 4)
      this.pullOption[types[openedType]] = false
      this.putOption[types[openedType]] = false
      this.answer[types[openedType]].push(this.irregularVerbs[currentItem][types[openedType]])
      // console.log('maxIndex', maxIndex, 'currentItem', currentItem)
    }
  },
  computed: {
    getPresentOption () {
      return {
        group: {
          name: 'present',
          pull: this.putOption.present, // отдача
          put: this.putOption.present // this.enablePut  //приём
        },
        animation: 300,
        sort: false
      }
    },
    getPastOption () {
      return {
        group: {
          name: 'past',
          pull: this.putOption.past, // отдача
          put: this.putOption.past // this.enablePut  //приём
        },
        animation: 300,
        sort: false
      }
    },
    getPPOption () {
      return {
        group: {
          name: 'pastParticiple',
          pull: this.putOption.pastParticiple, // отдача
          put: this.putOption.pastParticiple // this.enablePut  //приём
        },
        animation: 300,
        sort: false
      }
    },
    getTranslateOption () {
      return {
        group: {
          name: 'translate',
          pull: this.putOption.translate, // отдача
          put: this.putOption.translate // this.enablePut  //приём
        },
        animation: 300,
        sort: false
      }
    },
    getVariantOption () {
      return {
        group: {
          name: 'variants',
          pull: true, // отдача
          put: true // this.enablePut  //приём
        },
        animation: 300,
        sort: false
      }
    }
  },
  mounted () {
    this.generateRandomWord()
  }
}

</script>

<style scoped>
  .dragBox{
    min-width: 120px;
    min-height: 40px;
  }
  .contentContainer{
    background-color: rgb(206, 206, 206);
    border-radius: 2%;
    min-width: 120px;
    min-height: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .contentItem{
    background-color: rgb(226, 226, 226);
    min-height: 40px;
    border-radius: 3%;
    text-align: center;
  }
  .contentBox{
    background-color: rgb(251, 251, 251);
    min-height: 40px;
    border-radius: 2%;
    min-width: 120px;
  }
  .draggableItem{
    background-color: rgb(255, 255, 255);
    min-height: 40px;
    border-radius: 3%;
    text-align: center;
    line-height: 40px;
  }
</style>
