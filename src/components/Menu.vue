<template>
  <div class="menu">
    <div class="menu-item input flex" @click="$router.push('/input')">
      <v-icon class="mr-2"
        >mdi-pencil</v-icon
      >
      <p>入力</p>
    </div>
    <div class="menu-item calendar flex" @click="$router.push('/calendar')">
      <v-icon class="mr-2">mdi-calendar-month</v-icon>
      <p>カレンダー</p>
    </div>
    <div class="menu-item report flex" @click="goReport">
      <v-icon class="mr-2">mdi-chart-arc</v-icon>
      <p>レポート</p>
    </div>
    <div class="menu-item list flex" @click="$router.push('/list')">
      <v-icon class="mr-2">mdi-clipboard-list</v-icon>
      <p>収支一覧</p>
    </div>
    <div class="menu-item logout flex" @click="$store.dispatch('logout')">
      <v-icon class="mr-2">mdi-logout</v-icon>

      <p>ログアウト</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async goReport() {
      await this.$store.dispatch("getIncome"), await this.$router.push("/");
    },
  },
};
</script>

<style scoped>

.menu {
  justify-content: flex-start;
  margin-top: 35px;
  /* height: 80px; */
}

.menu-item {
  margin-bottom: 20px;
  height: 100%;
}

.menu p {
  cursor: pointer;
  font-family: "M PLUS Rounded 1c", sans-serif;
  font-size: 20px;
  font-weight: 100;
  line-height: 20px;
}

.header {
  height: 70px;
  display: flex;
  background-color: #7ec2c2;
}

.flex {
  display: flex;
  align-content: center;
}

@media screen and (max-width: 1100px) {
  .menu-item p {
    display: none;
  }

  .mr-2 {
    margin: 0 auto;
  }
}

@media screen and (max-width: 768px) {
  
}
@media screen and (max-width: 480px) {
  .menu {
    display: flex;
  margin-top: 0px;
  background-color: #eedfc8;
  height: 80px;
  }

  .menu-item {
  margin-bottom: 0;
width: 100%;
}

.v-icon.v-icon::after {
  height: 0;
}


}
</style>