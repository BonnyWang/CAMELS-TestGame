<template>
  <span>
    <h1 v-if="finish">
      You finished
    </h1>
    <img  v-if="!finish" v-bind:src="imageUrl[current]">
    <br>
    <br>
    <button v-if="!finish" v-on:click="checkIfCorrect(1)">1</button>
    <button v-if="!finish" v-on:click="checkIfCorrect(2)">2</button>
    <button v-if="!finish" v-on:click="checkIfCorrect(3)">3</button>
    <button v-if="!finish" v-on:click="checkIfCorrect(4)">4</button>
  </span>
</template>

<script>
import {addStat, getImages} from './firebase/firebase.js'

export default {
  name: 'App',
  data: function(){
    return{
      imageUrl:[],
      trueIndex:[],

      // to record which image are we at now
      current:0,
      finish:false
    }
  },
  methods: {
    checkIfCorrect(optionIndex){
      // if reach end of the database show finished
      if(this.current >= this.trueIndex.length-1){
        this.finish = true;
      }

      // Check if answer is right and add to Database
      if(optionIndex == this.trueIndex[this.current]){
        console.log("you are right!");
        addStat(true);
        this.current = this.current + 1;
      }else{
        addStat(false);
        this.current = this.current + 1;
      }
    }
  },
  mounted: function() {
    getImages(this.imageUrl, this.trueIndex)


  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1{
  color:white;
}

img {
  width: 30%;
}

body{
    background: black;
}

button{
  margin: 10px auto 10px auto;
  align-content: center;
  display: block;
  font-size: 20px;
  background: none;
  color: white;
  border: white 3px solid;
}

button:hover{
  border: none;
}

button:active{
  color: red;
}

</style>
