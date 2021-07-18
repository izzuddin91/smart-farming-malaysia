import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  temperature : String =  ''
  humidity : String =  ''
  water_level : String = ''
  app : any
  constructor() {
    
    if (!firebase.apps.length) {
      this.app =  firebase.initializeApp({ 
        apiKey: "AIzaSyDFV8JWL4z4zvkT-RXOrdZy0WW9QvT1XMo",
        authDomain: "etiqa-sme-bizcareplus.firebaseapp.com",
        databaseURL: "https://etiqa-sme-bizcareplus.firebaseio.com",
        projectId: "etiqa-sme-bizcareplus",
        storageBucket: "etiqa-sme-bizcareplus.appspot.com",
        messagingSenderId: "1008389970494",
        appId: "1:1008389970494:web:e16b2c1d7afcb55263cf6f"
       });
   }else {
    this.app = firebase.app(); // if already initialized, use that one
   }
        this.app.database().ref('record').get().then((snapshot) => {
          if (snapshot.exists()) {
           console.log(snapshot.val())
            var retrieve_val = snapshot.val()
            this.temperature = retrieve_val['temperature']
            this.humidity = retrieve_val['humidity']
            this.water_level = retrieve_val['water_level']
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
   }

  ngOnInit(): void {
  }

}
