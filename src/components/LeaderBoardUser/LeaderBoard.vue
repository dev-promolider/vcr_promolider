<template>
  <div class="caja container my-5 " >
    <div class="tittle card m-3 w-50 position-absolute text-center border-gradient border-gradient-green" >
      <h3 class="">RANKING</h3>
    </div>
    <div class="puntos card mt-4 border-gradient border-gradient-green p-2">
      
          <table class="table table-success  table-striped mt-5 text-center">
  <thead >
    <tr >
      <th scope="col"> <p>#</p></th>
      <th scope="col">  </th>
      <th scope="col">USUARIOS</th>
      <th scope="col">PUNTAJES</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"><p>1</p></th>
      <td></td>
      <td class="td-img d-flex justify-content-around align-items-center">
      
      <div><img src="@/assets/perfil-del-usuario.png" alt="" ></div>
      <div>Mark Otto</div>
      </td>
      <td>3000 Pts</td>
    </tr>
    <tr>
      <th scope="row"><p>2</p></th>
      <td></td>
      <td class="td-img d-flex justify-content-around align-items-center">
      
      <div><img src="@/assets/perfil-del-usuario.png" alt="" ></div>
      <div>Mark Otto</div>
      </td>
      <td>2000 Pts</td>
    </tr>
    <tr>
      <th scope="row"><p>3</p></th>
      <td > </td>
      <td class="td-img d-flex justify-content-around align-items-center">
      
      <div><img src="@/assets/perfil-del-usuario.png" alt="" ></div>
      <div>Mark Otto</div>
      </td>
      <td>1000 Pts</td>
    </tr>
  </tbody>
</table> 
          

      
    </div>
  </div>
</template>

<script>
export default {
  name: "LeaderBoard",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.caja{
  background: #9cdab6;
  border-radius: 15px;
}
.tittle{
    background: 
    linear-gradient(#9cdab6, #9cdab6) 
    padding-box,
    linear-gradient(to right, #40525d, #40525d) border-box;
  border-radius: 15px;
  border: 4px solid transparent;
    z-index: 1;
    top: 0;
    left: 25%;
}
.puntos{
    background: 
    linear-gradient(#9cdab6, #9cdab6) 
    padding-box,
    linear-gradient(to right,  #40525d, #40525d) border-box;
  border: 4px solid transparent;
  border-radius: 15px;
}
.table{
    border-radius: 25px;
}
p{
    font-size: 20px;
    margin-bottom: 0px;


}
h3{
    color:#131b1e;
    margin-bottom: 0px;

}

img{
  width: 60px
}
.td-img{
  padding:0px;
}


@media screen and(min-width:1260px){
.caja{
    width: 60%;
}

}
@media screen and(max-width:830px){
    h3{
    font-size: 25px;
    margin: 5px;
}
p{
    font-size: 15px;
}
img{
  width: 40px
}
}
@media screen and(max-width: 560px){
    h3{
    font-size: 15px;
    margin: 5px;
}
    p{
    font-size: 12px;
}
img{
  width: 20px
}
}
</style>