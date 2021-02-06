<template>
  <div>
    <div id="cal-header">
      <v-icon class="header-arrow" @click="setLastMonth"
        >mdi-calendar-arrow-left</v-icon
      >
      <span class="selected-month">{{ year }}年{{ month }}月</span>
      <v-icon class="header-arrow" @click="setNextMonth"
        >mdi-calendar-arrow-right</v-icon
      >
    </div>

    <table id="cal-main">
      <thead>
        <th v-for="(dayname, index) in weekdays" :key="index">{{ dayname }}</th>
      </thead>
      <tbody>
        <tr v-for="(weekData, index) in calData" :key="index" class="cal-week">
          <td
            class="cal-day"
            v-for="(dayNum, index) in weekData"
            :key="index"
            @click="select(dayNum)"
            :class="{ active: day === dayNum }"
          >
            <span class="day">{{ dayNum.date }}</span
            ><br />
            <span class="calendar-income" v-show="dayNum.income !== 0"
              >+{{ dayNum.income }}</span
            ><br />
            <span class="calendar-expense" v-show="dayNum.expense !== 0"
              >-{{ dayNum.expense }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>

    <div class="list">
      <table
        class="list-table"
        v-for="incomeItem in listIncome"
        :key="incomeItem.id"
      >
        <tr>
          <td class="table-contents">{{ incomeItem.contents }}</td>
          <td class="table-income">+{{ incomeItem.income }}円</td>
          <td class="edit-delete-btn">
            <v-icon class="mr-2" @click="editIncome(incomeItem.id)"
              >mdi-pencil</v-icon
            ><v-icon @click="deleteIncome(incomeItem.id)">mdi-delete</v-icon>
          </td>
        </tr>
      </table>

      <table
        class="list-table"
        v-for="expenseItem in listExpense"
        :key="expenseItem.id"
      >
        <tr>
          <td class="table-contents">{{ expenseItem.contents }}</td>
          <td class="table-income">-{{ expenseItem.expense }}円</td>
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
import moment from "moment";
export default {
  data() {
    return {
      weekdays: ["日", "月", "火", "水", "木", "金", "土"],
      year: "",
      month: "",
      day: -1,
      today: "",
      isActive: false,
      incomes: [],
      expenses: [],
      income_id: "",
      listIncome: null,
      listExpense: null,
      dayIncome: false,
      sum: 0,
    };
  },
  computed: {
    calData: function () {
      let calData = [];

      let firstWeekDay = new Date(this.year, this.month - 1, 1).getDay();

      let lastDay = new Date(this.year, this.month, 0).getDate();

      let dayNum = 1;

      while (dayNum <= lastDay) {
        let weekData = [];

        for (let i = 0; i <= 6; i++) {
          let weekDataObject = { date: "", income: 0, expense: 0 };
          if (calData.length === 0 && i < firstWeekDay) {
            weekData[i] = { date: "", income: 0, expense: 0 };
          } else if (lastDay < dayNum) {
            weekData[i] = { date: "", income: 0, expense: 0 };
          } else {
            if (dayNum <= 9) {
              weekDataObject.date = String("0" + dayNum);
            } else {
              weekDataObject.date = String(dayNum);
            }

            let sameDateIncome = this.incomes.filter((item) => {
              if (this.month <= 9) {
                let calendarDate =
                  this.year +
                  "-" +
                  "0" +
                  this.month +
                  "-" +
                  weekDataObject.date;
                return item.date === calendarDate;
              } else {
                let calendarDate =
                  this.year + "-" + this.month + "-" + weekDataObject.date;
                return item.date === calendarDate;
              }
            });
            let sameDateExpense = this.expenses.filter((item) => {
              if (this.month <= 9) {
                let calendarDate =
                  this.year +
                  "-" +
                  "0" +
                  this.month +
                  "-" +
                  weekDataObject.date;
                return item.date === calendarDate;
              } else {
                let calendarDate =
                  this.year + "-" + this.month + "-" + weekDataObject.date;
                return item.date === calendarDate;
              }
            });

            if (sameDateIncome.length) {
              const allIncome = sameDateIncome.map(function (row) {
                return row["income"];
              });
              const reducer = (sum, currentValue) => {
                return sum + currentValue;
              };
              const sumIncome = allIncome.reduce(reducer);
              weekDataObject.income = sumIncome;
            } else if (!sameDateIncome.length) {
              weekDataObject.income = 0;
            }
            if (sameDateExpense.length) {
              const allIncome = sameDateExpense.map(function (row) {
                return row["expense"];
              });
              const reducer = (sum, currentValue) => {
                return sum + currentValue;
              };
              const sumExpense = allIncome.reduce(reducer);
              weekDataObject.expense = sumExpense;
            } else if (!sameDateExpense.length) {
              weekDataObject.expense = 0;
            }
            weekData.splice(i, 0, weekDataObject);
            dayNum++;
          }
        }
        calData.push(weekData);
      }
      return calData;
    },
  },
  methods: {
    getMoment() {
      let m = moment();
      this.month = Number(moment(m).format("YYYY-MM-DD").slice(5, 7));
      this.year = Number(moment(m).format("YYYY-MM-DD").slice(0, 4));
    },

    setLastMonth() {
      if (this.month === 1) {
        this.year--;
        this.month = 12;
        (this.listIncome = null), (this.listExpense = null);
      } else {
        this.month--;
        (this.listIncome = null), (this.listExpense = null);
      }
      this.day = -1;
    },

    setNextMonth: function () {
      if (this.month === 12) {
        this.year++;
        this.month = 1;
        (this.listIncome = null), (this.listExpense = null);
      } else {
        this.month++;
        (this.listIncome = null), (this.listExpense = null);
      }
      this.day = -1;
    },

    setAmmount() {
      this.incomes = this.$store.state.income;
      this.expenses = this.$store.state.expense;
    },
    select(daynum) {
      if (daynum !== "") {
        this.day = daynum;
      }
      let incomeData = this.incomes.filter((item) => {
        return item.date.slice(-2) === String(daynum.date);
      });
      let expenseData = this.expenses.filter((item) => {
        return item.date.slice(-2) === String(daynum.date);
      });
      this.listIncome = incomeData;
      this.listExpense = expenseData;
    },

    editIncome(income_id) {
      this.$router.push({
        name: "IncomeEdit",
        params: { id: income_id },
      });
    },

    deleteIncome(income_id) {
      this.$store.dispatch("deleteIncome", income_id);
      let income = this.listIncome.filter((item) => {
        return item.id !== income_id;
      });

      this.listIncome = income;
    },

    editExpense(expense_id) {
      this.$router.push({
        name: "ExpenseEdit",
        params: { id: expense_id },
      });
    },

    deleteExpense(expense_id) {
      this.$store.dispatch("deleteExpense", expense_id);
      let expense = this.listExpense.filter((item) => {
        return item.id !== expense_id;
      });

      this.listExpense = expense;
    },
  },

  async created() {
    await this.$store.dispatch("getIncome"),
      await this.$store.dispatch("getExpense"),
      await this.getMoment();
    await this.setAmmount();
  },
};
</script>

<style scoped>
#cal-header {
  font-size: 24px;
  padding: 0;
  text-align: center;
  margin-bottom: 10px;
  background-color: #c2a67e;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}

.header-arrow {
  padding: 15px 30px;
}

#cal-header span {
  color: white;
  padding: 15px 20px;
  display: inline-block;
}

#cal-main {
  font-size: 14px;
  line-height: 20px;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-bottom: 1px solid #ddd;
  border-collapse: collapse;
}

#cal-main th {
  padding: 0;
  text-align: center;
  vertical-align: middle;
  font-weight: normal;
  color: #999;
}
.cal-day {
  /* display: block; */
  position: relative;
  /* height: 40px; */
  padding: 5px 0 15px 0;
  text-align: center;
  vertical-align: middle;
  border-top: 1px solid #ddd;
}

.cal-today {
  background-color: #fcf8e3;
}

.active {
  background-color: #ffc9d7;
}

.calendar-income,
.calendar-expense {
  display: block;
  font-size: 8px;
}

.calendar-income {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  color: darkcyan;
}

.calendar-expense {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  color: hotpink;
}

.list-table {
  table-layout: fixed;
  width: 100%;
  margin-bottom: 5px;
}

.edit-delete-btn {
  text-align: right;
}
</style>