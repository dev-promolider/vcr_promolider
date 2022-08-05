<template>
  <div style="min-height: 100vh">
    
    <section-title title="Mis preferencias" />

    <div class="row p-5" v-if="isLoading">
      <div
        class="col-md-2 text-center preference"
        :class="[{ opacity: preference.selected }]"
        v-for="preference in preferences"
        :key="preference.id"
        @click="editPreference(preference)"
      >
        <i :class="preference.icon" style="font-size: 2.5em"></i>
        <p>{{ preference.name }}</p>
      </div>
      <div class="col-md-12 text-right">
        <button class="btn btn-success" @click="addPreferences">Guardar</button>
      </div>
    </div>
    <div v-else>
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-skeleton-loader
              type="card"
              class="mx-auto"
              max-width="300"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="3">
            <v-skeleton-loader
              type="card"
              class="mx-auto"
              max-width="300"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="3">
            <v-skeleton-loader
              type="card"
              class="mx-auto"
              max-width="300"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="3">
            <v-skeleton-loader
              type="card"
              class="mx-auto"
              max-width="300"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-skeleton-loader
              type="card"
              class="mx-auto"
              max-width="300"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="3">
            <v-skeleton-loader
              type="card"
              class="mx-auto"
              max-width="300"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="3">
            <v-skeleton-loader
              type="card"
              class="mx-auto"
              max-width="300"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="3">
            <v-skeleton-loader
              type="card"
              class="mx-auto"
              max-width="300"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import SectionTitle from '../../../components/Navbar/SectionTitle.vue';
export default {
  name: "Preferences",
  components: {
    SectionTitle,
  },

  data() {
    return {
      preferences: [],
      list: [],
      formData: [],
      list_init: [],
      isLoading: false,
    };
  },
  updated() {},
  created() {
    this.setPreferencesList();
    this.listPreferences();
  },
  methods: {
    async listPreferences() {
      const resp = await this.axios.get("category/list");

      if (resp.status == 200) {
        const { data } = resp.data;
        const preferences = this.setSelected(data);
        this.preferences = preferences;
        this.isLoading = true;
      }
    },
    editPreference(preferences) {
      preferences.selected = !preferences.selected;
      if (!this.list.includes(preferences.id)) {
        this.list.push(preferences.id);
      } else {
        const catg = this.list.indexOf(preferences.id);
        this.list.splice(catg, 1);
      }
    },
    async addPreferences() {
      let array_save = [];
      let array_delete = [];
      //LISTA PARA ELIMINAR
      this.list_init.forEach((preference) => {
        if (!this.list.includes(preference)) {
          array_delete.push(preference);
        }
      });
      //LISTA PARA GUARDAR
      this.list.forEach((preference) => {
        if (!this.list_init.includes(preference)) {
          array_save.push(preference);
        }
      });

      if (this.list.length >= 3) {
        this.isLoading = false;
        if (array_save.length != 0) {
          this.toRegister(array_save, "save");
        }
        if (array_delete.length != 0) {
          this.toRegister(array_delete, "delete");
        }
        if (array_delete.length == 0 && array_save.length == 0) {
          this.makeToast("success", "No se ha realizado ningún cambio");
        }
      } else {
        this.makeToast("danger", "Debe seleccionar como mínimo 3 categorías");
      }
    },
    async toRegister(array, accion) {
      let preferences = { categorys: array };
      const url =
        accion == "save"
          ? "/preferences/add"
          : "/preferences/delete-preferences";
      const text = accion == "save" ? "registradas" : "eliminadas";

      const resp = await this.axios.post(url, preferences);

      if (resp.status === 200) {
        this.makeToast("success", "Categorías " + text + " correctamente");
        this.setPreferencesList();
      } else {
        this.makeToast("danger", "Error al intentar registrar los cambios");
        this.setPreferencesList();
      }
    },
    setSelected(data) {
      data.forEach((preference) => {
        Vue.set(preference, "selected", true);

        this.list.forEach((list) => {
          if (list === preference.id) {
            Vue.set(preference, "selected", false);
          }
        });
      });

      return data;
    },
    async setPreferencesList() {
      const resp = await this.axios.get("preferences/show-preferences");
      if (resp.status == 200) {
        const { data } = resp.data;
        this.list = [];
        this.list_init = [];
        for (let i = 0; i < data.length; i++) {
          if (!this.list.includes(data[i].categories_id)) {
            this.list.push(data[i].categories_id);
            this.list_init.push(data[i].categories_id);
          }
        }
        this.preferences = this.setSelected(this.preferences);
        this.isLoading = true;
      }
    },
    makeToast(variant, msg) {
      this.$bvToast.toast(msg, {
        title: "Categorias",
        variant: variant,
        toaster: "b-toaster-top-center",
        solid: true,
      });
    },
  },
};
</script>

<style scoped>
.v-skeleton-loader__image {
  height: 100px;
}
.pointer {
  cursor: pointer;
}
.preference {
  color: #28c76f;
  cursor: pointer;
}
.preference:hover {
  animation: temblar 3s 3.5 alternate;
}

.opacity {
  opacity: 0.25;
  color: black;
}

@media (max-width: 768px) {
  .preferences i {
    font-size: 30px;
  }
  .contenedor {
    width: 95%;
  }
}
@keyframes temblar {
  0% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(15deg);
  }
}
/* .tooltip {
  position: relative;
  height: 100px;
} */
</style>
