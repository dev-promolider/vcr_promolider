<template>
  <main>
    <vue-horizontal class="horizontal">
      <section class="item" v-for="course in courses" :key="course.id">
          <Card :course="course" :cardType="cardType" />
      </section>
    </vue-horizontal>
  </main>
</template>

<script>
// For convenience sake, I import a collection of images from unsplash.
import Card from "@/components/courses/cards";

export default {
  name: "CarrouselCourse",
  components: {
    Card
  },
  data() {
    return {
      peeked: false,
      timeout: null,
      baseURL: "http://promolider.xyz/storage/",
      cardType: 1
    };
  },
  props: {
    courses: {
      type: Array,
    },
  },
  methods: {

  },
};
</script>


<!-- Parent CSS (Container) -->
<style scoped>
.header {
  margin-bottom: 16px;
}

.item{
  width: 335px !important;
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