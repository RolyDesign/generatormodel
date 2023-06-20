import { Component } from '@angular/core';
import { Mode } from '../shared/meta-data';
import { ModePreferenceService } from '../shared/mode-preference.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent {
  mode$ = this.modeSvc.getMode()
  modes = Mode
  /**
   *
   */
  constructor(private modeSvc: ModePreferenceService) {}
}
