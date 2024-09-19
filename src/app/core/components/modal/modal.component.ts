import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  type!: string;
  title!: string;
  message!: string;
  button!: string;

  open(): Observable<String>{
    const meuObservable : Observable<String>  = new Observable(observer => {
      alert("Modal aberto");
      observer.next("Modal fechado");
      observer.complete();
    })
    return meuObservable;
  }
}
