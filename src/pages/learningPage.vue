<template>
    <div class="row justify-center row" >
    <div class="q-mt-lg UserAnswers row col-xs-12 col-sm-9 q-gutter-md justify-around q-mx-auto ">
        <!--------------------------1------------------------>
        <div class="UserAnswers__answerTemplate col-5 "
            :class="{success: (answerValidation.present && answerValidation.validationDone),
            fail: (!answerValidation.present && answerValidation.validationDone)}">Present
            <draggable class="UserAnswers__dragTemplate" @change="putOption['present'] = !putOption['present']"
                       v-bind="getPresentOption" v-model="userAnswer.present">
              <!--Ответ пользователя-->
              <div @mouseover="hover.present = true" @mouseleave="hover.present = false"
                   v-bind:class="{showAnswer: (hover.present && !answerValidation.present && answerValidation.validationDone) }" class="UserAnswers__userAnswer">
                <q-card class="col-xs-5 col-md-5 noSelect draggableItem used userAnswer"
                        outlined rounded v-for="(item, index) in userAnswer.present" :key="index">
                        {{item.name}}
                        {{item}}
                  <!-- всплывающее окно при наведение на неверный ответ -->
                </q-card>
                <!--Верный ответ. Открывается при наличие ошибки и ховере на неё.-->
                <!-- v-if для того, чтобы скрыть карту до валидации. В противном случае она добавляет дополнительное поле для grad-а -->
                <q-card v-if="answerValidation.validationDone" class="col-xs-5 col-md-5 noSelect draggableItem correctAnswer">
                  Correct: {{correctAnswer.present}}
                </q-card>
              </div>
            </draggable>
          </div>
        <!--------------------------2------------------------>
        <div class="UserAnswers__answerTemplate col-5 "
           :class="{success: (answerValidation.past && answerValidation.validationDone),
            fail: (!answerValidation.past && answerValidation.validationDone)}">Past
        <draggable class="UserAnswers__dragTemplate" @change="putOption['past'] = !putOption['past']"
                   v-bind="getPastOption" v-model="userAnswer.past">
          <!--Ответ пользователя-->
          <div @mouseover="hover.past = true" @mouseleave="hover.past = false"
               v-bind:class="{showAnswer: (hover.past && !answerValidation.past  && answerValidation.validationDone) }" class="UserAnswers__userAnswer">
            <q-card class="col-xs-5 col-md-5 noSelect draggableItem used userAnswer"
                    outlined rounded v-for="(item, index) in userAnswer.past" :key="index">
              {{item.name}}
              {{item}}
              <!-- всплывающее окно при наведение на неверный ответ -->
            </q-card>
            <!--Верный ответ. Открывается при наличие ошибки и ховере на неё.-->
            <!-- v-if для того, чтобы скрыть карту до валидации. В противном случае она добавляет дополнительное поле для grad-а -->
            <q-card v-if="answerValidation.validationDone" class="col-xs-5 col-md-5 noSelect draggableItem correctAnswer">
              Correct: {{correctAnswer.past}}
            </q-card>
          </div>
        </draggable>
        </div>
        <!--------------------------3------------------------>
        <div class="UserAnswers__answerTemplate col-5 "
           :class="{success: (answerValidation.pastParticiple && answerValidation.validationDone),
            fail: (!answerValidation.pastParticiple && answerValidation.validationDone)}">pastParticiple
        <draggable class="UserAnswers__dragTemplate" @change="putOption['pastParticiple'] = !putOption['pastParticiple']"
                   v-bind="getPPOption" v-model="userAnswer.pastParticiple">
          <!--Ответ пользователя-->
          <div @mouseover="hover.pastParticiple = true" @mouseleave="hover.pastParticiple = false"
               v-bind:class="{showAnswer: (hover.pastParticiple && !answerValidation.pastParticiple && answerValidation.validationDone) }" class="UserAnswers__userAnswer">
            <q-card class="col-xs-5 col-md-5 noSelect draggableItem used userAnswer"
                    outlined rounded v-for="(item, index) in userAnswer.pastParticiple" :key="index">
              {{item.name}}
              {{item}}
              <!-- всплывающее окно при наведение на неверный ответ -->
            </q-card>
            <!--Верный ответ. Открывается при наличие ошибки и ховере на неё.-->
            <!-- v-if для того, чтобы скрыть карту до валидации. В противном случае она добавляет дополнительное поле для grad-а -->
            <q-card v-if="answerValidation.validationDone" class="col-xs-5 col-md-5 noSelect draggableItem correctAnswer">
              Correct: {{correctAnswer.pastParticiple}}
            </q-card>
          </div>
        </draggable>
        </div>
        <!--------------------------4------------------------>
    <div class="UserAnswers__answerTemplate col-5 "
           :class="{success: (answerValidation.translate && answerValidation.validationDone),
            fail: (!answerValidation.translate && answerValidation.validationDone)}">Translate
        <draggable class="UserAnswers__dragTemplate" @change="putOption['translate'] = !putOption['translate']"
                   v-bind="getTranslateOption" v-model="userAnswer.translate">
          <!--Ответ пользователя-->
          <div @mouseover="hover.translate = true" @mouseleave="hover.translate = false"
               v-bind:class="{showAnswer: (hover.translate && !answerValidation.translate && answerValidation.validationDone) }" class="UserAnswers__userAnswer">
            <q-card class="col-xs-5 col-md-5 noSelect draggableItem used userAnswer"
                    outlined rounded v-for="(item, index) in userAnswer.translate" :key="index">
                {{item.name}}
                {{item}}
              <!-- всплывающее окно при наведение на неверный ответ -->
            </q-card>
            <!--Верный ответ. Открывается при наличие ошибки и ховере на неё.-->
            <!-- v-if для того, чтобы скрыть карту до валидации. В противном случае она добавляет дополнительное поле для grad-а -->
            <q-card v-if="answerValidation.validationDone" class="col-xs-5 col-md-5 noSelect draggableItem correctAnswer">
                Correct: {{correctAnswer.translate}}
            </q-card>
          </div>
        </draggable>
      </div>
    </div> <!--userAnswer blank-->
    <!-------------------------------------------------------->
    <!----------------------buttons--------------------------->
    <div class="col-xs-12 col-sm-9  justify-around row ">
    <q-btn @click="validateAnswer" :disable="answerValidation.validationDone" style="background-color: #4da260" class="q-mt-md col-5 q-mx-sm">{{buttonMode}}</q-btn>
    <q-btn @click="nextWord" :disable="!answerValidation.validationDone" style="background-color: #4da260" class="q-mt-md col-5 q-mx-sm">Next</q-btn>
    </div>
    <!-------------------variant-answers---------------------->
    <draggable v-model="variantsToChose" class="variantsContainer q-ma-none row col-sm-9 col-xs-12 q-gutter-md  q-mt-lg justify-around" v-bind="getVariantOption" >
        <q-card v-for="(item, index) in variantsToChose" :key="index" outlined rounded class="draggableItem col-xs-5 col-md-5 noSelect q-mx-none" >
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
            hover: { present: false, past: false, pastParticiple: false, translate: false },
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
            const variants = []
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
            const subItems = []
            const index = []
            for (let i = 0; i < 3; i++) {
                const random = Math.floor(Math.random() * (maxIndex + 1))
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
            const userAnswer = this.userAnswer
            const correctAnswer = this.correctAnswer
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
            const answer = []
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

<style lang="scss">
@import "~scss/index";
</style>
