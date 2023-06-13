import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IEntity, IFields, appModel } from '../../shared/model-interfaces';

import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/local-storage.service';

import { valueValidatorMinAndMaxDate } from '../../shared/value-validator-min-and-max-date.validator';
import { valueValidatorMaxSizeFile } from '../../shared/value-validator-max-size-file.validator';
import { valueValidatorTypeFile } from '../../shared/value-validator-type-file.validator ';
import { FieldService } from '../../shared/field.service';
import { DataTypes, ElementType, Elements, TypeFile, VALIDATION_FORMS, ValidatorsEnum, ValuesValidatorsDynamic, helpeMessage } from 'src/app/shared/meta-data';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss'],
})
export class AddFieldComponent {
  helpMessage = helpeMessage;
  fieldForm!: FormGroup;
  validationForms = VALIDATION_FORMS;
  data!: appModel;
  entityData!: IEntity;
  dataTypes: Array<string> = [
    DataTypes.any,
    DataTypes.boolean,
    DataTypes.number,
    DataTypes.string,
    DataTypes.date,
    DataTypes.customType,
    // DataTypes.arrayAny,
    // DataTypes.arrayBoolean,
    // DataTypes.arrayNumber,
    // DataTypes.arrayString,
    DataTypes.anyArray,
    DataTypes.booleanArray,
    DataTypes.numberArray,
    DataTypes.stringArray,
  ];
  elementType: Array<string> = [
    ElementType.button,
    ElementType.checkbox,
    ElementType.color,
    ElementType.date,
    ElementType.datetimeLocal,
    ElementType.email,
    ElementType.file,
    ElementType.hidden,
    ElementType.image,
    ElementType.month,
    ElementType.number,
    ElementType.password,
    ElementType.radio,
    ElementType.range,
    ElementType.reset,
    ElementType.search,
    ElementType.submit,
    ElementType.tel,
    ElementType.text,
    ElementType.time,
    ElementType.url,
    ElementType.week,
  ];
  validators: Array<string> = [
    ValidatorsEnum.email,
    ValidatorsEnum.max,
    ValidatorsEnum.maxLength,
    ValidatorsEnum.min,
    ValidatorsEnum.minLength,
    ValidatorsEnum.pattern,
    ValidatorsEnum.required,
    ValidatorsEnum.requiredTrue,
  ];
  typeFile: Array<string> = [TypeFile.imgFile, TypeFile.textFile];
  element: Array<string> = [Elements.input, Elements.select, Elements.textarea];
  dataTypeEnum = DataTypes;
  elementTypeEnum = ElementType;
  elementsEnum = Elements;
  validatorsEnum = ValidatorsEnum;
  typeFileEnum = TypeFile;
  id!: number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fieldService: FieldService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.fieldForm = this.fb.group({
      Name: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      DisplayName: ['', [Validators.required]],
      Type: ['', Validators.required],
      DisplayType: this.fb.group({
        Element: new FormControl(
          { value: null, disabled: false },
          Validators.required
        ),
        ElementType: new FormControl(
          { value: null, disabled: true },
          Validators.required
        ),
        OptionsSelected: this.fb.array([this.buildOptionselected()]),
        FileOptions: this.fb.group({
          TypeFile: new FormControl(
            { value: null, disabled: true },
            Validators.required
          ),
        }),
      }),
      Validators: this.fb.array([this.buildValidators()]),
      ValueValidators: this.fb.array([this.buildValueValidators()]),
      AvilitarValidators: new FormControl({ value: false, disabled: false }),
    });
    this.observerFieldsList();
  }

  buildOptionselected(): FormControl {
    return new FormControl({ value: '', disabled: true }, Validators.required);
  }
  buildValidators() {
    return new FormControl(
      { value: null, disabled: true },
      Validators.required
    );
  }
  buildValueValidators() {
    return new FormControl(
      { value: null, disabled: true },
      Validators.required
    );
  }

  addOptionSelected() {
    const control = this.getoptionSelected();
    control.push(this.buildOptionselected());
    control.controls.forEach((el) => {
      el.enable();
    });
  }
  removeOptionSelected() {
    if (this.getoptionSelected().length == 1) {
      this.getoptionSelected().get('0')?.setValue('');
    }
    if (this.getoptionSelected().length > 1) {
      this.getoptionSelected().removeAt(-1);
    }
  }
  addValidatorAndValue() {
    this.getvalidators().push(this.buildValidators());
    this.getvalueValidators().push(this.buildValueValidators());
    this.getvalueValidators().controls.forEach((el) => {
      el.enable();
    });
    this.getvalidators().controls.forEach((el) => {
      el.enable();
    });

    this.observerVailidatorsList();
  }
  removeValidatorAndValue() {
    if (this.getvalidators().length == 1) {
      this.getvalueValidators().get('0')?.setValue('');
      this.getvalidators().get('0')?.setValue(null);
    }

    if (this.getvalidators().length > 1) {
      this.getvalidators().removeAt(-1);
      this.getvalueValidators().removeAt(-1);
    }
  }
  createField() {
    this.fieldService.add(<IFields>this.fieldForm.value, this.id);
    this.router.navigate(['/entities', this.id, 'fields']);
  }
  getLastFieldId(fields: IFields[]): number {
    let id = 1;
    if (fields.length > 0) {
      fields.sort((a, b) => a.Id - b.Id);
      fields.reverse();
      id = fields[0].Id + 1;
    }
    return id;
  }
  get fm() {
    return this.fieldForm.controls;
  }
  get dType() {
    return this.fieldForm.get('DisplayType');
  }
  get fOpt() {
    return this.dType?.get('FileOptions');
  }

  getoptionSelected(): FormArray {
    return <FormArray>this.fieldForm.get('DisplayType.OptionsSelected');
  }
  getvalidators(): FormArray {
    return <FormArray>this.fieldForm.get('Validators');
  }
  getvalueValidators(): FormArray {
    return <FormArray>this.fieldForm.get('ValueValidators');
  }
  observerVailidatorsList() {
    this.getvalidators().controls.forEach((elm, ind) => {
      elm.valueChanges.subscribe((res) => {
        if (
          res == this.validatorsEnum.typeFile &&
          this.fOpt?.get('TypeFile')?.value == this.typeFileEnum.imgFile
        ) {
          this.getvalueValidators()
            .get(`${ind}`)
            ?.setValue(ValuesValidatorsDynamic.mimeImg);
        } else if (
          res == this.validatorsEnum.typeFile &&
          this.fOpt?.get('TypeFile')?.value == this.typeFileEnum.textFile
        ) {
          this.getvalueValidators()
            .get(`${ind}`)
            ?.setValue(ValuesValidatorsDynamic.mimeText);
        } else if (
          res == this.validatorsEnum.required ||
          res == this.validatorsEnum.requiredTrue ||
          res == this.validatorsEnum.email
        ) {
          this.getvalueValidators()
            .get(`${ind}`)
            ?.setValue(ValuesValidatorsDynamic.none);
        }

        if (
          res == this.validatorsEnum.maxDate ||
          res == this.validatorsEnum.minDate
        ) {
          this.getvalueValidators()
            .get(`${ind}`)
            ?.addValidators(valueValidatorMinAndMaxDate);
        } else {
          this.getvalueValidators()
            .get(`${ind}`)
            ?.removeValidators(valueValidatorMinAndMaxDate);
        }

        if (res == this.validatorsEnum.maxSizeFile) {
         // this.getvalueValidators().get(`${ind}`)?.setValue(null);
          this.getvalueValidators()
            .get(`${ind}`)
            ?.addValidators(valueValidatorMaxSizeFile);
        } else {
          this.getvalueValidators()
            .get(`${ind}`)
            ?.removeValidators(valueValidatorMaxSizeFile);
        }

        if (res == this.validatorsEnum.typeFile) {
          this.getvalueValidators()
            .get(`${ind}`)
            ?.addValidators(valueValidatorTypeFile);
        } else {
          this.getvalueValidators()
            .get(`${ind}`)
            ?.removeValidators(valueValidatorTypeFile);
        }
        this.getvalueValidators().get(`${ind}`)?.updateValueAndValidity();
      });
    });
  }
  observerFieldsList() {
    this.dType?.get('Element')?.valueChanges.subscribe((res) => {
      if (res != this.elementsEnum.input) {
        this.dType?.get('ElementType')?.setValue(null);
        this.dType?.get('ElementType')?.disable();
      } else {
        this.dType?.get('ElementType')?.enable();
      }
      if (res != this.elementsEnum.select) {
        this.getoptionSelected().controls.forEach((el) => {
          el.disable();
        });
      } else {
        this.getoptionSelected().controls.forEach((el) => {
          el.enable();
        });
      }
    });

    this.dType?.get('ElementType')?.valueChanges.subscribe((res) => {
      this.getvalidators().controls.forEach((elm, ind) => {
        elm?.setValue(null);
        this.getvalueValidators().get(`${ind}`)?.setValue(null);
      });
      if (res !== ElementType.file) {
        this.dType?.get('FileOptions.TypeFile')?.setValue(null);
        this.dType?.get('FileOptions.TypeFile')?.disable();
      } else {
        this.dType?.get('FileOptions.TypeFile')?.enable();
      }
    });

    this.fieldForm.get('Type')?.valueChanges.subscribe((res) => {
      this.dType?.get('Element')?.setValue(null);
      this.getvalidators().controls.forEach((elm, ind) => {
        this.getvalueValidators().get(`${ind}`)?.setValue(null);
        this.getvalidators().get(`${ind}`)?.setValue(null);
      });
    });

    this.fieldForm.get('AvilitarValidators')?.valueChanges.subscribe((res) => {
      if (!res) {
        this.getvalidators().controls.forEach((el) => {
          el.disable();
        });
        this.getvalueValidators().controls.forEach((el) => {
          el.disable();
        });
      } else {
        this.getvalidators().controls.forEach((el) => {
          el.enable();
        });
        this.getvalueValidators().controls.forEach((el) => {
          el.enable();
        });
      }
    });
    //   // *****  Validators Fileds Changes********************
    this.observerVailidatorsList();

    //******************** * TypeFile Changes**************/
    this.fieldForm
      .get('DisplayType.FileOptions.TypeFile')
      ?.valueChanges.subscribe((res) => {
        this.getvalidators().controls.forEach((elm, ind) => {
          if (
            res == this.typeFileEnum.imgFile &&
            elm.value == this.validatorsEnum.typeFile
          ) {
            this.getvalueValidators()
              .get(`${ind}`)
              ?.setValue(ValuesValidatorsDynamic.mimeImg);
          } else if (
            res == this.typeFileEnum.textFile &&
            elm.value == this.validatorsEnum.typeFile
          ) {
            this.getvalueValidators()
              .get(`${ind}`)
              ?.setValue(ValuesValidatorsDynamic.mimeText);
          }
        });
      });
  }
}
