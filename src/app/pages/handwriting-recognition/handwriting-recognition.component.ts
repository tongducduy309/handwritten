import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-handwriting-recognition',
  templateUrl: './handwriting-recognition.component.html',
  styleUrls: ['./handwriting-recognition.component.scss']
})
export class HandwritingRecognitionComponent {
  pixels: Uint8ClampedArray | null = null;

  ngOnInit() {
  // Handle image input changes here if needed
  }

  constructor(private http: HttpClient){

  }

  handleImage(event:any) {
    const formData = new FormData();
      formData.append('image', event.target.files[0]);
      console.log(formData);
      this.http.post('http://your-api-url/upload', formData)
        .subscribe(
          (response) => {
            console.log('Image uploaded successfully:', response);
          },
          (error) => {
            console.error('Error uploading image:', error);  

          }
        );
  }

}
