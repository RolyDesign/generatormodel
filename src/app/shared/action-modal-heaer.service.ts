import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionModalHeaerService {
private acctionSubject = new BehaviorSubject<string>('')
getAction$ = this.acctionSubject.asObservable()
set action(value: string){
this.acctionSubject.next(value)
}

private messageModalSubject = new BehaviorSubject<string>('')
getmessageModal$ = this.messageModalSubject.asObservable()
set messageModal(value: string){
this.messageModalSubject.next(value)
}

private idModalSubject = new BehaviorSubject<string>('')
getidModal$ = this.idModalSubject.asObservable()
set idModal(value: string){
this.idModalSubject.next(value)

}

  constructor() { }

}
