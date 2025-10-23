import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid
} from "ng-apexcharts";
import { SummaryService } from 'src/app/core/services/summary.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid
};

@Component({
  selector: 'app-laporan-penjualan',
  templateUrl: './laporan-penjualan.page.html',
  styleUrls: ['./laporan-penjualan.page.scss'],
})
export class LaporanPenjualanPage implements OnInit {

  @ViewChild("chartBulanIni", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  dataChart: any = {
    data: [],
    label: []
  };
  dataProdukTerlaris: any = [];
  dataPenjualanTerakhir: any = [];
  currentState: any = {
    terlaris: "alltime",
    chart_penjualan: "thismonth"
  }
  showProgressBar: boolean = true;

  constructor(
    private summary: SummaryService
  ) {
    this.fnChartOptions({});
  }

  fnChartOptions(params: any) {
    this.chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: (params.data) ? params.data : this.dataChart.data
        },
      ],
      chart: {
        type: "bar",
        height: 'auto',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: false,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: (params.label) ? params.label : this.dataChart.label,
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        show: false,
        title: {
          text: "$ (thousands)"
        },
      },
      fill: {
        opacity: 1
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "" + val + "";
          }
        }
      }
    };
  }

  ngOnInit() {
    this.showProgressBar = true;
    this.summary.getLaporanPenjualan(this.currentState).subscribe(([produkTerlaris, penjualanTerakhir, dataChart]) => {
      this.dataChart = dataChart.data;
      this.dataPenjualanTerakhir = penjualanTerakhir.data;
      this.dataProdukTerlaris = produkTerlaris.data;
      setTimeout(() => {
        this.fnChartOptions({ data: dataChart.data.data, label: dataChart.data.label });
        this.showProgressBar = false;
      }, 500);
    });
  }

  getProdukTerlaris(value) {
    this.showProgressBar = true;
    this.summary.getProdukTerlaris({ state: this.currentState.terlaris }).toPromise().then((res) => {
      this.dataProdukTerlaris = res.data;
      this.showProgressBar = false;
    })
  }

  getDataChart(value) {
    this.showProgressBar = true;
    this.summary.getDataChart({ state: this.currentState.chart_penjualan }).toPromise().then((res) => {
      this.dataChart = res.data;
      // let data = [];
      // for (let item in res.data) {
      //   data.push({ item: res.data[item] });
      // }
      // this.chartOptions.xaxis.categories = [{ data: res.data.label }]
      this.fnChartOptions({ data: res.data.data, label: res.data.label });
      this.showProgressBar = false;
    })
  }

}
