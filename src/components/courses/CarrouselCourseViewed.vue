<template>
  <main class="mb-4" :class="lastCourses.length > 0 ? 'main-content':'main-none'">
    <h5 class="col font-weight-bold mb-4">
      {{ nameUser }}, continua aprendiendo
    </h5>
    <vue-horizontal class="horizontal"
      >.
      <section class="item" v-for="course in lastCourses" :key="course.id">
        <div
          class="card"
        >
          <div class="content">
            <p class="m-0 card-title font-weight-bolder text-justify">
              {{ course.title }}
            </p>
            <ul class="modules">
              <li>
                <img src="@/assets/list-disc.svg" alt="" /> Moódulo 2 - Clase 4
              </li>
            </ul>
          </div>
         <div class="btn-course">
            <button @click="classvideo()"
            >Continua el curso</button>
          </div>
        </div>
      </section>
    </vue-horizontal>
  </main>
</template>

<script>
// For convenience sake, I import a collection of images from unsplash.

export default {
  name: "CarrouselCourseViewed",
  data() {
    return {
      nameUser: localStorage.getItem("name_user"),
      lastCourses: [],
      peeked: false,
      timeout: null,
      baseURL: "http://promolider.xyz/storage/",
    };
  },
  // props: {
  //   courses: {
  //     type: Array,
  //   },
  // },
  methods: {
    getAttributes() {
      this.axios.get("course/last-courses-rep").then((datos) => {
        this.lastCourses = this.filterCourseInactive(datos.data.data);
        console.log(this.lastCourses);
      });
    },
    filterCourseInactive(data) {
      var courseFilter = data.filter((course) => {
        return course.status != 0;
      });

      return courseFilter;
    },
    classvideo() {
      this.$router.push(`/course-user?course=${5}&class=${'Que es Laravel'}`) 
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<!-- Content Design -->
<style scoped>
.main-none{
  display: none;
}
/*---------------------------*/
.card {
  cursor: none;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #efefef;
  min-height: 148px;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 12px 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  transition: 1s;
}
.content:hover {
  cursor: pointer;
  background: #fff;
  transition: 0.8s;
}
.content p {
  text-align: start;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #000;
}
.modules li {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  list-style: none;
}
.btn-course{
  display: flex;
  justify-content: flex-end;
  height: 30px;
  margin: 0  10px 0 0;
}
.btn-course button {
  font-style: normal;
  font-weight: 300;
  font-size: 9px;
  line-height: 11px;
  border: none;
  color: #fff;
  display: grid;
  place-content: center;
  width: 90.81px;
  height: 18.56px;
  background: linear-gradient(181.51deg, #5cc151 -146.2%, #97f18d 98.72%);
  border-radius: 15px;
}
</style>

<!-- Parent CSS (Container) -->
<style scoped>
.header {
  margin-bottom: 16px;
}

.main-content {
  padding: 24px;
  width: 95%;
  margin: auto;
}

@media (min-width: 768px) {
  .main-content{
    padding: 48px 5px;
    display: flex;
    flex-direction: column;
  }
}
@media screen and (min-width: 320px) and (max-width: 620px) {
  .main-content {
    width: 90%;
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

@media (min-width: 768px) {
  .horizontal {
    --count: 3;
    --margin: 0;
  }
}

@media (min-width: 1024px) {
  .horizontal {
    --count: 3;
  }
}

@media (min-width: 1280px) {
  .horizontal {
    --gap: 24px;
    --count: 4;
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
  }
}
</style>