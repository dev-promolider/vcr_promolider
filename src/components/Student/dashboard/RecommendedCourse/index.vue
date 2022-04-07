<template>
  <div class="content-courses-recommend">
    <p class="title-recommend">Curso Recomendados</p>
    <vue-horizontal class="carrousel this">
      <div class="item-course">
        <img src="@/assets/cursos.jpg" alt="" />
        <div class="card-body">
          <h6>Curso de Ilustración</h6>
          <p>Lorem ipsum dolor sit</p>
        </div>        
      </div>
      <div class="item-course">
        <img src="@/assets/cursos.jpg" alt="" />
        <div class="card-body">
          <h6>Curso de Ilustración</h6>
          <p>Lorem ipsum dolor s</p>
        </div>        
      </div>
      <div class="item-course">
        <img src="@/assets/cursos.jpg" alt="" />
        <div class="card-body">
          <h6>Curso de Ilustración</h6>
          <p>Lorem ipsum dolor</p>
        </div> 
      </div>
    </vue-horizontal>
  </div>
</template>

<script>
export default {
  name: "RecommendedCourse",
};
</script>

<style scoped>
.content-courses-recommend {
    display: flex;
    flex-direction: column;
    padding: 40px 70px 0px 100px;
    gap: 35px;
}
.title-recommend{
    margin: 0;
}
.item-course {
  height: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  /* padding: 16px 24px; */
  background: #ffffff;
  margin-right: 20px;
}
.item-course img{
    width: 100%;
    height: 180px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
/* .carrousel {
    margin: auto;
    width: 90%;
} */
.this >>> .v-hl-btn {
  filter: invert(1);
}
.this >>> .v-hl-btn-next {
  transform: translateX(0);
}
.this >>> .v-hl-btn-prev {
  top: 0;
}
/* .this >>> .v-hl-btn-prev svg {
  margin: 0;
  padding: 4px;
  height: 30px;
  width: 30px;
} */
@media (max-width:576px){
    .content-courses-recommend{
        padding-left: 22px;
        padding-right: 22px;
    }
}
</style>