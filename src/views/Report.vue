<template>
  <div id="report">
  
      <div class="left-menu">
        <Menu></Menu>
      </div>
      <div class="right-report">
      <ReportContents></ReportContents>
      </div>
     
  </div>
</template>

<script>
import Menu from "../components/Menu";
import ReportContents from "../components/ReportContents";

export default {
  
  components: {
    Menu,
    ReportContents,   
  },
};
</script>

<style scoped>

#report {
  height: 100%;
   display: flex;
  margin: 0 auto;
  width: 80%;
  height: 100%;

}

.left-menu{
  flex: 1;
   border-right: solid 1px gray;
   padding-top: 30px;
}

.right-report {
  flex: 4;
  padding: 30px 0 0 30px;
}


@media screen and (max-width: 768px) {
#report{
  width: 90%;
}
 .right-report {
    /* margin: 40px; */
  }
}
@media screen and (max-width: 480px) {
  #report {
  width: 100%;

   padding: 50px 0px 0 ;
flex-flow: column;
}

.right-report {
   padding: 0 20px;
  order: 1;
}

.left-menu{
  flex: none;
  order: 2;
   padding-top: 0px;
   border-right:none;
}



}

</style>

