import { Component, OnInit, Input, Output, ElementRef, Renderer2, forwardRef, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  providers: [DatePipe, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
  }],
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  inputFieldValue: string = null;
  isInputFocused: boolean = false;
  calendarVisible: boolean= false;
  datePickerClick: boolean = false;
  inputSize: number;
  selectedDate: any[]; // ['0000-00-00', '0000-00-00']
  selectedDateFromPcalendar: Date[]; // from calendar select, unix date type
  tempSelectedDate: any[]; // temp before apply
  selectedRange: object;
  tempSelectedRange: object; // temp for when cancel
  defaultRanges: any[] = [
    {value: 't', text: '오늘', setDate: () => {
      const today = new Date();
      this.selectedDate = [this.datePipe.transform(today, 'yyyy-MM-dd'), this.datePipe.transform(today, 'yyyy-MM-dd')];
    }},
    {value: 'y', text: '어제', setDate: () => {
      let curr = new Date();
      let yesterday = curr.getDate() - 1;
      this.selectedDate = [this.datePipe.transform(new Date().setDate(yesterday), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(yesterday), 'yyyy-MM-dd')];
    }},
    {value: 'l-7days', text: '최근 7일', setDate: () => {
      let curr = new Date();
      let start = curr.getDate() - 7;
      let yesterday = curr.getDate() - 1;
      this.selectedDate = [this.datePipe.transform(new Date().setDate(start), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(yesterday), 'yyyy-MM-dd')];
    }},
    {value: 't-week-0', text: '이번 주(일-어제)', setDate: () => {
      let curr = new Date();
      let sunday = curr.getDate() - curr.getDay();
      let yesterday = curr.getDate() - 1;
      this.selectedDate = [this.datePipe.transform(new Date().setDate(sunday), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(yesterday), 'yyyy-MM-dd')];
    }},
    {value: 't-week-1', text: '이번 주(월-어제)', setDate: () => {
      let curr = new Date();
      let monday = curr.getDate() - curr.getDay() + 1;
      let yesterday = curr.getDay() === 1 ? monday : curr.getDate() - 1 ;
      this.selectedDate = [this.datePipe.transform(new Date().setDate(monday), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(yesterday), 'yyyy-MM-dd')];
    }},
    {value: 'l-week-0', text: '지난 주(일-토)' , setDate: () => {
      let curr = new Date();
      let lastSunday = curr.getDate() - curr.getDay() - 7;
      let lastSaturday = curr.getDate() - curr.getDay() - 1;
      this.selectedDate = [this.datePipe.transform(new Date().setDate(lastSunday), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(lastSaturday), 'yyyy-MM-dd')];
    }},
    {value: 'l-week-1', text: '지난 주(월-일)', setDate: () => {
      let curr = new Date();
      let lastMonday = curr.getDate() - curr.getDay() - 6;
      let lastSunday = curr.getDate() - curr.getDay();
      this.selectedDate = [this.datePipe.transform(new Date().setDate(lastMonday), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(lastSunday), 'yyyy-MM-dd')];
    }},
    {value: 'l-week-2', text: '지난 영업주(월-금)', setDate: () => {
      let curr = new Date();
      let lastMonday = curr.getDate() - curr.getDay() - 6;
      let lastFriday = curr.getDate() - curr.getDay() - 2 ;
      this.selectedDate = [this.datePipe.transform(new Date().setDate(lastMonday), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(lastFriday), 'yyyy-MM-dd')];
    }},
    {value: '1-14days', text: '지난 14일', setDate: () => {
      let curr = new Date();
      let start = curr.getDate() - 14;
      let yesterday = curr.getDate() - 1;
      this.selectedDate = [this.datePipe.transform(new Date().setDate(start), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(yesterday), 'yyyy-MM-dd')];
    }},
    {value: 'l-30days', text: '지난 30일', setDate: () => {
      let curr = new Date();
      let start = curr.getDate() - 30;
      let yesterday = curr.getDate() - 1;
      this.selectedDate = [this.datePipe.transform(new Date().setDate(start), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(yesterday), 'yyyy-MM-dd')];
    }},
    {value: 't-month', text: '이번 달', setDate: () => {
      let curr = new Date();
      let start = new Date(curr.getFullYear(), curr.getMonth(), 1);
      let last = (curr.getDate() === start.getDate())? start : new Date().setDate(curr.getDate() - 1);
      this.selectedDate = [this.datePipe.transform(start, 'yyyy-MM-dd'), this.datePipe.transform(last, 'yyyy-MM-dd')];
    }},
    {value: 'l-month', text: '지난 달', setDate: () => {
      let curr = new Date();
      let start = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
      let last =  new Date(curr.getFullYear(), curr.getMonth(), 0);
      this.selectedDate = [this.datePipe.transform(start, 'yyyy-MM-dd'), this.datePipe.transform(last, 'yyyy-MM-dd')];
    }},
    {value: 't-quarter', text: '이번 분기', setDate: () => {
      let curr = new Date();
      let quarter = Math.floor((curr.getMonth() + 3) / 3);
      let endMonth = 3 * quarter,
        startMonth = endMonth - 2;
      let start = new Date(curr.getFullYear(), startMonth -1, 1);
      let yesterday = curr.getDate() - 1;
      this.selectedDate = [this.datePipe.transform(start, 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(yesterday), 'yyyy-MM-dd')];
    }},
    {value: 'l-quarter', text: '지난 분기' , setDate: () => {
      let curr = new Date();
      let quarter = Math.floor((curr.getMonth() + 3) / 3);
      let lastQuarter = (quarter === 1)? 4 : quarter - 1;
      let endMonth = 3 * lastQuarter,
        startMonth = endMonth - 2;
      let start = (lastQuarter === 4)? new Date(curr.getFullYear() - 1, startMonth -1, 1) : new Date(curr.getFullYear(), startMonth -1, 1);
      let last = (lastQuarter === 4)? new Date(curr.getFullYear() - 1, endMonth, 0) : new Date(curr.getFullYear(), endMonth, 0);
      this.selectedDate = [this.datePipe.transform(start, 'yyyy-MM-dd'), this.datePipe.transform(last, 'yyyy-MM-dd')];
    }},
    {value: 't-year', text: '이번 년도' , setDate: () => {
      let curr = new Date();
      let start = new Date(curr.getFullYear(), 0, 1);
      let last = (curr.getFullYear() === start.getFullYear() && curr.getMonth() === start.getMonth() && curr.getDate() === start.getDate())? start : new Date().setDate(curr.getDate() - 1);
      this.selectedDate = [this.datePipe.transform(start, 'yyyy-MM-dd'), this.datePipe.transform(last, 'yyyy-MM-dd')];
    }},
    {value: 'set', text: '기간설정'},
  ];
  @Input() ranges: object[]; //from high component
  @Input() range: string;    //from high component
  localeObject: object = {
    firstDayOfWeek: 0,
    dayNamesMin: ['일','월','화','수','목','금','토'],
    monthNames: [ '01','02','03','04','05','06','07','08','09','10','11','12' ],
  };
  yearRange: string = `${new Date().getFullYear() - 3}:${new Date().getFullYear()}`;
  documentClickListener: any;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};
  @Input() readonly: boolean = false;
  @Output() onSelect = new EventEmitter<Object>();


  constructor(private datePipe: DatePipe, private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    //initRangeList
    //init Range and DatefromSelectedRange
    this.initRangeList();
    this.initSelectedRange();
    this.changeCalendarDate();

    if(!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
        if(!this.datePickerClick && this.isInputFocused) {
          this.isInputFocused = false;
          this.calendarVisible = false;
        }
        this.datePickerClick = false;
      });
    }
  }

  initRangeList(): void {
    let thisPickerRange = [];
    if(this.ranges) {
      for(let i of this.ranges) {
        for(let j of this.defaultRanges) {
          if(i === j['value']) thisPickerRange.push(j);
        }
      }
      this.ranges = thisPickerRange;
    }
    else {
      this.ranges = this.defaultRanges;
    }
  }
  initSelectedRange(): void {
    if(this.range) {
      for(let defaultRange of this.defaultRanges) {
        if(this.range === defaultRange['value']) {
          this.selectedRange = defaultRange;
          if (typeof this.selectedRange['setDate'] === 'function') this.selectedRange['setDate']();
          this.setInputField();
          break;
        }
      }
    } else {
      this.selectedRange = this.ranges[0];
      if (typeof this.selectedRange['setDate'] === 'function') this.selectedRange['setDate']();
      this.setInputField();
    }
    this.tempSelectedDate = [this.selectedDate[0], this.selectedDate[1]];
    this.updateModel();
  }

  changeCalendarDate(): void {
    //model -> view
    if(this.selectedDate) {
      this.selectedDateFromPcalendar = [new Date(this.selectedDate[0]), new Date(this.selectedDate[1])];
    }
  }

  setInputField(): void {
    this.inputFieldValue = `${this.selectedRange['text']} : ${this.selectedDate[0]} ~ ${this.selectedDate[1]}`;
    this.inputSize = this.inputFieldValue.length >= 30 ? this.inputFieldValue.length + 2 : this.inputFieldValue.length;
  }

  inputFieldClick(): void {
    if (this.readonly) return;
    this.isInputFocused = true;
    this.datePickerClick = true;

    if (this.selectedRange['value'] === 'set') this.setCalendarPosition();
  }

  setCalendarPosition(): void {
    const calendarWidth = 270;
    const screenWidth = window.screen.width;
    const thisWidth = this.elRef.nativeElement.offsetWidth;
    const thisClientRectLeft = this.elRef.nativeElement.getBoundingClientRect().left;
    let calendarElement = this.elRef.nativeElement.querySelector('.calendar-container');

    if (thisClientRectLeft < calendarWidth) {
      //rightside
      calendarElement.style.right = '';
      calendarElement.style.left = thisWidth + 'px';

    } else {
      //leftside
      calendarElement.style.left = '';
      calendarElement.style.right = thisWidth + 'px';
    }
  }

  rangeClick(range: object): void {
    this.tempSelectedRange = this.selectedRange;
    this.selectedRange = range;

    if(range['value']!=='set') {
      if(typeof range['setDate'] === 'function' )range['setDate']();
      this.setInputField();
      this.changeCalendarDate();
      this.isInputFocused = false;
      this.calendarVisible = false;
      this.updateModel();
      this.onSelect.emit({
        'range' : this.selectedRange['value'],
        'date' : this.selectedDate
      });
    } else {
      this.calendarVisible = true;
      this.setCalendarPosition();
    }
    if (this.selectedDate[0] instanceof Date) {
      this.selectedDate[0] = this.datePipe.transform(this.selectedDate[0], 'yyyy-MM-dd');
      this.selectedDate[1] = this.datePipe.transform(this.selectedDate[1], 'yyyy-MM-dd');
    }
    this.tempSelectedDate = [this.selectedDate[0], this.selectedDate[1]];

  }

  calendarSelect(selectedDate: Date): void {
    this.tempSelectedDate[0] = this.datePipe.transform(this.selectedDateFromPcalendar[0], 'yyyy-MM-dd');
    this.tempSelectedDate[1] = this.selectedDateFromPcalendar[1] ? this.datePipe.transform(this.selectedDateFromPcalendar[1], 'yyyy-MM-dd') : '';
  }

  applyCalendar(): void {
    if(this.selectedRange['value'] === 'set') {
      if(this.selectedDateFromPcalendar[1] === null) {
        this.selectedDateFromPcalendar[1] = this.selectedDateFromPcalendar[0];
        this.tempSelectedDate[1] = this.tempSelectedDate[0];
      }
      this.selectedDate = [this.tempSelectedDate[0], this.tempSelectedDate[1]];
      this.setInputField();
      this.onSelect.emit({
        'range' : this.selectedRange['value'],
        'date' : this.selectedDate
      });
    }
    this.calendarVisible = false;
    this.isInputFocused = false;
    this.updateModel();
  }

  cancelCalendar(): void {
    if(this.selectedRange['value'] === 'set') this.selectedRange = this.tempSelectedRange;
    this.calendarVisible = false;
    this.isInputFocused = false;
  }

  onDropDownClick(): void {
    this.datePickerClick = true;
  }

  // input in calenar for later
  // onInputKeyup($event): void {
  //   return;
  //   let regexp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;
  // }

  ngOnDestroy() {
    if(this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  updateModel(): void {
    let value: object = {
      'range' : this.selectedRange['value'],
      'date' : this.selectedDate
    };
    this.onModelChange(value);
  }

  writeValue(value: any) : void {
    // model->view
    // value : {'range': 'range.value' , 'date' :  [Date, Date] || ['0000-00-00', '0000-00-00']}
    if (!value) return;

    if (value.hasOwnProperty('range')) {
      let range = value['range'];
      if(range) {
        for(let defaultRange of this.defaultRanges) {
          if(range === defaultRange['value']) {
            this.selectedRange = defaultRange;
            if (typeof this.selectedRange['setDate'] === 'function') this.selectedRange['setDate']();
            this.setInputField();
            this.changeCalendarDate();
            break;
          }
        }
      }

    } else if (value.hasOwnProperty('date')) {
      let date = value['date'];

      if(date[0] instanceof Date) {
        this.selectedDate = date.length === 1 ?
          [this.datePipe.transform(date[0], 'yyyy-MM-dd'), this.datePipe.transform(date[0], 'yyyy-MM-dd')]
          :[this.datePipe.transform(date[0], 'yyyy-MM-dd'), this.datePipe.transform(date[1], 'yyyy-MM-dd')]
      } else if (typeof date[0] === 'string') {
        this.selectedDate = Array.prototype.slice.call(date);
      }
      this.selectedRange = this.defaultRanges[this.defaultRanges.length - 1];
      this.setInputField();
      this.changeCalendarDate();
    } else
      return;
    this.tempSelectedDate = [this.selectedDate[0], this.selectedDate[1]];
  }

  registerOnChange(fn: Function): void {
    //view->model
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }


}

