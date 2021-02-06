<template>
  <div id="list">
    <div class="left-menu">
      <Menu></Menu>
    </div>

    <div class="right-list">
      <div class="change-tab">
        <input
          name="radio"
          class="radio-button"
          type="radio"
          id="incomeBtn"
          value="income"
          v-model="active"
        />
        <label for="incomeBtn">収入</label>
        <input
          name="radio"
          class="radio-button"
          type="radio"
          id="expenseBtn"
          value="expense"
          v-model="active"
        />
        <label for="expenseBtn">支出</label>
      </div>
      <div v-if="active === 'income'">
        <IncomeList></IncomeList>
      </div>
      <div v-else-if="active === 'expense'">
        <ExpenseList></ExpenseList>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "../components/Menu";

import IncomeList from "../components/IncomeList";
import ExpenseList from "../components/ExpenseList";

export default {
  data() {
    return {
      active: "income",
    };
  },
  components: {
    Menu,

    IncomeList,
    ExpenseList,
  },
};
</script>

<style scoped>
#list {
  font-family: "M PLUS Rounded 1c", sans-serif;
  display: flex;
  margin: 0 auto;

  width: 80%;
  height: 100%;
}

.left-menu {
  flex: 1;
  border-right: solid 1px gray;
  /* padding-top: 30px; */
}

.right-list {
  /* margin: 30px 60px 0; */
  flex: 4;
  padding: 30px 0 0 30px;
}

.change-tab {
  font-size: 0;
  margin-bottom: 60px;
}

input {
  display: none;
}

input + label {
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  padding: 2px;
  background-color: #eedfc8;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
}

.radio-button:checked + label {
  background-color: #c2a67e;
}

@media screen and (max-width: 768px) {
  #list {
    width: 90%;
  }

  .right-list {
    /* margin: 40px; */
  }
}

@media screen and (max-width: 480px) {
  #list {
    width: 100%;
    padding: 50px 0px 0px;
    flex-flow: column;
  }

  .change-tab {
    font-size: 0;
    margin: 0;
    padding: 30px 0;
    position: fixed;
    width: 90%;
    background-color: #f6efdb;
    z-index: 100;
  }

  input + label {
    width: 50%;
  }
  .right-list {
    padding: 0 20px;
    order: 1;
  }

  .left-menu {
    flex: none;
    padding-top: 0px;
    border-right: none;
    order: 2;
    z-index: 100;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>