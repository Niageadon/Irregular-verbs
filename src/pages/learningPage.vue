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
        <div class="dragBox" >Participle
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
    <draggable v-model="answerVariants" class="contentContainer col-12 row q-mt-lg justify-around q-gutter-md" v-bind="getVariantOption" >
      <q-card v-for="(item, index) in answerVariants" :key="index" outlined rounded class="col-xs-5 col-md-5 draggableItem" >
        {{item}}
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
      answerVariants: []
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
      //
      this.answerVariants.push(...this.getVariantsForAnswer(maxIndex, currentItem))
      // this.answerVariants.sort(this.compareRandom)
    },
    getVariantsForAnswer (maxIndex, currentItem) {
      let variants = []
      variants.push(this.irregularVerbs[currentItem].past)
      variants.push(this.irregularVerbs[currentItem].pastParticiple)
      variants.push(this.irregularVerbs[currentItem].present)
      variants.push(this.irregularVerbs[currentItem].translate)
      variants.push(...this.irregularVerbs[currentItem].fakes)
      const randomWords = this.getTwoRandomTranslates(maxIndex, currentItem)
      variants.push(...randomWords)
      return variants
    },
    getTwoRandomTranslates (maxIndex, currentItem) {
      // функция возвращает два string-а со случайными переводами
      // если индекс совпадает с имеющимся, то результат удаляется, операция повторяется
      let subItems = []
      let index = []
      for (let i = 0; i < 2; i++) {
        let random = Math.floor(Math.random() * (maxIndex + 1))
        if (random === currentItem) { i--; continue }
        if ((i > 0) && (index[i] === index[i - 1])) { i--; continue }
        index.push(random)
      }
      subItems.push(this.irregularVerbs[index[0]].translate)
      subItems.push(this.irregularVerbs[index[1]].translate)
      return subItems
    },
    compareRandom (a, b) {
      return Math.random() - 0.5
    }
  },
  computed: {
    getPresentOption () {
      return {
        group: {
          name: 'present',
          pull: this.pullOption.present, // отдача
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
          pull: this.pullOption.past, // отдача
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
          pull: this.pullOption.pastParticiple, // отдача
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
          pull: this.pullOption.translate, // отдача
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
