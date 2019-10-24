import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    questions: [],
    score: 0,
    showFinal: false,
    currentQuestionIndex: 0,
    showAnswer: 0,
    selectedAnswerIndex: null,
  },
  getters: {
    totalQuestions(state) {
      return state.questions.length;
    },
    questionByIndex: state => id => {
      return state.questions[id];
    },
    currentQuestionIndex: state => state.currentQuestionIndex,
    showAnswer: state => state.showAnswer,
    selectedAnswerIndex: state => state.selectedAnswerIndex,
  },
  mutations: {
    setQuestions(state, questions) {
      state.questions = questions;
    },
    updateScore(state) {
      state.score++;
    },
    setEndGame(state, end = true) {
      state.showFinal = end;
      if (!end) {
        state.score = 0;
        state.showAnswer = false;
        state.currentQuestionIndex = 0;
        state.selectedAnswerIndex = null
      }
    },
    setShowAnswer: state => {
      state.showAnswer = true;
    },
    nextQuestion: state => {
      state.currentQuestionIndex++;
      state.showAnswer = false;
      state.selectedAnswerIndex = null
    },
    clearQuestions: state => {
      state.questions = [];
    },
    setSelectedAnswer: (state, index) => {
      state.selectedAnswerIndex = index;
    }
  },
  actions: {
    fetchQuestions(context) {
      axios
        .get("https://opentdb.com/api.php?amount=10&type=multiple")
        .then(response => {
          context.commit("setQuestions", response.data.results);
        });
    },
    endGame(context) {
      setTimeout(function() {
        context.commit("setEndGame");
      }, 1000);
    },
    reset(context) {
      context.commit("clearQuestions");
      context.dispatch("fetchQuestions");
      context.commit("setEndGame", false);
    }
  }
});

export default store;
