<template>
<div>
  <div class="container">
<div class="mb-3">
  <label for="formGroupExampleInput" class="form-label" >Nombre de la compañía</label>
  <input minlength="5" v-model="nombre" type="text" class="form-control" id="formGroupExampleInput" placeholder="Introduce el nombre de la compañía">
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label">Descripción de la compañía</label>
  <input v-model="descripcion" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Introduce la descripción de la compañía">
</div>
<div class="mb-3">
  <label  for="formGroupExampleInput2" class="form-label">Símbolo</label>
  <input v-model="symbol" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Introduce un Símbolo válido">
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label">Valores de Mercado</label>
  <input v-model="valores" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Introduce hasta 50 valores">
</div>
<button class="ui fluid pink button big" @click="formSubmit()">ENVIAR</button>
</div>
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
      <th scope="col">Editar</th>
      <th scope="col">Eliminar</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="empresa in empresas" :key="empresa.id">
      <th scope="row">{{empresa.id}}</th>
      <td>{{empresa.nombre}}</td>
      <td>{{empresa.descripcion}}</td>
      <td>{{empresa.simbolo}}</td>
      <td>{{empresa.valores_de_mercado}}</td>
      <td><button @click="showInfo(empresa.id)">Editar</button>
      <div class="edit-inputs" :id="'edit-div-inputs'+empresa.id">
<label for="">Nombre</label>
<input :id="'edit-nombre' + empresa.id" type="text" :value='empresa.nombre'>
<label for="">Descripción</label>
<input :id="'edit-descripcion' + empresa.id" type="text" :value="empresa.descripcion">
<label for="">Símbolo</label>
<input :id="'edit-simbolo' + empresa.id" type="text" :value="empresa.simbolo">
<label for="">Valores</label>
<input :id="'edit-valores' + empresa.id" type="text" :value="empresa.valores_de_mercado">
<button @click="putInfo(empresa.id, empresa.nombre, empresa.descripcion, empresa.simbolo, empresa.valores_de_mercado)">Actualizar</button>
      </div>
      
      </td>
      <td><button @click="deleteCompany(empresa.id)">Eliminar</button></td>
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
      deleteCompany(eluuid){
        var url = 'https://appnyse.herokuapp.com/api/empresas/' + eluuid + '/'
        axios.delete(url).then(response=>{(alert('eliminado')); this.getEmpresas(); return response}).catch(error=>alert(error))


      },
      putInfo(eluuid){
        var name = document.getElementById('edit-nombre'+eluuid).value
        var desc = document.getElementById('edit-descripcion'+eluuid).value
        var symb = document.getElementById('edit-simbolo'+eluuid).value
        var values = document.getElementById('edit-valores'+eluuid).value

        var form = {nombre:name,descripcion:desc,simbolo:symb,valores_de_mercado:values}
        var url = 'https://appnyse.herokuapp.com/api/empresas/' + eluuid + '/'
        axios.put(url, form).then(response=> {console.log(response); this.getEmpresas()}).catch(error=>console.log(error))
      },
      showInfo(eluuid){
        var element = document.getElementById('edit-div-inputs'+eluuid)
        element.classList.toggle('edit-inputs-show')
      },
      getEmpresas(){
        var url = 'https://appnyse.herokuapp.com/api/empresas/'
         axios
          //.get('/symbol/'+this.symbol.charAt(0)+'.htm',  {headers: {'Access-Control-Allow-Origin':'*'} })
          .get(url)
          //.get(url,  {headers: {'Access-Control-Allow-Origin': '*'}})
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
          //const url = '/symbol'
          //.get('/symbol/'+this.symbol.charAt(0)+'.htm',  {headers: {'Access-Control-Allow-Origin':'*'} })
          //axios.get('https://www.findata.co.nz/markets/NYSE/symbols/'+this.symbol.charAt(0)+'.htm', {headers:{}})
          //.then(response => {if (response.data.includes('>'+ this.symbol + '</A></td>')){alert('El simbolo es correcto')} else{alert('Simbolo no valido'); return 0}
          axios.post('https://appnyse.herokuapp.com/api/empresas/', {nombre:this.nombre, descripcion:this.descripcion, simbolo:this.symbol, valores_de_mercado:this.valores})
          .then(response => {if(response.data.ok){alert('registrado')} else{alert('simbolo no válido')}
          console.log(response.data)
          this.getEmpresas()
          this.symbol = ''
          this.nombre = '',
          this.symbol = ''
          this.descripcion = ''
          this.valores = []
          })
          .catch(error => alert(error + 'verificar campos'))
          
          
          
          //})
          //.then(response => {console.log(response.data)})
          //.catch(error => console.log(error))
          //.finally(() => this.loading = false)
      }}
  
      }

</script>



<style>
body{
  background-color: peru;
}


input {
  border: 2px solid currentcolor;
}
input:invalid {
  border: 2px dashed red;
}
input:invalid:focus {
  background-image: linear-gradient(pink, lightgreen);
}
.edit-inputs{
  display: none;
}

.edit-inputs-show{
  display:block;
}


</style>


