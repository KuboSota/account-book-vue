<template>
  <div class="incomeEdit">
    <div class="left-menu">
      <Menu></Menu>
    </div>
    <div class="right-edit">
      <IncomeEdit></IncomeEdit>
    </div>
  </div>
</template>

<script>
import Menu from "../components/Menu";

import IncomeEdit from "../components/IncomeEdit";
export default {
  components: {
    Menu,

    IncomeEdit,
  },
};
</script>

<style scoped>
.incomeEdit {
  font-family: "M PLUS Rounded 1c", sans-serif;
  display: flex;
  margin: 0 auto;
  width: 80%;
  height: 100%;
}

.left-menu {
  flex: 1;
  border-right: solid 1px gray;
  padding-top: 30px;
}

.right-edit {
  /* margin: 60px; */
  flex: 4;
  padding: 60px 0 0 60px;
}

@media screen and (max-width: 480px) {
  .incomeEdit {
    width: 100%;

    padding: 50px 0px 0;
    flex-flow: column;
  }
  .right-edit {
    padding: 0 20px;
    order: 1;
  }

  .left-menu {
    flex: none;
    padding-top: 0px;
    border-right: none;
    order: 2;
  }
}
</style>