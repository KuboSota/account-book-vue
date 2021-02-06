<script>
import moment from "moment";
import { Doughnut } from "vue-chartjs";


export default {
  extends: Doughnut,


  data() {
    return {
      year: "",
      month: "",
      datas: {
        labels: [
          "食費",
          "家賃",
          "水道・光熱費",
          "日用品",
          "交通費",
          "衣服費",
          "娯楽費",
          "飲み会",
          "サークル・部活",
          "その他",
        ],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              "#548ea6",
              "#339999",
              "#5fb1b9",
              "#b0afb0",
              "#f38c8d",
              "#f2b8a2",
              "#ffa087",
              "#f3d2b3",
              "#e9e9e9",
              "#e0e0e0",
            ],
            borderColor: 'transparent',
          },
        ],
      },
      options: {
        labelPosition: "outside",
        responsive: false,
        tooltips: { enabled: false },
        hover: { mode: null },
        legend: {
          display: false,
        },
      },
    };
  },
  methods: {
    fillData() {
      let datasetsData = this.datas.datasets[0].data;
      let labels = this.datas.labels;
      let monthExpense = this.$store.state.expense.filter((item) => {
        return item.date.slice(5, 7) === "0" + this.month;
      });
      monthExpense.forEach(function (item) {
        switch (item.contents) {
          case "食費": {
            let food = datasetsData[0] + item.expense;
            datasetsData.splice(0, 1, food);
            break;
          }
          case "家賃": {
            let rent = datasetsData[1] + item.expense;
            datasetsData.splice(1, 1, rent);
            break;
          }
          case "水道・光熱費": {
            let utility = datasetsData[2] + item.expense;
            datasetsData.splice(2, 1, utility);
            break;
          }
          case "日用品": {
            let daily = datasetsData[3] + item.expense;
            datasetsData.splice(3, 1, daily);
            break;
          }
          case "交通費": {
            let transportation = datasetsData[4] + item.expense;
            datasetsData.splice(4, 1, transportation);
            break;
          }
          case "衣服費": {
            let clothes = datasetsData[5] + item.expense;
            datasetsData.splice(5, 1, clothes);
            break;
          }
          case "娯楽費": {
            let entertainment = datasetsData[6] + item.expense;
            datasetsData.splice(6, 1, entertainment);
            break;
          }
          case "飲み会": {
            let party = datasetsData[7] + item.expense;
            datasetsData.splice(7, 1, party);
            break;
          }
          case "サークル・部活": {
            let circle = datasetsData[8] + item.expense;

            datasetsData.splice(8, 1, circle);
            break;
          }
          case "その他": {
            let other = datasetsData[9] + item.expense;
            datasetsData.splice(9, 1, other);
            break;
          }
        }
        console.log(labels);
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
    await this.$store.dispatch("getExpense"),
    await this.getMoment();
    await this.fillData();
    await this.renderChart(this.datas, this.options);
  },

  mounted() {
    this.addPlugin({
      afterDraw(chart, go) {// eslint-disable-line no-unused-vars
        
        let ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {

          let meta = chart.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach(function (element, index) {
              // フォントの設定
              let fontSize = 10;
              let fontStyle = "normal";
              let fontFamily = "Helvetica Neue";
              ctx.fillStyle = "#000";
              // 設定を適用
              ctx.font = Chart.helpers.fontString(// eslint-disable-line no-undef
                
                fontSize,
                fontStyle,
                fontFamily
              );

              let dataString = `${chart.data.labels[index]}: ${dataset.data[index]}円`;
           
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              if (dataset.data[index] !== 0) {
                let padding = -2;
                let position = element.tooltipPosition();
          
                ctx.fillText(
                  dataString,
                  position.x,
                  position.y + fontSize / 2 - padding
                ); 

           
                if(dataset.data[index] < 1000) {
                  let legend = chart.legend;
                legend.top = chart.height - legend.height / 2 - legend.top / 2;
                }
              }
            });
          }
        });
      },
    });
    this.renderChart(this.datas, this.options);
  },
};
</script>
