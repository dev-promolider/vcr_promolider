<template>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">Progreso del Curso</v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="text-center">
              <v-col
                v-for="(modulo, index) in modulos"
                :key="index"
                class="d-flex flex-column align-center"
              >
                <v-avatar
                  size="32"
                  class="mb-2"
                  :color="modulo.completado ? 'green' : 'grey'"
                >
                  <v-icon>{{ modulo.completado ? 'mdi-check' : 'mdi-minus' }}</v-icon>
                </v-avatar>
                <div>{{ modulo.nombre }}</div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      modulos: {
        type: Array,
        default: () => [],
      },
    },
  };
  </script>
  
  <style scoped>
  /* Puedes añadir estilos adicionales aquí si es necesario */
  </style>
  