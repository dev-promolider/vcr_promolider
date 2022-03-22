<template>
  <vue-horizontal responsive class="carrousel this"
    >.
    <section v-for="course in courses" :key="course.id">
      <div class="card" @click="editar(course.id)">
        <img :src="course.url_portada" class="card-img-top" alt="" />
        <div class="card-body">
          <h5 class="card-title font-weight-bolder text-justify">
            {{ course.title }}
          </h5>
          <p class="card-text text-justify">
            {{ course.description.slice(0, 50) }} ...
          </p>
          <label class="font-weight-bolder text-success price"
            >S/{{ course.price }}</label
          >
        </div>
      </div>
    </section>
  </vue-horizontal>
</template>

<script>
// For convenience sake, I import a collection of images from unsplash.

export default {
  name: "CarrouselCourse",
  data() {
    return {
      peeked: false,
      timeout: null,
      baseURL: "http://promolider.xyz/storage/",
    };
  },
  props: {
    courses: {
      type: Array,
    },
  },
  methods: {
    editar(id){
      this.$router.push('/buy-cursos/' + id)
    }
  },
};
</script>

<style scoped>
.card-body {
  position: relative;
  margin-top: -20px;
}

.card-body p {
  margin-top: -8px;
}

.card img {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.price {
  position: absolute;
  bottom: 5px;
  right: 25px;
  font-size: 20px;
}

.carrousel {
  width: 97.3%;
  margin: auto;
}

.card {
  border: none !important;
  background: transparent;
  height: 100% !important;
  width: 100% !important;
  transition: 1s;
  border-radius: 15px;
}

.card:hover {
  cursor: pointer;
  background: white;
  transition: 1s;
}

.card-img-top {
  height: 50%;
}

.this >>> .v-hl-btn {
  filter: invert(1);
}

.this >>> .v-hl-btn-next {
  transform: translateX(0);
}

.this >>> .v-hl-btn-prev {
  top: 0;
}

.this >>> .v-hl-btn-prev svg {
  margin: 0;
  padding: 4px;
  height: 30px;
  width: 30px;
}
</style>