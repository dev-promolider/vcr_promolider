<template>
  <!-- Componente de los mensajes del productor -->
  <b-card title="Mensajes">
    <div>
      <div class="card d-flex flex-row">
        <img
          src="https://placekitten.com/600/300/?image=25"
          style="width: 23%"
        />
        <div class="card-body">
          <h6 class="card-title">Nombre del usuario</h6>
          Contenido del mensaje
        </div>
      </div>
    </div>
  </b-card>
</template>
<script>
export default {
  name: "MessengerColletion",
};
</script>
