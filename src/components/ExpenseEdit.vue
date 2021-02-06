<template>
  <div class="edit-expense">
    <div class="deta flex edit-section">
      <p class="edit-title">日付</p>
      <datepicker
        v-model="calendarDate"
        :language="ja"
        :format="DatePickerFormat"
        @closed="pickerClosedChange"
        class="datepicker"
      />
    </div>

    <div class="edit-amount edit-section">
      <div>
        <p class="edit-title">金額</p>
        <p class="error" v-if="currentError">金額を入力してください</p>
        <div class="edit-grid">
          <div class="container">

          
            <div class="item">
              <button class="amount-btn" @click="append(10000)">
                10000
              </button>
            </div>
            <div class="item">
              <button class="amount-btn" @click="append(5000)">
                5000
              </button>
            </div>
            <div class="item">
              <button class="amount-btn" @click="append(1000)">
                1000
              </button>
            </div>
            <div class="item">
              <button class="amount-btn" @click="append(500)">
                500
              </button>
            </div>
            <div class="item">
              <button class="amount-btn" @click="append(100)">
                100
              </button>
            </div>
          </div>
          </div>
      </div>
      <div class="show-total-amount flex">
        <div class="total-amount flex">
          <p>{{ current }}</p>
          <p>円</p>
        </div>
        <button class="btn btn-reset" @click="reset">Reset</button>
      </div>
    </div>

    <div class="edit-section">
      <p class="edit-title">内容</p>
      <p class="error" v-if="contentsError">内容を選択してください</p>
      <div class="edit-grid">
        <div class="container">

          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="food"
              value="食費"
              v-model="contents"
            />
            <label for="food">食費</label>
          </div>
          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="rent"
              value="家賃"
              v-model="contents"
            />
            <label for="rent">家賃</label>
          </div>
          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="utility"
              value="水道・光熱費"
              v-model="contents"
            />
            <label for="utility">水道光熱</label>
          </div>
          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="daily"
              value="日用品"
              v-model="contents"
            />
            <label for="daily">日用品</label>
          </div>
          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="transportation"
              value="交通費"
              v-model="contents"
            />
            <label for="transportation">交通費</label>
          </div>
          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="clothes"
              value="衣服費"
              v-model="contents"
            />
            <label for="clothes">衣服費</label>
          </div>
          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="entertainment"
              value="娯楽費"
              v-model="contents"
            />
            <label for="entertainment">娯楽費</label>
          </div>
          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="party"
              value="飲み会"
              v-model="contents"
            />
            <label for="party">飲み会</label>
          </div>
          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="circle"
              value="サークル・部活"
              v-model="contents"
            />
            <label for="circle">サークル</label>
          </div>
          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="other"
              value="その他"
              v-model="contents"
            />
            <label for="other">その他</label>
          </div>
        </div>

      </div>
      </div>

   <transition name="fade">
      <div class="message" v-if="message">
        <p class="alert alert-success">{{ message }}</p>
      </div>
    </transition>
    <div class="edit">
      <button class="btn btn-edit" @click="editExpense">
        更新する
      </button>
      <RegisterModal @close="closeModal" v-if="modal"
        >更新しました</RegisterModal
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import { ja } from "vuejs-datepicker/dist/locale";
import moment from "moment";
import RegisterModal from "./RegisterModal";
export default {
  data() {
    return {
      id: "",     
      ja: ja,
      calendarDate: "",
      current: 0,
      contents: null,
      message: null,
      modal: false,
      currentError: false,
      contentsError: false,
    };
  },
    components: {
    Datepicker,
    RegisterModal,
  },
  methods: {
   
    DatePickerFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    pickerClosedChange() {
      if (this.calendarDate) {
        this.calendarDate = moment(this.calendarDate).format("YYYY-MM-DD");
      }
    },
    append(number) {
      this.current = this.current + number;
    },
    reset() {
      this.current = 0;
    },
    showExpense() {
      axios
        .get("https://lit-headland-00036.herokuapp.com/api/expenses/" + this.$route.params.id)
        .then((res) => {
          console.log(res);
          this.id = res.data.data.id;
          this.calendarDate = res.data.data.date
          this.current = res.data.data.expense;
          this.contents = res.data.data.contents;
        });
    },
    editExpense() {
       if (this.current == 0) {
        this.currentError = true;
      } else if (this.contents == null) {
        this.contentsError = true;
      } else {
        this.modal = true;
      axios
        .put("https://lit-headland-00036.herokuapp.com/api/expenses/" + this.id, {
          id: this.id,
          date: this.calendarDate,
          expense: this.current,
          contents: this.contents,
        })
        .then((res) => {
          
          console.log(res);
          this.$router.replace("/list");
        });
      }
    },
    closeModal() {
      this.modal = false;
    },
  },
  created() {
    this.showExpense();
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}

.edit-section {
  margin-bottom: 30px;
}

.datepicker {
  margin-left: 55px;
  line-height: 30px;
  border: solid 1px;
}

.edit-title {
  font-size: 30px;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
  gap: 20px;
}

.edit-grid {
  margin-left: 115px;
}

.amount-btn {
  background-color: #f1fbfb;
  border: 1px solid #000;
  width: 100px;
  height: 70px;
  font-size: 20px;
}

label {
  display: block;
  line-height: 70px;
  text-align: center;
  border: 1px solid #000;
}

.radio-button,
label {
  background-color: #f1fbfb;
}

.radio-button:checked + label {
  background: #c2a67e;
  color: #fff;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.7);
}

.radio-button {
  display: none;
}

.show-total-amount {
  width: 200px;
  font-size: 25px;
  margin: 20px 0 0 130px;
  justify-content: space-between;
}

.btn-reset {
  background: #c2a67c;
  color: #fff;
  width: 55px;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
}

.btn-edit {
  display: block;
  margin: 70px auto;
  width: 200px;
  height: 30px;
  background-color: #c2a67e;
  color: #fff;
  border: solid 1px;
  cursor: pointer;
}

@media screen and (max-width: 480px) {

  .datepicker {
  margin-left: 30px;
  margin-top: 10px;
  width: 80%;
  
}

.edit-title {
  font-size: 15px;
}

.edit-section {
  display: block;
}

  .container {
    grid-template-columns: repeat(auto-fit, 50px);
    gap: 10px;
  margin-left: 10px;
  }

  .edit-grid {
    margin-left: 20px;
  }

  .amount-btn {
    width: 50px;
    height: 40px;
    font-size: 12px;
  }

  label {
  line-height: 40px;
  font-size: 10px;
}

.show-total-amount {
  width: 80%;
  font-size: 25px;
  margin: 20px 0 0 10px;
  justify-content: center;
}

.btn-edit {
  margin: 28px auto 30px;
  width: 60%;
}

}
</style>
