/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'by-play-section',
  templateUrl: './by-play-section.component.html',
  styleUrls: ['../../play-statistics.component.css']})

export class ByPlaySectionComponent implements OnInit, OnChanges {
  @Input() pathName;
  @Input() selectDuration;
  @Input() selectFolder;

  public isCompareStatus:boolean = false;

  public chartType:string = 'line';
  public chartLabels:any[] = [];
  public chartData:any[] = [];
  public chartOptions: any;
  public dateArray:any[] = [];
  public tableLists:any[] = [];
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
    { header: 'No', field: 'no' },
    { header: '그룹명', field: 'groupName' },
    { header: '폴더명', field: 'folderName' },
    { header: '콘텐츠명', field: 'contentsName' },
    { header: '영상 시간', field: 'videoTime' },
    { header: '재생시간', field: 'playTime' },
    { header: '재생수', field: 'playCount' },
    { header: '재생율', field: 'playRate' },
    { header: '등록일', field: 'updateDate' },
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

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.setChartType();
    this.setChartData();
    this.setTableData();
    this.tempCompareItems = [this.playSectionStatisticsDatas[0]];
    this.compareItems = this.tempCompareItems;
    this.showPlaySectionResult();
  }

  setChartType() {
    const temp = document.getElementsByClassName('changeType');
    for (let i = 0 ; i < temp.length ; i += 1) {
      if (i === 0) {
        temp[i].setAttribute('class', 'changeType on');
      } else {
        temp[i].setAttribute('class', 'changeType');
      }
    }
  }

  setChartData() {
    this.chartLabels = [];
    this.chartData = [];
    const startDate = new Date(this.selectDuration.date[0]);
    const endDate = new Date(this.selectDuration.date[1]);

    this.dateArray = this.getDateArray(startDate, endDate);
    this.dateArray.forEach((item) => {
      const random = Math.floor(Math.random() * 10000);
      this.chartLabels.push((item.getMonth() + 1) + '/' + item.getDate());
      this.chartData.push(random);
    });
  }

  setTableData() {
    this.tableLists = [];
    this.dateArray.forEach((item) => {
      this.tableLists.push({ date: item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + item.getDate(), empty: '0' });
    });
    this.playSectionStatisticsDatas = [];
    this.playSectionStatisticsDatas.push(
      { no: 1,
        groupName: 'GXP',
        folderName: '사회',
        contentsName: '토익1강',
        videoTime: 30,
        playTime: '08:13:23',
        playCount: Math.floor(Math.random() * 10000),
        playRate: 10,
        updateDate: '2018-09-09',
      });
    this.playSectionStatisticsDatas.push(
      { no: 2,
        groupName: 'GXP',
        folderName: '사회',
        contentsName: '토익2강',
        videoTime: 30,
        playTime: '08:13:23',
        playCount: Math.floor(Math.random() * 10000),
        playRate: 10,
        updateDate: '2018-09-09',
      });
  }

  getDateArray(startDate, endDate) {
    const dateArray:any[] = [];
    const currentDate = startDate;
    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
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
    if (this.tempCompareItems.length === 0) {
      this.compareSectionDatas = [];
      this.comparePlaySectionData = [];
      return 0;
    }
    this.compareSectionDatas = [];
    let i = 0;
    let tempCompareDatas:any[] = [];
    this.dateArray.forEach((date:Date) => {
      tempCompareDatas = [];
      this.tempCompareItems.forEach((item) => {
        tempCompareDatas.push({
          no: item.no,
          contentsName: item.contentsName,
          date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()),
          p10: Math.floor(Math.random() * 1000),
          p20: Math.floor(Math.random() * 1000),
          p30: Math.floor(Math.random() * 1000),
          p40: Math.floor(Math.random() * 1000),
          p50: Math.floor(Math.random() * 1000),
          p60: Math.floor(Math.random() * 1000),
          p70: Math.floor(Math.random() * 1000),
          p80: Math.floor(Math.random() * 1000),
          p90: Math.floor(Math.random() * 1000),
          p100: Math.floor(Math.random() * 1000),
          index: i,
        });
        i += 1;
      });
      this.compareSectionDatas.push(tempCompareDatas);
    });
    this.setAverageData();
    this.getPopularOrLeaveSection();
    this.setCompareSectionChartData();
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
          tempData['p10'] = tempData['p10'] + this.compareSectionDatas[i][j]['p10'];
          tempData['p20'] = tempData['p20'] + this.compareSectionDatas[i][j]['p20'];
          tempData['p30'] = tempData['p30'] + this.compareSectionDatas[i][j]['p30'];
          tempData['p40'] = tempData['p40'] + this.compareSectionDatas[i][j]['p40'];
          tempData['p50'] = tempData['p50'] + this.compareSectionDatas[i][j]['p50'];
          tempData['p60'] = tempData['p60'] + this.compareSectionDatas[i][j]['p60'];
          tempData['p70'] = tempData['p70'] + this.compareSectionDatas[i][j]['p70'];
          tempData['p80'] = tempData['p80'] + this.compareSectionDatas[i][j]['p80'];
          tempData['p90'] = tempData['p90'] + this.compareSectionDatas[i][j]['p70'];
          tempData['p100'] = tempData['p100'] + this.compareSectionDatas[i][j]['p100'];
        } else {
          tempData2['index'] = j;
          tempData2['date'] = this.selectDuration['date'][0] + ' ~ ' + this.selectDuration['date'][1];
          tempData2['contentsName'] = this.compareSectionDatas[i][j]['contentsName'];
          tempData2['p10'] = tempData2['p10'] + this.compareSectionDatas[i][j]['p10'];
          tempData2['p20'] = tempData2['p20'] + this.compareSectionDatas[i][j]['p20'];
          tempData2['p30'] = tempData2['p30'] + this.compareSectionDatas[i][j]['p30'];
          tempData2['p40'] = tempData2['p40'] + this.compareSectionDatas[i][j]['p40'];
          tempData2['p50'] = tempData2['p50'] + this.compareSectionDatas[i][j]['p50'];
          tempData2['p60'] = tempData2['p60'] + this.compareSectionDatas[i][j]['p60'];
          tempData2['p70'] = tempData2['p70'] + this.compareSectionDatas[i][j]['p70'];
          tempData2['p80'] = tempData2['p80'] + this.compareSectionDatas[i][j]['p80'];
          tempData2['p90'] = tempData2['p90'] + this.compareSectionDatas[i][j]['p70'];
          tempData2['p100'] = tempData2['p100'] + this.compareSectionDatas[i][j]['p100'];
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
    const tempData:any[] = [];
    const tborderColors:any[] = ['#ffcdd2', '#e1bee7'];
    const tbackgroundColors:any[] = ['rgba(255,205,210,.2)', 'rgba(225,190,231,.2)'];
    this.compareSectionAverageData.forEach((item) => {
      tempData.push([item['p10'], item['p20'], item['p30'], item['p40'], item['p50'], item['p60'], item['p70'], item['p80'], item['p90'], item['p100']]);
    });
    let i = 0;
    this.compareSectionAverageData.forEach((item) => {
      this.compareLength.push(i);
      this.comparePlaySectionData.push({
        labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
        datasets: [{
          label: item['contentsName'],
          data: tempData[i],
          fill: true,
          borderColor: tborderColors[i],
          backgroundColor: tbackgroundColors[i],
        }],
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

  setTableIndex(e: SortEvent) {
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
