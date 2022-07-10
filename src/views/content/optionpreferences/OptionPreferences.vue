<template>
  <div class="section-option-preferences">
    <div class="contenedor">
      <div v-if="isLoading">
        <h4 class="title-preference">
          Seleccione sus categorías
          <i id="tooltip-target-1" class="fas fa-info-circle pointer"></i>
          <b-tooltip
            placement="right"
            target="tooltip-target-1"
            triggers="hover"
          >
            Obtenga recomendaciones personalizadas.</b-tooltip
          >
        </h4>
        <div class="contenedor-preferences">
          <div
            class="preferences"
            :class="[{ opacity: preference.selected }]"
            v-for="preference in preferences"
            :key="preference.id"
            @click="editPreference(preference)"
          >
            <i :class="preference.icon"></i>
            <div class="name-preference">{{ preference.name }}</div>
          </div>
        </div>
        <div class="button-preferences">
          <button class="btn button-add" @click="addPreferences">
            Guardar
          </button>
        </div>
      </div>
      <b-spinner
        class="loading"
        label="Spinning"
        type="grow"
        v-else
      ></b-spinner>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      preferences: [],
      list: [],
      formData: [],
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
      if (this.list.length >= 3) {
        let preferences = { categorys: this.list };
        const resp = await this.axios.post("/preferences/add", preferences);
        if (resp.status === 200) {
          this.makeToast("success", "Categoria Guardada");
        } else {
          this.makeToast("danger", "Error al guardar");
        }
      } else {
        this.makeToast("danger", "Mínimo 3 categorias");
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
    setPreferencesList() {
      this.list = [];
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
.pointer {
  cursor: pointer;
}
.btn {
  border-radius: 2rem;
}
.btn-light {
  background-color: #131b1e;
  color: white;
}
.btn-light:hover {
  background-color: #131b1e;
  color: white;
}
.title-preference {
  padding: 20px 0;
  font-weight: bold;
}
.loading {
  margin-top: 200px;
  font-size: 50px;
  width: 80px;
  height: 80px;
}
.contenedor {
  width: 100%;
  max-width: 1200px;
  text-align: center;
  margin: 0 auto;
}
.contenedor-preferences {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  overflow: scroll;
}

.preferences {
  padding: 0 auto;
  margin: 15px;
  width: 120px;
  text-align: center;
  color: #5dd04e;
  cursor: pointer;
}
.preferences:hover {
  animation: temblar 3s 3.5 alternate;
}
.button-add {
  background: #131b1e;
  margin: 1rem;
  width: 150px;
  color: #efefef;
}
.button-add:hover {
  background: #192327;
  color: #efefef;
}
.button-preferences {
  text-align: end;
}
.opacity {
  opacity: 0.25;
  color: black;
}
.preferences i {
  font-size: 55px;
}
.name-preference {
  font-size: 20px;
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
.tooltip {
  position: relative;
  height: 100px;
}
</style>
