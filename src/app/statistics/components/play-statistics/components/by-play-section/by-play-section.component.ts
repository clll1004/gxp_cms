/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartService } from '../../../../../services/apis/cms/chart/chart.service';
import { CmsApis } from '../../../../../services/apis/apis';

@Component({
  selector: 'by-play-section',
  templateUrl: './by-play-section.component.html',
  styleUrls: ['../../play-statistics.component.css'],
  providers: [CmsApis, ChartService]})

export class ByPlaySectionComponent implements OnInit, OnChanges {
  @Input() pathName;
  @Input() selectDuration;

  public isTableLoading:boolean = false;
  public isChartLoading:boolean = false;
  public isResultTableLoading:boolean = false;

  public selectFolder:object = { label:'전체 카테고리', value: null };
  public searchKey:string = '';
  public searchCount:number = 0;

  public isCompareStatus:boolean = false;

  public chartType:string = 'line';
  public chartLabels:any[] = [];
  public chartData:any[] = [];
  public chartOptions: any;
  public dateArray:any[] = [];
  public tempCompareItems:any[] = [];
  public compareItems:any[] = [];
  public isShowMessage:boolean = false;
  public isShowCheckLimitMessage:boolean = false;

  public comparePopularSectionValue:any[] = [];
  public compareLeaveSectionValue:any[] = [];
  public comparePopularSectionAverageValue:any[] = [];
  public compareLeaveSectionAverageValue:any[] = [];
  /*table cols*/
  public playSectionStatisticsCols:any[] = [
    { header: '', field: '', width: '5%' },
    { header: 'No', field: 'no', width: '5%' },
    { header: '그룹명', field: 'groupName', width: '10%' },
    { header: '폴더명', field: 'folderName', width: '10%' },
    { header: '파일명', field: 'contentsName', width: '35%' },
    { header: '영상 시간', field: 'duration', width: '10%' },
    { header: '재생시간', field: 'playTime', width: '10%' },
    { header: '재생수', field: 'playCount', width: '5%' },
    { header: '등록일', field: 'regdate', width: '15%' },
  ];
  public compareSectionCols:any[] = [
    { header: '일자', field: 'date' },
    { header: '영상 제목', field: 'contentsName' },
    { header: '10%', field: 'p10' },
    { header: '20%', field: 'p20' },
    { header: '30%', field: 'p30' },
    { header: '40%', field: 'p40' },
    { header: '50%', field: 'p50' },
    { header: '60%', field: 'p60' },
    { header: '70%', field: 'p70' },
    { header: '80%', field: 'p80' },
    { header: '90%', field: 'p90' },
    { header: '100%', field: 'p100' },
  ];
  /*table data*/
  public playSectionStatisticsDatas:any[] = [];
  public compareSectionDatas:any[] = [];
  public compareSectionAverageData:any[] = [];
  /*chart data*/
  public compareLength:any[] = [];
  public comparePlaySectionData:any[] = [];

  public apiParameter:string = '';
  public apiSearchKey:string = '';

  constructor(private cmsApi: CmsApis, private chartService: ChartService) { }

  ngOnInit() { }

  ngOnChanges() {
    document.getElementById('search-result')['style'].display = 'none';
    this.searchKey = '';
    this.searchCount = 0;
    const startDate = new Date(this.selectDuration.date[0]);
    const endDate = new Date(this.selectDuration.date[1]);
    this.dateArray = this.getDateArray(startDate, endDate);
    this.initialize();
    this.setTableData(false);
  }

