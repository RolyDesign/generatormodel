import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModePreferenceService {

  private mode = new BehaviorSubject<string>('light')
  constructor() { }

  getMode(){
    return this.mode.asObservable()
  }

  set setMode(value: string){
    this.mode.next(value)
    window.localStorage.setItem("eva-app-mode", value)
  }
}
