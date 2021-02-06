<template>
  <div class="edit-income">
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
              <button class="amount-btn" @click="append(10000)">10000</button>
            </div>
            <div class="item">
              <button class="amount-btn" @click="append(5000)">5000</button>
            </div>
            <div class="item">
              <button class="amount-btn" @click="append(1000)">1000</button>
            </div>
            <div class="item">
              <button class="amount-btn" @click="append(500)">500</button>
            </div>
            <div class="item">
              <button class="amount-btn" @click="append(100)">100</button>
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
    <div class="edit-section edit-amount">
      <p class="edit-title">内容</p>
      <p class="error" v-if="contentsError">内容を選択してください</p>
      <div class="edit-grid">
        <div class="container">
          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="byte"
              value="バイト代"
              v-model="contents"
            />
            <label for="byte">バイト代</label>
          </div>

          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="scholarship"
              value="奨学金"
              v-model="contents"
            />
            <label for="scholarship">奨学金</label>
          </div>

          <div class="item">
            <input
              class="radio-button"
              type="radio"
              id="remittance"
              value="仕送り"
              v-model="contents"
            />
            <label for="remittance">仕送り</label>
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
      <button class="btn btn-edit" @click="editIncome">更新する</button>
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
      id:"",
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
        console.log(this.calendarDate);
      }
    },
    append(number) {
      this.current = this.current + number;
    },
    reset() {
      this.current = 0;
    },
    showIncome() {
        axios.get("http://localhost:8000/api/incomes/"+ this.$route.params.id)
        .then((res) => {
        console.log(res);
        this.id = res.data.data.id
        this.calendarDate = res.data.data.date
        this.current = res.data.data.income;
        this.contents = res.data.data.contents;
      });
    },
    editIncome() {
      if (this.current == 0) {
        this.currentError = true;
      } else if (this.contents == null) {
        this.contentsError = true;
      } else {
        this.modal = true;

      axios.put(
        "http://localhost:8000/api/incomes/" + this.id,
        {
          id: this.id,
          date: this.calendarDate,
          income: this.current,
          contents: this.contents
        }
      ).then((res) => {
     
        console.log(res);
          this.$router.replace("/list");
    })
    }
  },
   closeModal() {
      this.modal = false;
    },
   },
   created() {
    // this.getMoment();
    this.showIncome();
  }
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
  padding-left: 115px;
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
  margin-left: 10px;
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
  }

  .edit-grid {
    padding-left: 15px;
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

.btn-register {
  margin: 30px auto;
  width: 100%;
}

}
</style>