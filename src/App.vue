<template>
  <q-layout class="bg" view="hhh lpR fFf" id="q-app">
    <!--<drawer></drawer>-->
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout >
</template>

<script>
// import drawer from '../src/layouts/system/drawerToolbar'
export default {
  name: 'App',
  components: {
    // drawer
  }
}
</script>

<style>
  .bg{
    background: #bdc3c7;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #2c3e50, #bdc3c7);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #2c3e50, #bdc3c7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
</style>
