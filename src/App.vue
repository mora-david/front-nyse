<template>
  <div id="app">
    <div class="titulo">Verificador de Simbolos NYSE</div>
    <FormularioSymbol/>
  </div>
</template>

<script>
import FormularioSymbol from './components/FomularioSymbol.vue'
export default {
  name: 'App',
  components: {
    FormularioSymbol
  }
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


.titulo{
  font-size: 3rem;
  padding:50px
}

</style>
