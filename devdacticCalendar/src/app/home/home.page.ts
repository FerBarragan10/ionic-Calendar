import { Component, ViewChild, OnInit, LOCALE_ID ,Inject } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Title } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  event = {
    title:'',
    desc:'',
    startTime:'',
    endTime:'',
    allDay:false
  };
  minDate= new Date().toISOString();
  eventSource=[];

  calendar={
   mode:'month',
 
   currentDate: new Date()
    }
  viewTitle='';
  @ViewChild(CalendarComponent,{static: false}) myCal: CalendarComponent;
  constructor(private alertCtrl:AlertController, @Inject(LOCALE_ID) private locale ){}

  ngOnInit(){
    this.resetEvent();
  }

  resetEvent(){
    this.event={
    title:'',
    desc:'',
    startTime:new Date().toISOString(),
    endTime:new Date().toISOString(),
    allDay:false
    }
  }
  addEvent(){
    let eventCopy={
      title:this.event.title,
    startTime:new Date(this.event.startTime),
    endTime:new Date(this.event.endTime),
    allDay:this.event.allDay,
    desc:this.event.desc
    }
    if(this.event.allDay){
      let start=eventCopy.startTime;
      eventCopy.startTime=new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth(),start.getUTCDate()));

    }
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  changeMode(mode){
   this.calendar.mode= mode;

  }
    back(){
      var swiper=document.querySelector('.swiper-container')['swiper'];
      swiper.slidePrev();
    }
    next(){
      var swiper=document.querySelector('.swiper-container')['swiper'];
      swiper.slideNext();
    }
    today(){
      this.calendar.currentDate=new Date();
    }
  async onEventSelected(event){
    let start=formatDate(event.startTime,'medium',this.locale);
    let end=formatDate(event.endTime,'medium',this.locale)
    
    const alert=await this.alertCtrl.create({
      header:event.title,
      subHeader:event.desc,
      message:'From: ' + start + '<br><br>To: ' +end,
      buttons:['ok']
     });
     alert.present();
  }
  onViewTitleChanged(title){
    this.viewTitle=title;
  }

  onTimeSelected(ev){
    let selected =new Date(ev.selectedTime)
    this.event.startTime=selected.toISOString();
    selected.setHours(selected.getHours()+1);
    this.event.endTime=(selected.toISOString());
  }
}
