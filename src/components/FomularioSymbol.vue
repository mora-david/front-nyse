<template>
<div>
<div class="mb-3">
  <label for="formGroupExampleInput" class="form-label" >Nombre de la compañía</label>
  <input minlength="5" v-model="nombre" type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label">Descripción de la compañía</label>
  <input v-model="descripcion" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
</div>
<div class="mb-3">
  <label  for="formGroupExampleInput2" class="form-label">Símbolo</label>
  <input v-model="symbol" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label">Valores de Mercado</label>
  <input v-model="valores" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
</div>
<button class="ui fluid pink button big" @click="formSubmit()">ENVIAR</button>

<div>




<div style="padding:100px">
<div>Lista de empresas registradas</div>
<table class="table">
  <thead>
    <tr>
      <th scope="col">uuid</th>
      <th scope="col">Nombre</th>
      <th scope="col">Descripción</th>
      <th scope="col">Símbolo</th>
      <th scope="col">Valores de mercado</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="empresa in empresas" :key="empresa.uuid">
      <th scope="row">{{empresa.id}}</th>
      <td>{{empresa.nombre}}</td>
      <td>{{empresa.descripcion}}</td>
      <td>{{empresa.simbolo}}</td>
      <td>{{empresa.valores_de_mercado}}</td>



    </tr>
  </tbody>
</table>

</div>
</div>

</div>
</template>


<script>
import axios from 'axios'
export default {
  data(){
    return{
      symbol:'',
      nombre:'',
      descripcion:'',
      valores:[],
      empresas:[]
    }
  },
  name: 'FormularioSymbol',
  mounted(){
    this.getEmpresas()
  },
  methods: {
      getEmpresas(){
        var url = 'https://appnyse.herokuapp.com/api/empresas/'
         axios
          //.get('/symbol/'+this.symbol.charAt(0)+'.htm',  {headers: {'Access-Control-Allow-Origin':'*'} })
          .get(url,  {headers: {'Access-Control-Allow-Origin':'*'} })
          .then(response => this.empresas = response.data)
          .catch(error => console.log(error))
          //.finally(() => this.loading = false)
      },
      formSubmit() {
        
        var valores2 = this.valores.split(',')
        console.log(valores2)

        if (this.symbol.length > 10 || this.nombre.length > 51 || this.descripcion.length > 100 || this.valores.length > 50){
          alert('formulario no valido')
          return 0
        }
        else if(this.symbol == '' || this.nombre == '' || this.descripcion == '' || this.valores == []){
          alert('los campos no pueden estar vacíos')
          return 0
        }

          //const url = 'https://www.findata.co.nz/markets/NYSE/symbols/'+this.symbol.charAt(0)+'.htm'
          const url = '/symbol'
          //.get('/symbol/'+this.symbol.charAt(0)+'.htm',  {headers: {'Access-Control-Allow-Origin':'*'} })
          axios.get(url,  {headers: {'Access-Control-Allow-Origin':'*'} })
          .then(response => {if (response.data.includes('>'+ this.symbol + '</A></td>')){alert('El simbolo es correcto')} else{alert('Simbolo no valido'); return 0}
          axios.post('https://appnyse.herokuapp.com/api/empresas/', {nombre:this.nombre, descripcion:this.descripcion, simbolo:this.symbol, valores_de_mercado:this.valores})
          .then(() => {alert('registrado')
          this.getEmpresas()
          this.symbol = ''
          this.nombre = '',
          this.symbol = ''
          this.descripcion = ''
          this.valores = []
          })
          .catch(error => alert(error))
          
          
          
          })
          //.then(response => {console.log(response.data)})
          .catch(error => console.log(error))
          //.finally(() => this.loading = false)
      }}
  
      }

</script>



<style>
input {
  border: 2px solid currentcolor;
}
input:invalid {
  border: 2px dashed red;
}
input:invalid:focus {
  background-image: linear-gradient(pink, lightgreen);
}

</style>


