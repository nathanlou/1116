<template>
  <div>

   <div>
      <img src="../../assets/img/role.png"  class="pcImg"/>
      <img src="../../assets/img/role_mini.png"  class="miniImg"/>
   </div>
</div>

</template>

<script>
  export default {
      data() {
          return {
             imgURL:"../../assets/img/role.png"
          }
        }
    }
</script>

<style>
    .miniImg{
      display: none;
      width: 80%;
      height: 100%;
      margin-top: -2.5rem;
    }
    @media screen and (max-width: 1024px) {
        .pcImg{
            display: none;
        }
        .miniImg{
          display: block;
        }


    }
</style>
