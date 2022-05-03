<template>
  <main>
    <vue-horizontal class="horizontal"
      >
      <section class="item" v-for="course in courses" :key="course.id">
        <div class="card" @click="editar(course.id)">
          <div
              class="image"
              :style="{ background: `url(${course.url_portada})` }"
            ></div>
          <div class="content">
            <p class="m-0 name text-left">
              {{ course.title }}
            </p>
            <p class="m-0 title text-left">
              {{ course.name }}
            </p>
            <div class="date">
              <p class="m-0 money text-left">{{ course.price }} S/</p>
            </div>
          </div>
        </div>
      </section>
    </vue-horizontal>
  </main>
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

<!-- Content Design -->
<style scoped>
/*---------------------------*/
.card {
  overflow: hidden;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 2px 2px 10px rgba(47, 47, 47, 0.144);
  transition: 1s;  
}
.card:hover{
  transform: scale(1.04);
}
.image {
  min-height: 150px;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}

.content {
  padding: 12px 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* background: rgba(175, 175, 175, 0.256); */
  transition: 1s;
}
.content:hover {
  cursor: pointer;
  background: #fff;
  transition: 0.8s;
}

.name {
  margin-left: 4px;
  font-size: 18px;
  font-weight: 700;
  line-height: 15px;
}

.title {
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 15px;
  margin-bottom: 8px;
  color: #C4C4C4;
  line-clamp: 2;
  overflow: hidden;
}

.date {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
}
.money{
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  color: #000
}
</style>

<!-- Parent CSS (Container) -->
<style scoped>
.header {
  margin-bottom: 16px;
}

main {
  padding: 12px;
  width: 100%;
  margin: auto;
}

@media (min-width: 768px) {
  main {
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
  }
}
@media screen and (min-width: 320px) and (max-width: 620px) {
  main {
    width: 100%;
  }
}
</style>

<!-- Responsive Breakpoints -->
<style scoped>
.horizontal {
  --fixed: 260px;
  --count: 1;
  --gap: 12px;
  --margin: 24px;
}

@media (min-width: 580px) {
  .horizontal {
    --count: 2.5;
  }
}
@media (min-width: 768px) {
  .horizontal {
    --count: 2.3;
    --margin: 0;
    max-width: 100vw;
  }
}

@media (min-width: 1024px) {
  .horizontal {
    --count: 3;
    max-width: 78vw;
  }
}
@media (min-width: 1122px) {
  .horizontal {
    --count: 3;
    max-width: 80vw;
  }
}

@media (min-width: 1280px) {
  .horizontal {
    --gap: 24px;
    --count: 4;
    max-width: 84vw;
  }
}

@media (min-width: 1536px) {
  .horizontal {
    --count: 5;
  }
}
</style>

<!--
## Responsive Logic
The margin removes the padding from the parent container and add it into vue-horizontal.
If the gap is less than margin, this causes overflow to show and peeks into the next content for better UX.
You can replace this section entirely for basic responsive CSS logic if you don't want this "peeking" experience
for the mobile web.
Note that this responsive logic is hyper sensitive to your design choices, it's not a one size fit all solution.
var() has only 95% cross browser compatibility, you should convert it to fixed values.

There are 2 set of logic:
0-768 for peeking optimized for touch scrolling.
>768 for navigation via buttons for desktop/laptop users.
-->
<style scoped>
@media (max-width: 767.98px) {
  .item {
    width: var(--fixed);
    padding: 0 calc(var(--gap) / 2);
  }

  .item:first-child {
    width: calc(var(--fixed) + var(--margin) - (var(--gap) / 2));
    padding-left: var(--margin);
  }

  .item:last-child {
    width: calc(var(--fixed) + var(--margin) - (var(--gap) / 2));
    padding-right: var(--margin);
  }

  .item:only-child {
    width: calc(var(--fixed) + var(--margin) * 2 - var(--gap));
  }

  .horizontal {
    margin: 0 calc(var(--margin) * -1);
  }

  .horizontal >>> .v-hl-container {
    scroll-padding: 0 calc(var(--margin) - (var(--gap) / 2));
  }

  .horizontal >>> .v-hl-btn {
    display: none;
  }
}

@media (min-width: 768px) {
  .item {
    width: calc((100% - ((var(--count) - 1) * var(--gap))) / var(--count));
    margin-right: var(--gap);
    max-height: 275px;
  }
}
</style>