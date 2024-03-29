<template>
  <div class="questionsAsker" v-if="currentQuestionData">
    <h2>Question: {{currentQuestionNumber}}/{{totalQuestions}}</h2>
    <button
      v-if="currentQuestionNumber < totalQuestions && showAnswer"
      @click="nextQuestion" data-text="Next Question"
      ref="nextButton"
    >Next Question</button>
    <h3 v-html="currentQuestionData.question"></h3>
    <ul class="answers">
      <li
        v-for="(answer, index) in answers"
        :key="index"
        @click="showCorrectAnswers(index, answer.correct)"
        @keypress.enter="showCorrectAnswers(index, answer.correct, true)"
        @keypress.space="showCorrectAnswers(index, answer.correct, true)"
        :class="{highlight: answer.correct && showAnswer, selected: index == selectedAnswerIndex}"
        :tabindex="showAnswer ? -1 : 0"
      >
        <span v-html="answer.answer"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default {
  name: "Questions",
  computed: {
    ...mapState(["questions"]),
    ...mapGetters([
      "totalQuestions",
      "questionByIndex",
      "currentQuestionIndex",
      "showAnswer",
      "selectedAnswerIndex",
    ]),
    currentQuestionNumber() {
      return this.currentQuestionIndex + 1;
    },
    currentQuestionData() {
      return this.questionByIndex(this.currentQuestionIndex);
    },
    answers() {
      const correct_answer = {
        answer: this.currentQuestionData.correct_answer,
        correct: true
      };
      const incorrect_answers = this.currentQuestionData.incorrect_answers.map(
        answer => {
          return {
            answer,
            correct: false
          };
        }
      );
      return shuffleArray([...incorrect_answers, correct_answer]);
    }
  },
  methods: {
    ...mapMutations(["updateScore", "nextQuestion", "setShowAnswer", "setSelectedAnswer"]),
    ...mapActions(["endGame"]),
    showCorrectAnswers(index, isCorrect, focusNext) {
      if (isCorrect) {
        this.updateScore();
      }
      this.setSelectedAnswer(index);
      this.setShowAnswer();
      if (this.currentQuestionNumber === this.totalQuestions) {
        this.endGame();
        return
      }
      if (focusNext) {
        this.$nextTick(function() {
          this.$refs.nextButton.focus();
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.answers {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    width: 80%;
    margin: 0 auto 10px auto;
    padding: 0.5em;
    color: peru;
    background-color: papayawhip;
    cursor: pointer;
    padding: 0.6em;
    transform: skew(-14deg, 0deg);
    &.highlight {
      background-color: rebeccapurple;
      color: white;
    }
    &.selected {
      outline: 2px solid rebeccapurple;
    }
    span {
      display: inline-block;
      transform: skew(14deg, 0deg);
    }
  }
}
</style>
