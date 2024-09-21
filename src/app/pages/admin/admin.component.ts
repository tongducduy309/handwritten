import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL, getBlob } from "firebase/storage";
import { environment } from '../../environment';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit {
  // private readonly storage: any = inject(Storage);
  storage = getStorage();
  // storageRef = ref(this.storage, 'image-handwritten');
  data:any={
    link:'normal',
    id:'',
    label:123
  }

  waiting = 0
  value =''
  fallback = 'data:image/png;base64,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';

  needVImages:any = []

  selectedFiles:any=[]

  waiting_ver = 0;

  link_root = ''



  constructor (private crud:CrudService, private routed: ActivatedRoute, private router :Router){
    this.link_root = environment.firebase.storageBucket
  }

  ngOnInit(): void {
    this.routed.paramMap.subscribe((params: any) => {
      let command = params.get('param');
      
      switch (command){
        case 'delete':
          this.deleteImagesVerified();
          break;

        case 'download':
          this.downloadImagesVerified();
          break;
        default:
          this.getImages()
      }
    });

  }

  async deleteImagesVerified(){
    await this.getImages();

    

    await this.crud.getImages().subscribe((images)=>{
      this.needVImages = []
      images.forEach((image)=>{
        if (image.verified)
          this.needVImages.push(image)
      })
      if (this.needVImages.length>0){
        this.needVImages.forEach(async (image:any)=>{
          
          const desertRef = ref(this.storage, `image-handwritten/${image.link}`);
          deleteObject(desertRef)
          this.crud.deleteData("images",image.id);
        })
        
      }
      this.router.navigate(['admin'])

    })
  }

  async downloadImagesVerified(){
    await this.crud.getImages().subscribe((images)=>{
      this.needVImages = []
      console.log(images);
      images.forEach((image)=>{
        if (image.verified)
          this.needVImages.push(image)
      })
      if (this.needVImages.length>0)
      {
        console.log("Download");
        this.download()
      }
      else this.router.navigate(['admin'])
    })
    
  }

  getRandomInt(min:any, max:any) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }


  async getImages(){
     await this.crud.getImages().subscribe((images)=>{
      this.needVImages = []
      this.waiting_ver = 0;
      console.log(images);
      images.forEach((image)=>{
        if (!image.verified && image.label!='')
          this.needVImages.push(image)
        if (!image.verified && image.label=='')
          this.waiting_ver++;
      })
      this.waiting = this.needVImages.length;
      if (this.waiting>0){
        this.nextData();
      }

    })
  }

  nextData(){
    let n = this.getRandomInt(0,this.needVImages.length);
    this.data = this.needVImages[n];
    const storageRef = ref(this.storage, `image-handwritten/${this.data.link}`);
    getDownloadURL(storageRef)
  .then((url) => {
    this.data.img = url
  })
  .catch((error) => {
    // Handle any errors
  });

  }
  async confirm(){
    await this.crud.updateData("images",this.data.id,{verified:true})
  }

  async cancelLabel(){
    await this.crud.updateData("images",this.data.id,{label:''})
  }

  deleteData(){
    this.crud.deleteData("images",this.data.id)
    const desertRef = ref(this.storage, `image-handwritten/${this.data.link}`);

    // Delete the file
    deleteObject(desertRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  }

  formatEncode(n:any,a:any){
    let code=['A','B','C','D','E','F','G','H','I','J'];
    let s=n+"";
    while (s.length<a) s='0'+s;
    let x='';
    for (let i=0;i<a;i++) x+=code[parseInt(s[i])];


    return x;
}
  createID(){
    let date = new Date();
    let d=[date.getDate(),date.getMonth(),(date.getFullYear()+"").slice(2,4),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds()];
    let n=[2,2,2,2,2,2,4];
    let id='#';
    for (let i=0;i<d.length;i++) id+=this.formatEncode(d[i],n[i]);
    return id;
  }

  onFilesSelected(event: any) {
    if (!event.target.files) return

        const files: FileList = event.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            const id = this.createID();
            const n = file?.name.indexOf(".")
            const newName = id+file?.name.slice(n);
            console.log(newName);
            if (file) {
                const storageRef = ref(this.storage, `image-handwritten/${newName}`);
                // uploadBytesResumable(storageRef, file);
                uploadBytes(storageRef, file).then(async (snapshot) => {
                  await this.crud.addData("images",{link:newName,verified:false,label:''})
                });
            }
        }
  }


  async download(){
    const zip = new JSZip();
    let data: any[] = []
    let imageUrlArray: any[] = []
    this.needVImages.forEach((image:any)=>{
      data.push({label:image.label,img:image.link})
      imageUrlArray.push(image.link)

      // getBlob(storageRef)
      // .then((blob) => {
      //   zip.file("c.png", blob, { base64: true })
      // })
      // .catch((error) => {
      //   // Handle any errors
      // });
    })

    const imagePromises = imageUrlArray.map(async (imageUrl) => {
      const storageRef = ref(this.storage, `image-handwritten/${imageUrl}`);
      const blob = getBlob(storageRef)
      

      return { name: imageUrl, content: blob};
       // Customize image name
    });

    const imageData = await Promise.all(imagePromises);

    imageData.forEach((image) => {
      zip.file(image.name, image.content, { base64: true });
    });

    const blob = new Blob([this.generateCSV(data)], { type: 'text/csv' });

    zip.file('data.csv',blob);

    const content = await zip.generateAsync({ type: "blob" });

    // Tạo một URL object
    const url = URL.createObjectURL(content);

    // Tạo một thẻ <a> và kích hoạt download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my_data.zip';
    link.click();

    // Hủy URL object
    URL.revokeObjectURL(url);
    this.router.navigate(['admin'])

  }

  generateCSV(data: any[]): string {
    const columns = Object.keys(data[0]);
    const rows = data.map(row => columns.map(col => row[col]));

    const csv = [columns, ...rows].map(row => row.join(',')).join('\n');
    return csv;
  }

}
