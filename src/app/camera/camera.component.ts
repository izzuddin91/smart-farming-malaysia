import { Component, OnInit, Renderer2 } from '@angular/core';
import firebase from 'firebase';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  time : String =  ''
  camera_status : String =  ''
  camera_timestamp : String = ''
  image: any
  app : any
  constructor(private renderer: Renderer2) {
    
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
            this.time = retrieve_val['time']
            this.camera_status = retrieve_val['camera_status']
            this.camera_timestamp = retrieve_val['camera_timestamp']
            this.image = retrieve_val['image']
          

            const base64 = this.image;
const imageName = 'image.png';
const imageBlob = this.dataURItoBlob(base64);
const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
importedSaveAs(imageFile, 'image');
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });

        // const degree = 90;
        
        

        
   }

  ngOnInit(): void {
    document.getElementById("image").style.transform = 'rotate(90deg)';
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }

  

}
