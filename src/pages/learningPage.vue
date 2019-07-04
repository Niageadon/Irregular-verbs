<template>
  <div class="row justify-center row" >
    <div class=" contentContainer row col-xs-12 col-sm-9  justify-around q-mx-auto ">
      <div class="contentItem col-5 q-my-xs"
            :class="{success: (answerValidation.present && answerValidation.validationDone),
            fail: (!answerValidation.present && answerValidation.validationDone)}">
        <div class="dragBox">Present
          <div class="contentBox">
            <draggable @change="putOption['present'] = !putOption['present']" class="dragBox" v-bind="getPresentOption" v-model="userAnswer.present">
              <q-card class="col-xs-5 col-md-5 noSelect draggableItem" outlined rounded v-for="(item, index) in userAnswer.present" :key="index"> {{item.name}}
                {{item}}
                <q-popup-proxy v-if="answerValidation.validationDone && !answerValidation.present" transition-show="flip-up" transition-hide="flip-down">
                  <q-banner class="bg-info text-white">
                    <template v-slot:avatar>
                      <q-icon name="info"></q-icon>
                    </template>
                    Correct answer is: {{correctAnswer.present}}
                  </q-banner>
                </q-popup-proxy>
              </q-card>
            </draggable>
          </div>
        </div>
      </div>
      <!--------------------------------------------------->
      <div class="contentItem col-5 q-my-xs"
           :class="{success: (answerValidation.past && answerValidation.validationDone),
            fail: (!answerValidation.past && answerValidation.validationDone)}">
        <div class="dragBox" >Past
          <div class="contentBox">
            <draggable class="dragBox" @change="putOption['past'] = !putOption['past']" v-model="userAnswer.past" v-bind="getPastOption">
              <q-card class="col-xs-5 col-md-5 noSelect draggableItem" outlined rounded v-for="(item, index) in userAnswer.past" :key="index"> {{item.name}}
              {{item}}
                <q-popup-proxy v-if="answerValidation.validationDone && !answerValidation.past" transition-show="flip-up" transition-hide="flip-down">
                  <q-banner class="bg-info text-white">
                    <template v-slot:avatar>
                      <q-icon name="info"></q-icon>
                    </template>
                    Correct answer is: {{correctAnswer.past}}
                  </q-banner>
                </q-popup-proxy>
              </q-card>
            </draggable>
          </div>
        </div>
      </div>
      <!--------------------------------------------------->
      <div class="contentItem col-5 q-my-xs"
           :class="{success: (answerValidation.pastParticiple && answerValidation.validationDone),
            fail: (!answerValidation.pastParticiple && answerValidation.validationDone)}">
        <div class="dragBox" >Participle
          <div class="contentBox">
            <draggable class="dragBox" @change="putOption['pastParticiple'] = !putOption['pastParticiple']" v-model="userAnswer.pastParticiple" v-bind="getPPOption">
              <q-card class="col-xs-5 col-md-5 noSelect draggableItem" outlined rounded v-for="(item, index) in userAnswer.pastParticiple" :key="index"> {{item.name}}
                {{item}}
                <q-popup-proxy v-if="answerValidation.validationDone && !answerValidation.pastParticiple" transition-show="flip-up" transition-hide="flip-down">
                  <q-banner class="bg-info text-white">
                    <template v-slot:avatar>
                      <q-icon name="info"></q-icon>
                    </template>
                    Correct answer is: {{correctAnswer.pastParticiple}}
                  </q-banner>
                </q-popup-proxy>
              </q-card>
            </draggable>
          </div>
        </div>
      </div>
      <!--------------------------------------------------->
      <div class="contentItem col-5 q-my-xs"
           :class="{success: (answerValidation.translate && answerValidation.validationDone),
            fail: (!answerValidation.translate && answerValidation.validationDone)}">
        <div class="dragBox">Translate
          <div class="contentBox">
            <draggable class="dragBox" @change="putOption['translate'] = !putOption['translate']" v-model="userAnswer.translate" v-bind="getTranslateOption">
              <q-card class="col-xs-5 col-md-5 noSelect draggableItem" outlined rounded v-for="(item, index) in userAnswer.translate" :key="index"> {{item.name}}
                {{item}}
                <q-popup-proxy v-if="answerValidation.validationDone && !answerValidation.translate" transition-show="flip-up" transition-hide="flip-down">
                  <q-banner class="bg-info text-white">
                    <template v-slot:avatar>
                      <q-icon name="info"></q-icon>
                    </template>
                    Correct answer is: {{correctAnswer.translate}}
                  </q-banner>
                </q-popup-proxy>
              </q-card>
            </draggable>
          </div>
        </div>
      </div>
    </div> <!--userAnswer blank-->
    <!-------------------------------------------------------->
    <!-------------------------------------------------------->
    <div class="col-xs-12 col-sm-9  justify-around row ">
    <q-btn @click="validateAnswer" :disable="answerValidation.validationDone" class="q-mt-md col-5 q-mx-sm">{{buttonMode}}</q-btn>
    <q-btn @click="nextWord" :disable="!answerValidation.validationDone" class="q-mt-md col-5 q-mx-sm">Next</q-btn>
    </div>
    <!-------------------------------------------------------->
    <draggable v-model="variantsToChose" class="variantsContainer row col-sm-9 col-xs-12  q-mt-lg justify-around" v-bind="getVariantOption" >
      <q-card v-for="(item, index) in variantsToChose" :key="index" outlined rounded class="col-xs-5 col-md-5 q-my-xs noSelect draggableItem" >
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
  * 3 этап - заполнение бланка ответа {data: userAnswer}
  * 4 этап - валидация ответа
  * */
  data () {
    return {
      irregularVerbs: verbs,
      userAnswer: { present: [], past: [], pastParticiple: [], translate: [] },
      putOption: { present: true, past: true, pastParticiple: true, translate: true },
      pullOption: { present: true, past: true, pastParticiple: true, translate: true },
      variantsToChose: [],
      correctAnswer: {},
      answerValidation: { present: false, past: false, pastParticiple: false, translate: false, validationDone: false },
      buttonMode: 'Validate'
    }
  },
  methods: {
    generateRandomWord () {
      const maxIndex = this.irregularVerbs.length - 1
      const currentItem = Math.floor(Math.random() * (maxIndex + 1))
      const types = ['present', 'past', 'pastParticiple', 'translate']
      const openedType = Math.floor(Math.random() * 4)
      this.correctAnswer = this.irregularVerbs[currentItem]
      this.pullOption[types[openedType]] = false
      this.putOption[types[openedType]] = false
      this.userAnswer[types[openedType]].push(this.irregularVerbs[currentItem][types[openedType]])
      this.variantsToChose.push(...this.getVariantsForAnswer(maxIndex, currentItem))
      this.variantsToChose.sort(this.compareRandom)
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
      for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * (maxIndex + 1))
        if (random === currentItem) { i--; continue }
        if ((i > 0) && (index[i] === index[i - 1])) { i--; continue }
        if ((i > 1) && (index[i] === index[i - 1]) && (index[i] === index[i - 2])) { i--; continue }
        index.push(random)
      }
      subItems.push(this.irregularVerbs[index[0]].translate)
      subItems.push(this.irregularVerbs[index[1]].translate)
      subItems.push(this.irregularVerbs[index[2]].translate)
      return subItems
    },
    compareRandom (a, b) {
      return Math.random() - 0.5
    },
    validateAnswer () {
      if (!this.answerNotNull) return // выходим из функции если ответы не заполнены
      this.pullOption = { present: false, past: false, pastParticiple: false, translate: false } // запрещаем перемещение элементов
      //
      let userAnswer = this.userAnswer
      let correctAnswer = this.correctAnswer
      this.answerValidation.present = (userAnswer.present[0] === correctAnswer.present)
      this.answerValidation.past = (userAnswer.past[0] === correctAnswer.past)
      this.answerValidation.pastParticiple = (userAnswer.pastParticiple[0] === correctAnswer.pastParticiple)
      this.answerValidation.translate = (userAnswer.translate[0] === correctAnswer.translate)
      this.answerValidation.validationDone = true
    },
    nextWord () {
      this.userAnswer = { present: [], past: [], pastParticiple: [], translate: [] }
      this.answerValidation = { present: false, past: false, pastParticiple: false, translate: false, validationDone: false }
      this.putOption = { present: true, past: true, pastParticiple: true, translate: true }
      this.pullOption = { present: true, past: true, pastParticiple: true, translate: true }
      this.correctAnswer = {}
      this.variantsToChose = []
      this.buttonMode = 'Validate'
      //
      this.generateRandomWord()
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
    },
    answerNotNull () {
      // используется для валидироания, на предмет наличия ответов
      let answer = []
      answer.push(this.userAnswer.present.length)
      answer.push(this.userAnswer.past.length)
      answer.push(this.userAnswer.pastParticiple.length)
      answer.push(this.userAnswer.translate.length)
      let validate = 0
      answer.forEach(element => {
        if (element === 1) validate++
      })
      return (validate === 4)
    }
  },
  mounted () {
    this.generateRandomWord()
  }
}
</script>

<style scoped>
  .dragBox{
    min-width: 100px;
    min-height: 40px;
  }
  .contentContainer{
    background: #E8DA96;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #E8DA96, #7A6EA0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #7A6EA0, #E8DA96); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 25px;
    min-width: 100px;
    min-height: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .variantsContainer{
    background: #7A6EA0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #7A6EA0, #E8DA96);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #7A6EA0, #E8DA96); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    opacity: .8;
    border-radius: 25px;
    min-width: 100px;
    min-height: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .contentItem{
    background-color: rgb(226, 226, 226);
    min-height: 40px;
    border-radius: 15px;
    text-align: center;
  }
  .contentItem.fail{
    background-color: #98353D;
    transition: 0.8s;
  }
  .contentItem.success{
    background-color: #39812D;
    transition: 0.8s;
  }
  .contentBox{
    background-color: rgb(251, 251, 251);
    min-height: 40px;
    border-radius: 5px;
    min-width: 100px;
  }
  .draggableItem{
    background-color: rgb(255, 255, 255);
    min-height: 40px;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;

  }
  .noSelect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .von{
    margin-left: auto;
    margin-right: auto;
  }
</style>
