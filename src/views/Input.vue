<template>
  <div id="input">
    <div class="left-menu">
      <Menu></Menu>
    </div>
    <div class="right-input">
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
        <IncomeInput></IncomeInput>
      </div>
      <div v-else-if="active === 'expense'">
        <ExpenseInput></ExpenseInput>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "../components/Menu";

import IncomeInput from "../components/IncomeInput";
import ExpenseInput from "../components/ExpenseInput";
export default {
  data() {
    return {
      active: "income",
    };
  },
  components: {
    Menu,
    IncomeInput,
    ExpenseInput,
  },
};
</script>

<style scoped>
#input {
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

.right-input {
  /* margin: 60px; */
  width: 100%;
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
  #input {
    width: 90%;
  }

  .right-input {
    /* margin: 40px; */
  }
}

@media screen and (max-width: 480px) {
  #input {
    width: 100%;

    padding: 50px 0px 0;
    flex-flow: column;
  }

  .change-tab {
    font-size: 0;
    margin: 30px 0;
  }

  input + label {
    width: 50%;
  }
  .right-input {
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