<template>
  <div id="mypage">
    <h1 class="date">{{ year }}年{{ month }}月</h1>
    <div class="mypage-contents">
      <div class="contents-message">
        <div class="sum">
          <h2 class="all-sum">
            今月の残金はあと<span>{{ sum }}円</span>です
          </h2>
        </div>
      </div>
      <div class="contents-graph">
        <div class="amount flex">
          <div class="income">
            <h3>収入</h3>
            <div class="income-sum">{{ incomes }}円</div>
          </div>
          <div class="expense">
            <h3>支出</h3>
            <div class="expense-sum">{{ expenses }}円</div>
          </div>
        </div>
        <div class="input-contents">
          <div v-if="active === 'income'">
            <IncomeGraph
              :height="height"
              :width="width"
              :styles="{ display: 'flex', 'justify-content': 'center' }"
            />
          </div>
          <div v-else-if="active === 'expense'">
            <ExpenseGraph
              :height="height"
              :width="width"
              :styles="{ display: 'flex', 'justify-content': 'center' }"
            />
          </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import IncomeGraph from "../components/IncomeGraph";
import ExpenseGraph from "../components/ExpenseGraph";
export default {
  data() {
    return {
      year: "",
      month: "",
      active: "income",
      incomes: 0,
      expenses: 0,
      sum: 0,
      height: window.innerHeight / 3,
      width: 300,
      // width: window.innerWidth / 1.2,
    };
  },
  components: {
    IncomeGraph,
    ExpenseGraph,
  },
  methods: {
    setIncome() {
  
      const Incomes = this.$store.state.income;
      let monthIncomes = Incomes.filter((item) => {
        // console.log(this.month);
        return item.date.slice(5, 7) === "0" + this.month;
      });
  

      const allIncome = monthIncomes.map(function (row) {
        return row["income"];
      });
      const reducer = (sum, currentValue) => {
        return sum + currentValue;
      };
      if(allIncome.length) {
        const sumIncome = allIncome.reduce(reducer);
      this.incomes = sumIncome
      } else {
        this.incomes = 0
      }
    },

    setExpense() {
      const Expenses = this.$store.state.expense;
      let monthExpenses = Expenses.filter((item) => {
  
        return item.date.slice(5, 7) === "0" + this.month;
      });
      const allExpense = monthExpenses.map(function (row) {
        return row["expense"];
      });
      const reducer = (sum, currentValue) => {
        return sum + currentValue;
      };

      if(allExpense.length) {
        const sumExpense = allExpense.reduce(reducer);
      this.expenses = sumExpense;
      }else {
        this.expenses = 0
      }
    },

    getSum() {
      let sum = this.incomes - this.expenses;
      this.sum = sum;
    },

    getMoment() {
      let m = moment();
      this.month = Number(moment(m).format("YYYY-MM-DD").slice(5, 7));
      this.year = Number(moment(m).format("YYYY-MM-DD").slice(0, 4));
    },
  },

  async created() {
    await this.$store.dispatch("getIncome");
    await this.$store.dispatch("getExpense");
    await this.getMoment();
    await this.setIncome();
    await this.setExpense();
    await this.getSum();
  },
};
</script>

<style scoped>
#mypage {
  width: 100%;
  height: 100%;
}

h2 {
  font-size: 25px;
  font-weight: 400;
}

h3 {
  font-weight: 400;
}

.all-sum {
  text-align: center;
  line-height: 50px;
}

.allsum span {
  font-size: 50px;
}

.income,
.expense {
  display: flex;
}

.mypage-contents {
  font-size: 30px;
  justify-content: space-between;
  width: 100%;
}

.amount {
  justify-content: center;
  margin-top: 40px;
}

.date {
  margin-bottom: 30px;
}

.income {
  padding-right: 50px;
}

.income-sum,
.expense-sum,
.all-sum {
  margin-left: 20px;
}

.input-contents {
  margin: 60px auto 0;
}

.change-tab {
  font-size: 0;
  margin-top: 20px;
  text-align: center;
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
  .mypage-contents {
    display: block;
  }
  .contents-message {
    margin-bottom: 30px;
  }

  .input-graph {
    margin: 40px;
  }
}

@media screen and (max-width: 480px) {
  .contents-graph {
    margin-top: 20px;
  }
  .amount {
    font-size: 20px;
  }

  .income {
    padding-right: 10px;
  }

  .income-sum,
  .expense-sum,
  .all-sum {
    margin-left: 0px;
  }

  .change-tab {
    margin-top: 30px;
  }

  input + label {
    width: 50%;
  }
}

span {
  font-size: 30px;
}

h2 {
  font-size: 18px;
  font-weight: 400;
}
</style>