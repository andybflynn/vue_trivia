<template>
  <div :class="['score',{final: showFinal}]">
    <div class="text">Your score: {{score}}/{{totalQuestions}}</div>
    <div v-if="showFinal">
      <button @click="reset" data-text="Reset">Reset</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "ScoreDisplay",
  computed: {
    ...mapState(["score", "showFinal"]),
    ...mapGetters(["totalQuestions"])
  },
  methods: {
    ...mapActions(["reset"])
  }
};
</script>

<style lang="scss" scoped>
.score {
  position: fixed;
  z-index: 1;
  top: 1em;
  right: 1em;
  left: 65vw;
  bottom: 90vh;
  background-color: peachpuff;
  color: saddlebrown;
  padding: 0.6em;
  transform: skew(-14deg, 0deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.4s linear;
  &.final {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    transform: skew(0deg, 0deg);
    .text {
      font-size: 3em;
      transform: skew(0deg, 0deg);
    }
  }
}
.text {
  transform: skew(14deg, 0deg);
  transition: all 0.4s linear;
}
</style>
