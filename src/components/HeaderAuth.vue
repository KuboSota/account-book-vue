<template>
  <div class="header flex">
    <div class="right flex">
      <p @click="$router.push('/register')">新規登録</p>
      <p @click="$router.push('/')">ログイン</p>
    </div>
  </div>
</template>

<style scoped>
.right {
  align-items: center;
}

.header {
  height: 70px;
  background-color: #d4ba9f;
}

.header p {
 margin-right: 20px;
 cursor: pointer;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 20px;
  cursor: pointer;

}

.flex {
  display: flex;
  justify-content: flex-end;
  
}
</style>