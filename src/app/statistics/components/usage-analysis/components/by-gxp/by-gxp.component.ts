/**
 * Created by GRE511 on 2018-09-10.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartService } from '../../../../../services/apis/cms/chart/chart.service';
import { CmsApis } from '../../../../../services/apis/apis';

@Component({
  selector: 'by-gxp',
  templateUrl: './by-gxp.component.html',
  styleUrls: ['../../usage-analysis.component.css'],
  providers: [CmsApis, ChartService]})

export class ByGxpComponent implements OnInit, OnChanges {
  @Input() selectDuration;

  public isChartLoading:boolean = false;
  public isTableLoading:boolean = false;

  public pieChartLabels: any[] = ['현재 사용량', '남은 용량'];
  public pieChartData: any[] = [30, 70];
  public pieChartDataSet: object;
  public pieChartOptions: object;
  public barChartLabels: any[] = [];
  public barChartData: any[] = [];
  public barChartDataSet: object;
  public barChartOptions: object;

  public backgroundColors:any[] = ['#ffcdd2', '#e1bee7', '#c5cae9', '#bbdefb', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f8bbd0'];

  /*table cols*/
  public gxpAnalysisCols: any[] = [
    { header: '날짜', field: 'date' },
    { header: '스토리지', field: 'storage' },
    { header: '전송량', field: 'traffic' },
  ];
  /*table data*/
  public gxpAnalysisLists: any[] = [];
  public totalData:object = {
    totalStorage: 0,
    totalTransmissionCapacity: 0,
  };

  constructor(private cmsApi: CmsApis, private chartService: ChartService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.setChartData();
    this.setTableData();
  }

  setChartData() {
    this.isChartLoading = true;
    this.barChartLabels = [];
    this.barChartData = [];

    this.pieChartDataSet = {
      labels: this.pieChartLabels,
      datasets: [
        {
          label: '스토리지',
          data: this.pieChartData,
          backgroundColor: this.backgroundColors,
        }],
    };
    this.pieChartOptions = {
      legend: {
        position: 'bottom',
      },
    };

    this.chartService.getLists(this.cmsApi.byGxpChart + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .then((list) => {
        this.barChartLabels = list['labels'].map((item) => {
          const temp = new Date(item);
          return ((temp.getMonth() + 1) < 10 ? '0' + (temp.getMonth() + 1) : (temp.getMonth() + 1)) + '/' + ((temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()));
        });
        const tempBackground:any = this.setBackgroundColor();
        this.barChartDataSet = {
          labels: this.barChartLabels,
          datasets: [
            {
              label: '스토리지',
              data: list['datasets']['data'],
              backgroundColor: tempBackground,
            }],
        };
        this.barChartOptions = {
          legend: {
            position: 'bottom',
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true,
                userCallback: (label) => {
                  if (Math.floor(label) === label) {
                    return label;
                  }
                },
              },
            }],
          },
        };
      })
      .then(() => {
        this.isChartLoading = false;
      });
  }

  setBackgroundColor() {
    const backgroundLength = this.backgroundColors.length;
    const chartLength = this.barChartLabels.length;
    const tempBackground:any[] = [];

    let i = 0;
    let count = 0;
    do {
      tempBackground.push(this.backgroundColors[i]);
      i += 1;
      if (i > backgroundLength) {
        i = 0;
      }
      count += 1;
    } while (count < chartLength);

    return tempBackground;
  }

  setTableData() {
    this.isTableLoading = true;
    this.gxpAnalysisLists = [];
    this.chartService.getLists(this.cmsApi.byGxpTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .then((data) => {
        const list = data['list'] === null ? [] : data['list'];
        this.gxpAnalysisLists = list;
        this.setTotalData();
      })
      .then(() => {
        this.isTableLoading = false;
      });
  }

  setTotalData() {
    this.totalData = {
      totalStorage: 0,
      totalTransmissionCapacity: 0,
    };
    this.gxpAnalysisLists.forEach((item) => {
      this.totalData['totalStorage'] += item['storage'];
      this.totalData['traffic'] += item['traffic'];
    });
  }
}
