import { Component, OnInit, Renderer2 } from '@angular/core';
import firebase from 'firebase';
import {saveAs as importedSaveAs} from "file-saver";
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(90deg)' })),
      state('rotateLeft', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
  ])
]
})
export class CameraComponent implements OnInit {
  state: string = 'default';
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
            this.state = (this.state === 'default' ? 'rotated' : 'default');


          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });

        // const degree = 90;
        this.state = (this.state === 'default' ? 'rotated' : 'default');
        

        
   }

   downloadImage(){
    var a = new Date();

    var currentDateString = (a.getDate())+ '/'+ (a.getMonth()+1) + '/'+ a.getFullYear();
const base64 = this.image;
const imageName = `image-${currentDateString}.png`;
const imageBlob = this.dataURItoBlob(base64);
const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
importedSaveAs(imageFile, `image-${currentDateString}`);
   }

   rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
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
