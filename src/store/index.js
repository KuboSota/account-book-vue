import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: "",
    auth: "",
    income: [],
    expense: []
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload
    },
    user(state, payload) {
      state.user = payload
    },
    logout(state, payload) {
      state.auth = payload
    },
    income(state, payload) {
      state.income = payload
    },
    expense(state, payload) {
      state.expense = payload
    }
  },

    actions: {
      async login({ commit }, { email, password }) {
        const responseLogin = await axios.post(
          "https://lit-headland-00036.herokuapp.com/api/login",
          {
            email: email,
            password: password
          }
        )
        const responseUser = await axios.get(
          "https://lit-headland-00036.herokuapp.com/api/user",
          {
            params: {
              email: email
            }
          }
        )
        commit("auth", responseLogin.data.auth)
        commit("user", responseUser.data.data[0])
        router.replace("/report")
      },

      logout({ commit }) {
        axios
          .post("https://lit-headland-00036.herokuapp.com/api/logout", {
            auth: this.state.auth
          })
          .then((response) => {
            commit("logout", response.data.auth)
            router.replace("/")
          })
          .catch((error) => [
            console.log(error)
          ])
      },

      async getIncome(context) {
        let data = []        
        await axios.get(
          'https://lit-headland-00036.herokuapp.com/api/incomes'
       ).then((res) => {

         for (let i = 0; i < res.data.data.length; i++) {
           if (res.data.data[i].user_id === context.state.user.id) {
             data.push(res.data.data[i])
           } 
          }
          context.commit("income", data)            
        })        
      },
      async getExpense(context) {
        let data = []
       await axios.get(
          'https://lit-headland-00036.herokuapp.com/api/expenses'
       ).then((res) => {
         for (let i = 0; i < res.data.data.length; i++) {
           if (res.data.data[i].user_id == context.state.user.id) {
             data.push(res.data.data[i])
           }
          }
          context.commit("expense", data)            
          // console.log(data
        })        
      },

      async deleteIncome({ commit }, income_id) {
        let income = this.state.income
        await axios.delete("https://lit-headland-00036.herokuapp.com/api/incomes/" + income_id).then(
          income.some(function (incomeData, i) {
            if (incomeData.id == income_id) {
              income.splice(i,1)
            }
          }),
          commit("income", income)
        )

      },




      async deleteExpense({ commit }, expense_id) {
        let expense = this.state.expense
        await axios.delete("https://lit-headland-00036.herokuapp.com/api/expenses/" + expense_id).then(
          expense.some(function (expenseData, i) {
            if (expenseData.id == expense_id) {
              expense.splice(i,1)
            }
          }),
          commit("expense", expense)
        )

      },


    },
})


        

