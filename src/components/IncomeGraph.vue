<script>
import moment from "moment"
import { Doughnut } from "vue-chartjs";


export default {
  extends: Doughnut,

  data() {
    return {
      year: "",
      month : "",
      datas: {
        labels: ["バイト代", "奨学金", "仕送り", "その他"],
        datasets: [
          {
            data: [0, 0, 0, 0],
            backgroundColor: ["#7d86a7", "#0076A8", "#b39171", "#fff4d1"],
            borderColor: 'transparent'
          },
        ],
      },
      options: {
        responsive: false,
        tooltips: {enabled: false},
        hover: {mode: null},
        legend: {
          display: false,
        },
      },
    };
  },
  methods: {
    fillData() {
      let datasetsData = this.datas.datasets[0].data;
      let monthIncome = this.$store.state.income.filter((item) => {
        return item.date.slice(5, 7) === "0" + this.month
      })
      monthIncome.forEach(function (item) {
        if (item.contents === "バイト代") {
          let byte = datasetsData[0] + item.income;
          datasetsData.splice(0, 1, byte);
        } else if (item.contents === "奨学金") {
          let scholarship = datasetsData[1] + item.income;
          datasetsData.splice(1, 1, scholarship);
        } else if (item.contents === "仕送り") {
          let remittance = datasetsData[2] + item.income;
          datasetsData.splice(2, 1, remittance);
        } else if (item.contents === "その他") {
          let others = datasetsData[3] + item.income;
          datasetsData.splice(3, 1, others);
        }

      });
    },
     getMoment() {
      let m = moment();
      this.month = Number(moment(m).format("YYYY-MM-DD").slice(5, 7));
      this.year = Number(moment(m).format("YYYY-MM-DD").slice(0, 4));
 
    },
  },

  async created() {
    await this.$store.dispatch("getIncome");
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
              ctx.font = Chart.helpers.fontString( // eslint-disable-line no-undef
                fontSize,
                fontStyle,
                fontFamily
              );

              // ラベルをパーセント表示に変更
              // let labelString = `${chart.data.labels[index]}: ${dataset.data[index]}`;
              let dataString =`${chart.data.labels[index]}: ${dataset.data[index]}円`;
                // Math.round((dataset.data[index] / dataSum) * 100).toString() +
                // "%";

              // positionの設定
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              if (dataset.data[index] !== 0) {
                let padding = -2;
                let position = element.tooltipPosition();
                // ツールチップに変更内容を表示
                // ctx.fillText(
                //   labelString,
                //   position.x,
                //   position.y - fontSize / 2 - padding
                // ); // title
                ctx.fillText(
                  dataString,
                  position.x,
                  position.y + fontSize / 2 - padding
                ); // データの百分率

                // 凡例の位置調整
                let legend = chart.legend;
                legend.top = chart.height - legend.height / 2 - legend.top / 2;
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
