<template>
  <div>
    <div class="d-flex">
      <div class="contenido ml-4">
        <p class="ml-5 mt-2 mb-1 text-left" style="width: 200px">
          FILTRAR SUSCRIPCIONES
        </p>
        <div class="mostrar px-4 py-4">
          <b-list-group style="max-width: 100%">
            <b-list-group-item class="d-flex align-items-center border-0">
              <b-avatar
                variant="info"
                src="https://placekitten.com/300/300"
                class="mr-3"
              ></b-avatar>
              <span class="mr-auto">Lorem ipsum </span>
            </b-list-group-item>
          </b-list-group>

          <b-list-group style="max-width: 100%">
            <b-list-group-item class="d-flex align-items-center border-0">
              <b-avatar
                variant="info"
                src="https://placekitten.com/300/300"
                class="mr-3"
              ></b-avatar>
              <span class="mr-auto">Lorem ipsum </span>
            </b-list-group-item>
          </b-list-group>

          <b-list-group style="max-width: 100%">
            <b-list-group-item class="d-flex align-items-center border-0">
              <b-avatar
                variant="info"
                src="https://placekitten.com/300/300"
                class="mr-3"
              ></b-avatar>
              <span class="mr-auto">Lorem ipsum </span>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>

      <div class="w-100 mr-5 overflow-hidden">
        <p class="ml-5 mt-2 mb-1 text-left sus">SUSCRIPCIONES</p>
        <div class="w-100 ml-4 mr-5 bg-white h-100">
          <div class="d-flex container">
            <div class="cursos ml-5 mt-4">
              <div class="w-100">
                <img class="border-0" src="@/assets/welcome1.jpg" alt="" />

                <p class="px-5 py-1 mt-3 letra">Como tocar guitarra</p>

                <p class="px-4 texto text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolore, assumenda autem fugit molestias recusandae neque
                  natus, voluptate officiis .
                </p>
                <div class="mt-4 baja mr-0 ml-0 d-flex">
                  <b-avatar
                    variant="info"
                    src="https://placekitten.com/300/300"
                    class="mr-3 ml-4 mt-3"
                  ></b-avatar>
                  <p class="mt-4">Lorem ipsum</p>
                  <p class="mt-4 ml-5">S/125.3</p>
                </div>
              </div>
            </div>
            <div class="cursos ml-5 mt-4">
              <div class="w-100">
                <img class="border-0" src="@/assets/welcome1.jpg" alt="" />

                <p class="px-5 py-1 mt-3 letra">Como tocar guitarra</p>

                <p class="px-4 texto text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolore, assumenda autem fugit molestias recusandae neque
                  natus, voluptate officiis .
                </p>
                <div class="mt-4 baja mr-0 ml-0 d-flex">
                  <b-avatar
                    variant="info"
                    src="https://placekitten.com/300/300"
                    class="mr-3 ml-4 mt-3"
                  ></b-avatar>
                  <p class="mt-4">Lorem ipsum</p>
                  <p class="mt-4 ml-5">S/125.3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Eliminar from "@/views/content/contenedor/Contenedor.vue"
export default {
  name: "VirtualClassroomSuscription",
  components: {
    // Eliminar,
  },
  data() {
    return { 
      infomacion:[]
    };
  },

  mounted() {},

  methods: {
 getAttributes() {
     this.axios.get("course/purchased-courses").then((datos) => {
       
         this.infomacion =datos.data.data;
         console.log(this.infomacion)
        });
  },




  },

created() {
  this.getAttributes();
},

};
</script>

<style lang="scss" scoped>
.contenido {
  width: 40%;
  height: 75vh;
}
.mostrar {
  width: 80%;
  height: 85%;
  left: 315px;
  top: 181px;
  margin: auto;
  background: #ffffff;
  border: 0.5px solid #97f18d;
  box-sizing: border-box;
  border-radius: 15px;
}
.cursos {
  width: 293px;
  height: 82%;
  left: 697px;
  top: 220px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  border-radius: 0px 0px 15px 15px;
  background: #ffffff;
  overflow: none;
}
.cursos img {
  width: 100%;
  height: 191px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  border-radius: 15px 15px 0px 0px;
}
.letra {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
}
.sus {
  background: #f5f3f3;
}
.texto {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 15px;

  color: #494949;
}
.baja {
  border-top: 1px solid blanchedalmond;
  width: 100%;
  border-radius: 0px 0px 15px 15px;
  height: 12%;
}
</style>
