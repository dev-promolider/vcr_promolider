<template>
    <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item active " role="presentation">
              <a
                class="nav-link text-center"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                >Resumen</a
              >
            </li>
            <li class="nav-item " role="presentation">
              <a
                class="nav-link text-center"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                >Recursos</a
              >
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active bg-white"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum doloribus repellendus, iste aliquam laboriosam, eos, perspiciatis illo quod ut quibusdam iusto tempore sed in doloremque dolorem amet mollitia. Fuga, ab.
            </div>
            <div
              class="tab-pane fade bg-white"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              Recursos
            </div>
          </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>