import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  date: any;
  dateString: string;
  time: any;
  timeString: string;
  message: string;

  constructor(private datepicker: DatePicker, private alertCtrl: AlertController, private localnotifications: LocalNotifications) {}

  selectDate() {

    this.datepicker.show({
      date: new Date(),
      mode: 'date',
      todayText: 'Today',
      androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then((date) => {
      this.date = date;
      this.dateString = new Date(date).toLocaleDateString();
    }).catch((err) => {
      this.createAlert(err);
    });

  }

  selectTime() {

    this.datepicker.show({
      date: new Date(),
      mode: 'time',
      nowText: 'Now',
      is24Hour: true,
      androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then((time) => {
      this.time = time;
      this.timeString = new Date(time).toLocaleTimeString();
    }).catch((err) => {
      this.createAlert(err);
    });

  }

  setNotification() {

    const datetime = new Date(this.date);
    const time = new Date(this.time);
    datetime.setHours(time.getHours());
    datetime.setMinutes(time.getMinutes());

    this.localnotifications.schedule({
      id: Math.floor(Math.random() * 100),
      title: 'Local Notification',
      text: this.message,
      led: 'FF0000',
      at: new Date(datetime),
      priority: 2
    });

    this.createAlert("Notification Scheduled Successfully");

    this.timeString = null;
    this.dateString = null;
    this.message = null;

  }

  createAlert(msg: string) {

    const alert = this.alertCtrl.create({
      title: 'Alert',
      message: msg
    });

    alert.present();

  }

}
