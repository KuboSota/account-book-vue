<template>
  <div id="calendar">
    <div class="left-menu">
      <Menu></Menu>
    </div>
    <div class="right-calendar">
      <!-- <v-app> -->
        <Calendar />
      <!-- </v-app> -->
    </div>
  </div>
</template>
<script>
import Menu from "../components/Menu";
import Calendar from "../components/Calendar";
export default {
  // name:"App",
  components: {
    Menu,
    Calendar,
  },
};
</script>

<style scoped>
#calendar {
  display: flex;
  margin: 0 auto;
  width: 80%;
  font-family: "M PLUS Rounded 1c", sans-serif;
  height: 100%;
}

.left-menu {
  flex: 1;
  border-right: solid 1px gray;
  padding-top: 30px;
}
.right-calendar {
  flex: 4;
  padding: 30px 0 0 30px;
}

@media screen and (max-width: 480px) {
  #calendar {
    width: 100%;
    padding: 50px 0px 0px;
    flex-flow: column;
  }

  .right-calendar {
    /* margin: 40px; */
  }

  .right-calendar {
    padding: 0 20px;
    order: 1;
  }

  .left-menu {
    flex: none;
    padding-top: 0px;
    border-right: none;
    order: 2;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>