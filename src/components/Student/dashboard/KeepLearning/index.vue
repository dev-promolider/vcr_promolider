<template>
  <div class="learning">
    <div>
        <p>Diseño de Interiores</p>
        <ul class="modules">
          <li><img src="@/assets/list-disc.svg" alt="" /> Moódulo 2 - Clase 4</li>
        </ul>
    </div>
    <div class="btn-course">
      <button>continua el curso</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeepLearning",
};
</script>

<style>
.learning {
  background: #fff;
  border-radius: 15px;
  border-color: #EFEFEF;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  padding: 40px 30px 42px 50px;
}
.learning p {
  text-align: start;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #000;
}
.modules{
    padding-left: 20px;
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
}
.btn-course button {
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  border: none;
  color: #fff;
  display: grid;
  place-content: center;
  width: 181px;
  height: 37px;
  background: linear-gradient(181.51deg, #5cc151 -146.2%, #97f18d 98.72%);
  border-radius: 15px;
}
</style>