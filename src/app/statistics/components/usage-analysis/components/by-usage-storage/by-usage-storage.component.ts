/**
 * Created by GRE511 on 2018-09-07.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartService } from '../../../../../services/apis/cms/chart/chart.service';
import { CmsApis } from '../../../../../services/apis/apis';

@Component({
  selector: 'by-usage-storage',
  templateUrl: './by-usage-storage.component.html',
  styleUrls: ['../../usage-analysis.component.css'],
  providers: [CmsApis, ChartService]})

export class ByUsageStorageComponent implements OnInit, OnChanges {
  @Input() selectDuration;

  public isChartLoading:boolean = false;
  public isTableLoading:boolean = false;

  public pieChartLabels: any[] = ['현재 사용량', '남은 용량'];
  public pieChartData: any[] = [30, 70];
  public pieChartDataSet: object;
  public pieChartOptions: object;
  public barChartLabels: any[] = [];
  public barChartDataSet: object;
  public barChartOptions: object;

  public backgroundColors:any[] = ['#ffcdd2', '#e1bee7'];

  /*table cols*/
  public storageAnalysisCols: any[] = [
    { header: '날짜', field: 'date' },
    { header: '원본 파일', field: 'fileOriSize' },
    { header: '트랜스코딩 파일', field: 'fileSize' },
    { header: '총합', field: 'totalSize' },
  ];
  /*table data*/
  public storageAnalysisLists: any[] = [];
  public totalData:object = {
    totalOriginStorage: 0,
    totalTransCodingStorage: 0,
    totalStorage: 0,
  };

  constructor(private cmsApi: CmsApis, private chartService: ChartService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.setChartData();
    this.setTableData();
  }

  setChartData() {
    this.isChartLoading = true;
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

    this.chartService.getLists(this.cmsApi.byStorageChart + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .then((list) => {
        list.datasets[0].backgroundColor = this.backgroundColors[0];
        list.datasets[1].backgroundColor = this.backgroundColors[1];
        this.barChartLabels = list['labels'].map((item) => {
          const temp = new Date(item);
          return ((temp.getMonth() + 1) < 10 ? '0' + (temp.getMonth() + 1) : (temp.getMonth() + 1)) + '/' + ((temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()));
        });
        this.barChartDataSet = {
          labels: this.barChartLabels,
          datasets: [
            list.datasets[0],
            list.datasets[1],
          ],
        };
        this.barChartOptions = {
          legend: {
            position: 'bottom',
          },
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
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

  setTableData() {
    this.isTableLoading = true;
    this.storageAnalysisLists = [];
    this.chartService.getLists(this.cmsApi.byStorageTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .then((data) => {
        const list = data['list'] === null ? [] : data['list'];
        list.forEach((item) => {
          item['totalSize'] = item.fileOriSize + item.fileSize;
        });
        this.storageAnalysisLists = list;
        this.setTotalData();
      })
      .then(() => {
        this.isTableLoading = false;
      });
  }

  setTotalData() {
    this.totalData = {
      totalOriginStorage: 0,
      totalTransCodingStorage: 0,
      totalStorage: 0,
    };
    this.storageAnalysisLists.forEach((item) => {
      this.totalData['totalOriginStorage'] += item['fileOriSize'];
      this.totalData['totalTransCodingStorage'] += item['fileSize'];
    });
    this.totalData['totalStorage'] = this.totalData['totalOriginStorage'] + this.totalData['totalTransCodingStorage'];
  }
}
