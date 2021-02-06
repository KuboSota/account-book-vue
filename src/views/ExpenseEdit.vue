<template>
  <div class="expenseEdit">
    <div class="left-menu">
      <Menu></Menu>
    </div>
    <div class="right-edit">
      <ExpenseEdit></ExpenseEdit>
    </div>
  </div>
</template>

<script>
import Menu from "../components/Menu";

import ExpenseEdit from "../components/ExpenseEdit";
export default {
  components: {
    Menu,

    ExpenseEdit,
  },
};
</script>

<style scoped>
.expenseEdit {
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
  width: 65%;
  flex: 4;
  padding: 60px 0 0 60px;
}

@media screen and (max-width: 480px) {
  .expenseEdit {
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