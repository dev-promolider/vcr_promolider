<template>
  <div class="content-comments">
    <div class="titulo d-flex">
      <img src="@/assets/comment.svg" alt="" />
      <p class="titulo-text">Comentarios</p>
    </div>
    <div class="input-comment d-flex">
      <img class="img-user" src="@/assets/logo-perfil.png" alt="" />
      <input
        type="text"
        name=""
        id=""
        placeholder="Escribe tu comentario o pregunta"
      />
    </div>
    <section class="comments d-flex">
      <img class="img-users" src="@/assets/logo-perfil.png" alt="" />
      <div class="users-comment">
        <p class="name">Daniel Rodriguez</p>
        <p class="date">Hace 2 dias</p>
        <p class="info">Cuál es el archivo mencionado en la classes , ¿FTX.wav o FTQ.wav?</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.content-comments {  width: 100%; height: 100%; padding-left: 36px;
}
.titulo{ margin-bottom: 27px; gap: 7px;}
.titulo-text{ margin: 0; font-size: 12px; font-weight: 400;}
.input-comment {  width: 100%; height: 40px; gap: 18px; margin-bottom: 26px;
}
.input-comment input{ border: none; height: 30px; font-size: 12px;
            border-bottom: 1px solid #000;  background: none;
            flex-grow: 1;
}
.img-user{ width: 37.5px; height: 37.5px; border-radius: 50%; 
}
.users-comment{ display: flex; flex-direction:column;    
}
.users-comment p{text-align: left;     
}
.name{ font-size: 11px; font-weight: bold; color: #000;
margin-bottom: 4px;
}
.date{ font-size: 9px; margin-bottom: 14px;
}
.info{ font-size: 12px; color: #000;
}
.comments {  width: 100%; height: 90px; gap: 12.26px;
}
.img-users{ width: 37.5px; height: 37.5px; border-radius: 50%;    
}
</style>