/**
 * Created by GRE511 on 2018-09-10.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartService } from '../../../../../services/apis/cms/chart/chart.service';
import { CmsApis } from '../../../../../services/apis/apis';

@Component({
  selector: 'by-transCoding',
  templateUrl: './by-transCoding.component.html',
  styleUrls: ['../../usage-analysis.component.css'],
  providers: [CmsApis, ChartService]})

export class ByTransCodingComponent implements OnInit, OnChanges {
  @Input() selectDuration;
  public chartLabels: any[] = [];
  public chartDataSet: object;
  public chartOptions: any;
  public backgroundColors:any[] = ['#ffcdd2', '#e1bee7', '#c5cae9', '#bbdefb', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f8bbd0'];

  /*table cols*/
  public transCodingAnalysisCols: any[] = [
    { header: '날짜', field: 'date' },
    { header: '트랜스코딩', field: 'fileSize' },
    { header: '콘텐츠 등록 수', field: 'fileCnt' },
  ];
  /*table data*/
  public transCodingAnalysisLists: any[] = [];
  public totalData:object = {
    totalTransCoding: 0,
    tableTotalContentsCount: 0,
    totalContentsCount: 0,
  };

  constructor(private cmsApi: CmsApis, private chartService: ChartService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.setChartData();
    this.setTableData();
  }

  setChartData() {
    this.chartLabels = [];

    this.chartService.getLists(this.cmsApi.byStorageChart + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .then((list) => {
        this.chartLabels = list['labels'].map((item) => {
          const temp = new Date(item);
          return ((temp.getMonth() + 1) < 10 ? '0' + (temp.getMonth() + 1) : (temp.getMonth() + 1)) + '/' + ((temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()));
        });
        const tempBackground:any = this.setBackgroundColor();
        list.datasets[1].backgroundColor = tempBackground;
        this.chartDataSet = {
          labels: this.chartLabels,
          datasets: [
            list.datasets[1],
          ],
        };
        this.chartOptions = {
          legend: {
            display: false,
          },
        };
      });
  }

  setBackgroundColor() {
    const backgroundLength = this.backgroundColors.length;
    const chartLength = this.chartLabels.length;
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
    this.transCodingAnalysisLists = [];
    this.chartService.getLists(this.cmsApi.byStorageTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .then((data) => {
        const list = data['list'] === null ? [] : data['list'];
        this.transCodingAnalysisLists = list;
        this.setTotalData();
      });
  }

  setTotalData() {
    this.totalData = {
      totalTransCoding: 0,
      tableTotalContentsCount: 0,
      totalContentsCount: 0,
    };
    this.transCodingAnalysisLists.forEach((item) => {
      this.totalData['totalTransCoding'] += item['fileSize'];
      this.totalData['tableTotalContentsCount'] += item['fileCnt'];
    });
  }
}