  categorySearch(e) {
    this.selectFolder = e;
    this.initialize();
    if (!this.apiSearchKey) {
      this.apiParameter = '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']);
    } else {
      this.apiParameter = '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']) + '&content_nm=' + this.apiSearchKey;
    }
    this.setTableData(true);
  }

  search() {
    this.initialize();
    this.apiSearchKey = this.searchKey;
    if (!this.selectFolder['value']) {
      this.apiParameter = '&content_nm=' + this.apiSearchKey;
    } else {
      this.apiParameter = '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']) + '&content_nm=' + this.apiSearchKey;
    }
    this.setTableData(true);
  }

  initialize() {
    this.isCompareStatus = false;
    this.playSectionStatisticsDatas = [];
    this.tempCompareItems = [];
    this.compareItems = [];
    this.comparePlaySectionData = [];
    this.compareSectionDatas = [];
    this.compareSectionAverageData = [];
    this.compareLength = [];
  }

  getDateArray(startDate, endDate) {
    const dateArray:any[] = [];
    const currentDate = startDate;
    while (currentDate <= endDate) {
      const td = new Date(currentDate).getFullYear() + '-' + (new Date(currentDate).getMonth() + 1 < 10 ? '0' + (new Date(currentDate).getMonth() + 1) : new Date(currentDate).getMonth() + 1) + '-' + (new Date(currentDate).getDate() < 10 ? '0' + new Date(currentDate).getDate() : new Date(currentDate).getDate());
      dateArray.push(td);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  setTableData(search:boolean) {
    this.isTableLoading = true;
    let api:string = '';
    if (!search) {
      api = this.cmsApi.byPlaySectionTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1];
    } else {
      api = this.cmsApi.byPlaySectionTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1] + this.apiParameter;
    }
    this.playSectionStatisticsDatas = [];

    this.chartService.getLists(api)
      .then((list) => {
        if (list['list']) {
          const temp:any[] = [];
          let i = 1;
          list['list'].forEach((item) => {
            temp.push({
              no: i,
              groupName: item.group,
              folderName: item.category,
              contentsName: item.contentsName,
              duration: item.duration,
              playTime: item.runtime,
              playCount: item.playCount,
              regdate: item.regdate,
              ft_seq: item.ft_seq,
            });
            i += 1;
          });
          temp.sort((a, b) => {
            return new Date(b.regdate).getTime() - new Date(a.regdate).getTime();
          });
          this.playSectionStatisticsDatas = temp;
          this.tempCompareItems = [this.playSectionStatisticsDatas[0]];
          this.compareItems = this.tempCompareItems;

          if (search) {
            document.getElementById('search-result')['style'].display = 'inline-block';
            this.searchCount = list['list'].length;
          }

          this.showSingleResult();
        }
      })
      .then(() => {
        this.isTableLoading = false;
      });
  }

  onRowSelect() {
    if (this.tempCompareItems.length > 2) {
      this.isShowCheckLimitMessage = true;
      this.tempCompareItems.pop();
      return 0;
    }
    if (this.tempCompareItems.length === 0 || this.tempCompareItems.length === 1) {
      this.isCompareStatus = false;
      this.compareItems = this.tempCompareItems;
      this.showPlaySectionResult();
    }
  }

  showPlaySectionResult() {
    this.isChartLoading = true;
    this.isResultTableLoading = true;

    if (this.tempCompareItems.length === 0) {
      this.compareSectionDatas = [];
      this.comparePlaySectionData = [];
      return 0;
    }
    this.compareSectionDatas = [];

    let seqString = '';
    if (this.tempCompareItems.length === 2) {
      seqString = this.tempCompareItems[0].ft_seq + ',' + this.tempCompareItems[1].ft_seq;
    } else {
      seqString = this.tempCompareItems[0].ft_seq;
    }
    this.chartService.getLists(this.cmsApi.byPlaySectionResultTable + 'ft_seq=' + seqString + '&sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .then((list) => {
        this.compareSectionDatas = list.data;
        this.setAverageData();
        this.getPopularOrLeaveSection();
        this.setCompareSectionChartData();
      })
      .then(() => {
        this.isChartLoading = false;
        this.isResultTableLoading = false;
      });
  }

  showCompareResult() {
    if (this.tempCompareItems.length === 2) {
      this.isCompareStatus = true;
      this.compareItems = this.tempCompareItems;
      this.showPlaySectionResult();
    } else {
      this.isShowMessage = true;
    }
  }

  showSingleResult() {
    this.isCompareStatus = false;
    this.tempCompareItems = [this.tempCompareItems[0]];
    this.compareItems = this.tempCompareItems;
    this.showPlaySectionResult();
  }

  getPopularOrLeaveSection() {
    this.comparePopularSectionValue = [];
    this.compareLeaveSectionValue = [];
    const temp1:any[] = [];
    let temp2:any[] = [];
    this.compareSectionDatas.forEach((item:any[]) => {
      temp2 = [];
      item.forEach((value) => {
        temp2.push([value['p10'], value['p20'], value['p30'], value['p40'], value['p50'], value['p60'], value['p70'], value['p80'], value['p90'], value['p100']]);
      });
      temp1.push(temp2);
    });
    temp1.forEach((item:any[]) => {
      item.forEach((item2:any[]) => {
        let popular:number = item2[0];
        let leave:number = item2[0];
        item2.forEach((value) => {
          popular = popular < value ? value : popular;
          leave = leave > value ? value : leave;
        });
        this.comparePopularSectionValue.push(popular);
        this.compareLeaveSectionValue.push(leave);
      });
    });

    this.comparePopularSectionAverageValue = [];
    this.compareLeaveSectionAverageValue = [];
    const averageTemp1:any[] = [];
    let averageTemp2:any[] = [];
    this.compareSectionAverageData.forEach((item:any[]) => {
      averageTemp2 = [];
      averageTemp2.push([item['p10'], item['p20'], item['p30'], item['p40'], item['p50'], item['p60'], item['p70'], item['p80'], item['p90'], item['p100']]);
      averageTemp1.push(averageTemp2);
    });
    averageTemp1.forEach((item:any[]) => {
      item.forEach((item2:any[]) => {
        let popular: number = item2[0];
        let leave: number = item2[0];
        item2.forEach((value) => {
          popular = popular < value ? value : popular;
          leave = leave > value ? value : leave;
        });
        this.comparePopularSectionAverageValue.push(popular);
        this.compareLeaveSectionAverageValue.push(leave);
      });
    });
  }

  setAverageData() {
    this.compareSectionAverageData = [];
    const tempData:object = {
      p10: 0,
      p20: 0,
      p30: 0,
      p40: 0,
      p50: 0,
      p60: 0,
      p70: 0,
      p80: 0,
      p90: 0,
      p100: 0,
    };
    const tempData2:object = {
      p10: 0,
      p20: 0,
      p30: 0,
      p40: 0,
      p50: 0,
      p60: 0,
      p70: 0,
      p80: 0,
      p90: 0,
      p100: 0,
    };
    for (let j = 0 ; j < this.compareItems.length ; j += 1) {
      for (let i = 0 ; i < this.compareSectionDatas.length ; i += 1) {
        if (j === 0) {
          tempData['index'] = j;
          tempData['date'] = this.selectDuration['date'][0] + ' ~ ' + this.selectDuration['date'][1];
          tempData['contentsName'] = this.compareSectionDatas[i][j]['contentsName'];
          tempData['p10'] = Number(tempData['p10']) + Number(this.compareSectionDatas[i][j]['p10']);
          tempData['p20'] = Number(tempData['p20']) + Number(this.compareSectionDatas[i][j]['p20']);
          tempData['p30'] = Number(tempData['p30']) + Number(this.compareSectionDatas[i][j]['p30']);
          tempData['p40'] = Number(tempData['p40']) + Number(this.compareSectionDatas[i][j]['p40']);
          tempData['p50'] = Number(tempData['p50']) + Number(this.compareSectionDatas[i][j]['p50']);
          tempData['p60'] = Number(tempData['p60']) + Number(this.compareSectionDatas[i][j]['p60']);
          tempData['p70'] = Number(tempData['p70']) + Number(this.compareSectionDatas[i][j]['p70']);
          tempData['p80'] = Number(tempData['p80']) + Number(this.compareSectionDatas[i][j]['p80']);
          tempData['p90'] = Number(tempData['p90']) + Number(this.compareSectionDatas[i][j]['p90']);
          tempData['p100'] = Number(tempData['p100']) + Number(this.compareSectionDatas[i][j]['p100']);
        } else {
          tempData2['index'] = j;
          tempData2['date'] = this.selectDuration['date'][0] + ' ~ ' + this.selectDuration['date'][1];
          tempData2['contentsName'] = this.compareSectionDatas[i][j]['contentsName'];
          tempData2['p10'] = Number(tempData2['p10']) + Number(this.compareSectionDatas[i][j]['p10']);
          tempData2['p20'] = Number(tempData2['p20']) + Number(this.compareSectionDatas[i][j]['p20']);
          tempData2['p30'] = Number(tempData2['p30']) + Number(this.compareSectionDatas[i][j]['p30']);
          tempData2['p40'] = Number(tempData2['p40']) + Number(this.compareSectionDatas[i][j]['p40']);
          tempData2['p50'] = Number(tempData2['p50']) + Number(this.compareSectionDatas[i][j]['p50']);
          tempData2['p60'] = Number(tempData2['p60']) + Number(this.compareSectionDatas[i][j]['p60']);
          tempData2['p70'] = Number(tempData2['p70']) + Number(this.compareSectionDatas[i][j]['p70']);
          tempData2['p80'] = Number(tempData2['p80']) + Number(this.compareSectionDatas[i][j]['p80']);
          tempData2['p90'] = Number(tempData2['p90']) + Number(this.compareSectionDatas[i][j]['p90']);
          tempData2['p100'] = Number(tempData2['p100']) + Number(this.compareSectionDatas[i][j]['p100']);
        }
      }
    }
    this.compareSectionAverageData.push(tempData);
    if (tempData2['p10']) {
      this.compareSectionAverageData.push(tempData2);
    }
    this.compareSectionAverageData.forEach((item) => {
      item['p10'] = Math.floor(item['p10'] / this.dateArray.length);
      item['p20'] = Math.floor(item['p20'] / this.dateArray.length);
      item['p30'] = Math.floor(item['p30'] / this.dateArray.length);
      item['p40'] = Math.floor(item['p40'] / this.dateArray.length);
      item['p50'] = Math.floor(item['p50'] / this.dateArray.length);
      item['p60'] = Math.floor(item['p60'] / this.dateArray.length);
      item['p70'] = Math.floor(item['p70'] / this.dateArray.length);
      item['p80'] = Math.floor(item['p80'] / this.dateArray.length);
      item['p90'] = Math.floor(item['p90'] / this.dateArray.length);
      item['p100'] = Math.floor(item['p100'] / this.dateArray.length);
    });
  }

  setCompareSectionChartData() {
    this.comparePlaySectionData = [];
    this.compareLength = [];
    const tborderColors:any[] = ['#ffcdd2', '#e1bee7'];
    const tbackgroundColors:any[] = ['rgba(255,205,210,.2)', 'rgba(225,190,231,.2)'];

    let i = 0;
    this.tempCompareItems.forEach((item) => {
      this.compareLength.push(i);
      this.chartService.getLists(this.cmsApi.byPlaySectionChart + 'ft_seq=' + item.ft_seq + '&sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
        .then((list) => {
          const tempLabel:any[] = list['label'].map((label) => {
            return label + '%';
          });
          this.comparePlaySectionData.push({
            labels: tempLabel,
            datasets: [{
              label: item['contentsName'],
              data: list['data'],
              fill: true,
            }],
          });
          if (this.comparePlaySectionData) {
            let j = 0;
            this.comparePlaySectionData.forEach((item) => {
              item.datasets[0]['borderColor'] = tborderColors[j];
              item.datasets[0]['backgroundColor'] = tbackgroundColors[j];
              j += 1;
            });
          }
        });
      i += 1;
    });

    this.chartOptions = {
      legend: {
        position: 'bottom',
      },
      elements: {
        line: {
          tension: 0,
        },
      },
    };
  }

  // 재생 수 기준 정렬 시 테이블 인덱스 정의
  setTableIndex(e:any) {
    e.data.sort((data1, data2) => {
      const value1 = data1[e.field];
      const value2 = data2[e.field];
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (e.order * result);
    });
    let i = 1;
    this.playSectionStatisticsDatas.forEach((item) => {
      item['no'] = i;
      i += 1;
    });
  }
}
