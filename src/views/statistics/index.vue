<template>
	<div class="containD">
		<Keyboard />
	</div>
</template>

<script>
import Keyboard from '@/components/Charts/Keyboardtwo'
export default {
  name: 'Dashboard',
  components: {  Keyboard },
  data() {
    return {
    }
  },
  computed: {

  },
  mounted() {
  },
  created() {
  },
  methods: {
  }
}
</script>
<style>
  .containD{
    width: 99%;
    margin-left: 1%;
    margin-right: 2%;
    margin-top: -1%;
    color: gray;
  }
  @media screen and (max-width: 1024px) {
  .containD{
    width: 99%;
    margin-left: 1%;
    margin-right: 2%;
    margin-top: -2%;
    color: gray;
  }
  }
</style>
