<template>
  <div class="list">

    <div class="expense-list">
      <div id="cal-header">
      <v-icon class="header-arrow" @click="setLastMonth">mdi-calendar-arrow-left</v-icon>
      <span class="selected-month">{{ year }}年{{ month }}月</span>
      <v-icon class="header-arrow" @click="setNextMonth">mdi-calendar-arrow-right</v-icon>
    </div>
      <table
        class="list-table"
        v-for="expenseItem in monthExpenseData"
        :key="expenseItem.id"
      >
        <tr>
          <td class="table-date">
            {{ Number(expenseItem.date.slice(-2)) }}日
          </td>
          <td class="table-contents">{{ expenseItem.contents }}</td>
          <td class="table-expense">{{ expenseItem.expense }}円</td>
          <td class="edit-delete-btn">
            <v-icon class="mr-2" @click="editExpense(expenseItem.id)"
              >mdi-pencil</v-icon
            ><v-icon @click="deleteExpense(expenseItem.id)">mdi-delete</v-icon>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import moment from "moment";
export default {
      
      
  data() {
    return {
      year: "",
      month: "",
      expenses: [],
      expense_id: "",
    };
  },
  computed: {
      monthExpenseData() {
      let expenses = this.expenses.filter((item) => {
        if(this.month <= 9) {
          return item.date.slice(5, 7) === "0" + this.month
        } else {
          return item.date.slice(5, 7) === this.month
        }
      })
      return expenses
    }
  },
  methods: {
     setLastMonth() {
      if (this.month === 1) {
        this.year--;
        this.month = 12;
      } else {
        this.month--;
      }
    },
    setNextMonth: function () {
      if (this.month === 12) {
        this.year++;
        this.month = 1;
      } else {
        this.month++;
      }
      this.day = -1;
    },
    setExpense() {
      this.expenses = this.$store.state.expense;
    },

   deleteExpense(expense_id) {
      this.$store.dispatch("deleteExpense", expense_id);
    },

    editExpense(expense_id) {
      this.$router.push({
        name: "ExpenseEdit",
        params: { id: expense_id },
      });
    },
     getMoment() {
      let m = moment();
      this.month = Number(moment(m).format("YYYY-MM-DD").slice(5, 7));
      this.year = Number(moment(m).format("YYYY-MM-DD").slice(0, 4));
    },
  },
  async created() {
    await this.$store.dispatch("getExpense"), 
    await this.setExpense();
    await this.getMoment();
  },
};
</script>

<style scoped>
.list {
  margin: 0 auto;
  font-size: 15px;
}

.list-table {
  table-layout: fixed;
  width: 100%;
  margin-bottom: 5px;
}
h2 {
  margin: 0 0 10px 0;
  font-size: 20px;
}

.edit-delete-btn {
  text-align: right;
}

@media screen and (max-width: 480px) {
  .expense-list {
    padding: 100px 0 70px;
    font-size: 13px;
  }

  h2 {
    font-size: 15px;
    margin-top: 90px;
  }
}
</style>