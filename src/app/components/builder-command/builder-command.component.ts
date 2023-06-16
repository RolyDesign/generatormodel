import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { TemplatesOptions, VALIDATION_FORMS } from 'src/app/shared/meta-data';

@Component({
  selector: 'app-builder-command',
  templateUrl: './builder-command.component.html',
  styleUrls: ['./builder-command.component.scss'],
})
export class BuilderCommandComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  builderCommand!: FormGroup;
  templateOptions = [TemplatesOptions.coreui];
  validationForms = VALIDATION_FORMS;
  command!: string;
  iconCopy = faCopy;
  copied = false;
  ngOnInit(): void {
    this.builderCommand = this.fb.group({
      builderModeGroup: this.fb.group({
        builderMode: ['app-with-evaproj'],
      }),
      appTemplates: [TemplatesOptions.coreui],
      configEntities: this.fb.group({
        isModuleOrStandalone: ['simple'],
      }),
      isInMemory: false,
      pathFileEvaProj: ['', [Validators.required]],
      pathDirEntities: ['', [Validators.required]],
      nameApp: ['', [Validators.required]],
      pathDirAngularProj: ['', [Validators.required]],
      pathfileEntity: ['', [Validators.required]],
    });
    this.buildCommandText();
    this.builderCommand.valueChanges.subscribe((res) => {
      this.buildCommandText();
      this.builderCommand.markAsUntouched();
      this.copied = false
    });
  }

  buildCommandText() {
    if (
      this.builderCommand?.get('builderModeGroup.builderMode')?.value ==
      'app-with-evaproj'
    ) {
      this.command = `eva new a
      -t
      ${this.builderCommand.get('appTemplates')?.value || '<AppTemplate>'}
      -f
      "${
        this.builderCommand.get('pathFileEvaProj')?.value ||
        '<PathFile.evaproj>'
      }"
      ${
        this.builderCommand.get('configEntities.isModuleOrStandalone')?.value ==
        'simple'
          ? ''
          : this.builderCommand.get('configEntities.isModuleOrStandalone')
              ?.value == 'isModule'
          ? '--module'
          : '--standalone'
      }
      ${this.builderCommand.get('isInMemory')?.value ? '--in-memory-api' : ''}
      `;
    }

    if (
      this.builderCommand?.get('builderModeGroup.builderMode')?.value ==
      'app-with-template-and-dir-entities'
    ) {
      this.command = `eva new a
      -n
      ${this.builderCommand.get('nameApp')?.value || '<NameApp>'}
      -t
      ${this.builderCommand.get('appTemplates')?.value || '<AppTemplate>'}
      -e
      "${
        this.builderCommand.get('pathDirEntities')?.value || '<PathDirEntities>'
      }"
      ${
        this.builderCommand.get('configEntities.isModuleOrStandalone')?.value ==
        'simple'
          ? ''
          : this.builderCommand.get('configEntities.isModuleOrStandalone')
              ?.value == 'isModule'
          ? '--module'
          : '--standalone'
      }
      ${this.builderCommand.get('isInMemory')?.value ? '--in-memory-api' : ''}
      `;
    }

    if (
      this.builderCommand?.get('builderModeGroup.builderMode')?.value ==
      'app-with-only-template'
    ) {
      this.command = `eva new a
      -n
      ${this.builderCommand.get('nameApp')?.value || '<NameApp>'}
      -t
      ${this.builderCommand.get('appTemplates')?.value || '<AppTemplate>'}
      `;
    }

    if (
      this.builderCommand?.get('builderModeGroup.builderMode')?.value ==
      'crud-with-dir-entities'
    ) {
      this.command = `eva new e
      -o
      "${
        this.builderCommand.get('pathDirAngularProj')?.value ||
        '<PathDirAngularProj>'
      }"
      -ms
      "${
        this.builderCommand.get('pathDirEntities')?.value || '<PathDirEntities>'
      }"
      ${
        this.builderCommand.get('configEntities.isModuleOrStandalone')?.value ==
        'simple'
          ? ''
          : this.builderCommand.get('configEntities.isModuleOrStandalone')
              ?.value == 'isModule'
          ? '--module'
          : '--standalone'
      }
      ${this.builderCommand.get('isInMemory')?.value ? '--in-memory-api' : ''}
      `;
    }

    if (
      this.builderCommand?.get('builderModeGroup.builderMode')?.value ==
      'crud-with-one-file-entity'
    ) {
      this.command = `eva new e
      -o
     "${
       this.builderCommand.get('pathDirAngularProj')?.value ||
       '<PathDirAngularProj>'
     }"
      -m
      "${
        this.builderCommand.get('pathfileEntity')?.value || '<PathFileEntity>'
      }"
      ${
        this.builderCommand.get('configEntities.isModuleOrStandalone')?.value ==
        'simple'
          ? ''
          : this.builderCommand.get('configEntities.isModuleOrStandalone')
              ?.value == 'isModule'
          ? '--module'
          : '--standalone'
      }
      ${this.builderCommand.get('isInMemory')?.value ? '--in-memory-api' : ''}
      `;
    }
  }

  copy() {
      navigator.clipboard.writeText(this.command);
      this.builderCommand.markAllAsTouched();
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
  }

  get fm() {
    return this.builderCommand.controls;
  }
  get bModeG() {
    return this.builderCommand.get('builderModeGroup');
  }
}
