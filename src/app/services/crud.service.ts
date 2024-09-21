import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  images!: Observable<any[]>;
  constructor(private firestore:AngularFirestore) {

  }

  getDataChange(collection:any){
    return this.firestore.collection(collection).snapshotChanges().pipe(map((actions: any[]) =>
      actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      //console.log(data);
      //if (!data._id)data._id=id;
      return { id,...data };
      }
    )
  ))
  }





  addData(collection:any,value:any){
    return this.firestore.collection(collection).add(value);
  }

  addNewData(collection:any,id:any,value:any){
    return this.firestore.doc(collection+`/${id}`).set(value);
  }

  deleteAllData(collection:any){
    this.firestore.doc(collection).delete();
  }

  deleteData(collection:any,_id:any) {
    this.firestore.doc(collection+`/${_id}`).delete();
  }

  getAllData(collection:any) {
    return new Promise<any>((resolve)=> {
    this.firestore.collection(collection).valueChanges({ idField: 'id' }).subscribe(data => resolve(data));
    })
  }
  async getDataByDID(collection:any,_id:any){

    return this.firestore.doc(`${collection}/${_id}`).get();

  }
  updateData(collection:any,_id:any,value:any) {
    return this.firestore.doc(collection+`/${_id}`).update(value);
  }


  getImages(){
    if (!this.images)
      this.images=this.getDataChange('images');
      return this.images;
  }
}
