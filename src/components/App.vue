<template>
  <div id="app">
    <ScoreDisplay></ScoreDisplay>
    <div class="quiz">
      <h1>Quiz questions using Vue and Vuex!</h1>
      <Questions></Questions>
    </div>
  </div>
</template>

<script>
import Questions from "/components/Questions";
import ScoreDisplay from "/components/ScoreDisplay";
export default {
  name: "App",
  components: {
    Questions,
    ScoreDisplay
  },
  mounted: function() {
    this.$store.dispatch("fetchQuestions");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.quiz {
  position:relative;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
}
</style>
