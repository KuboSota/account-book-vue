<template>
  <div class="list">

    <div class="income-list">
    <div id="cal-header">
      <v-icon class="header-arrow" @click="setLastMonth">mdi-calendar-arrow-left</v-icon>
      <span class="selected-month">{{ year }}年{{ month }}月</span>
      <v-icon class="header-arrow" @click="setNextMonth">mdi-calendar-arrow-right</v-icon>
    </div>
      <table
        class="list-table"
        v-for="incomeItem in monthIncomeData"
        :key="incomeItem.id"
      >
        <tr>
          <td class="table-date">{{ Number(incomeItem.date.slice(-2)) }}日</td>
          <td class="table-contents">{{ incomeItem.contents }}</td>
          <td class="table-income">{{ incomeItem.income }}円</td>
          <td class="edit-delete-btn">
            <v-icon class="mr-2" @click="editIncome(incomeItem.id)"
              >mdi-pencil</v-icon
            ><v-icon @click="deleteIncome(incomeItem.id)">mdi-delete</v-icon>
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
      incomes: [],
      income_id: "",
    };
  },

  computed: {
    monthIncomeData() {
      let incomes = this.incomes.filter((item) => {
        if(this.month <= 9) {
          return item.date.slice(5, 7) === "0" + this.month
        } else {
          return item.date.slice(5, 7) === this.month
        }
      })
      return incomes
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
    setIncome() {
      this.incomes = this.$store.state.income;
    },

  deleteIncome(income_id) {
      this.$store.dispatch("deleteIncome", income_id);
    },

    editIncome(income_id) {
      this.$router.push({
        name: "IncomeEdit",
        params: { id: income_id },
      });
    },
    getMoment() {
      let m = moment();
      this.month = Number(moment(m).format("YYYY-MM-DD").slice(5, 7));
      this.year = Number(moment(m).format("YYYY-MM-DD").slice(0, 4));
      console.log(this.month);
    },
  },
  async created() {
    await this.$store.dispatch("getIncome")
    await this.setIncome();
    await this.getMoment();
  },
};
</script>

<style scoped>
.list {
  margin: 0 auto;
  /* width: 80%; */
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
  .income-list {
    /* margin: 40px; */
    padding: 100px 0 70px;
    font-size: 13px;
  }

  h2 {
    margin-top: 90px;
    font-size: 15px;
  }
}
</style>