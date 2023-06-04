import { Component, OnInit } from '@angular/core';
import { faFileCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import {
  VALIDATION_FORMS,
  helpeMessage,
} from '../generator-model/message-validation.const';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  DataTypes,
  ElementType,
  Elements,
  TypeFile,
  ValidatorsEnum,
  ValuesValidatorsDynamic,
} from '../generator-model/meta-data';
import { valueValidatorTypeFile } from '../shared/value-validator-type-file.validator ';
import { valueValidatorMaxSizeFile } from '../shared/value-validator-max-size-file.validator';
import { valueValidatorMinAndMaxDate } from '../shared/value-validator-min-and-max-date.validator';
import { FileStorageServiceService } from '../shared/file-storage-service.service';
import { IFields } from '../shared/model-interfaces';

@Component({
  selector: 'app-model-edit',
  templateUrl: './model-edit.component.html',
  styleUrls: ['./model-edit.component.scss'],
})
export class ModelEditComponent implements OnInit {
  title = 'Generator Model';
  helpIcon = faFileCircleQuestion;
  helpMessage = helpeMessage;
  editModel!: FormGroup;
  validationForms = VALIDATION_FORMS;
  elementsEnum = Elements;
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
    DataTypes.boleanArray,
    DataTypes.numberArray,
    DataTypes.stringArray,
  ];
  validatorsEnum = ValidatorsEnum;
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
  dataTypeEnum = DataTypes;
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
  typeFile: Array<string> = [TypeFile.imgFile, TypeFile.textFile];
  typeFileEnum = TypeFile;
  elementTypeEnum = ElementType;
  element: Array<string> = [Elements.input, Elements.select, Elements.textarea];
  bolck = 1;
  fieldQuantity = 1;
  isUnlockSelection: boolean = false;
  precent: number = 0;
  get style() {
    return 'width:' + this.precent + '%';
  }
  constructor(
    private fb: FormBuilder,
    private fileStorageSvc: FileStorageServiceService
  ) {}

  ngOnInit(): void {
    this.fileStorageSvc.getFileStorage().subscribe((res) => {
      this.title = `Edit ${res.Name}`;
      this.fieldQuantity = res.Fields.length;
      this.isUnlockSelection = true;
      this.editModel = this.fb.group({
        Name: [res.Name, [Validators.required, Validators.maxLength(100)]],
        PluralName: [
          res.PluralName,
          [Validators.required, Validators.maxLength(100)],
        ],
        Fields: this.fb.array([...this.initialFields(res.Fields)]),
      });
    });
  }
  initialFields(fields: IFields[]): FormGroup[] {
    let listFields: FormGroup[] = [];
    fields.forEach((el: IFields) => {
      listFields.push(
        this.fb.group({
          Name: new FormControl({ value: el.Name, disabled: false }, [
            Validators.required,
            Validators.maxLength(100),
          ]),
          DisplayName: [
            el.DisplayName,
            [Validators.required, Validators.maxLength(100)],
          ],
          Type: [el.Type, Validators.required],
          DisplayType: this.fb.group({
            Element: new FormControl(
              {
                value: el.DisplayType?.Element ?? null,
                disabled: el.DisplayType?.Element == null,
              },
              Validators.required
            ),
            ElementType: new FormControl(
              {
                value: el.DisplayType?.ElementType ?? null,
                disabled: el.DisplayType?.ElementType == null,
              },
              Validators.required
            ),
            OptionsSelected: this.fb.array([
              ...this.initialOptionSelected(el.DisplayType?.OptionsSelected),
            ]),
            FileOptions: this.fb.group({
              TypeFile: new FormControl(
                {
                  value: el.DisplayType?.FileOptions?.TypeFile ?? null,
                  disabled: el.DisplayType?.FileOptions?.TypeFile == null,
                },
                Validators.required
              ),
            }),
          }),
          Validators: this.fb.array([...this.initialValidators(el.Validators)]),
          ValueValidators: this.fb.array([...this.initialValueValidators(el.ValueValidators)]),
          AvilitarValidators: new FormControl({
            value: el.AvilitarValidators,
            disabled: el.AvilitarValidators == null,
          }),
        })
      );
    });
    return listFields;
  }
  initialOptionSelected(options: any[] | undefined): FormControl[] {
    let optionList: any[] = [];
    if (options) {
      options.forEach(el =>{
        optionList.push(
          new FormControl({ value: el, disabled:  el == null }, Validators.required)
        )
      })
      return optionList;
    }
    optionList.push(this.buildOptionselected());
    return optionList;
  }

  initialValidators(validator: any[] | undefined): FormControl[] {
    let validatorList: any[] = [];
    if (validator) {
      validator.forEach(el =>{
        validatorList.push(
          new FormControl({ value: el, disabled:  el == null }, Validators.required)
        )
      })
      return validatorList;
    }
    validatorList.push(this.buildValidators());
    return validatorList;
  }
  initialValueValidators(value: any[] | undefined): FormControl[] {
    let valueList: any[] = [];
    if (value) {
      value.forEach(el =>{
        valueList.push(
          new FormControl({ value: el, disabled:  el == null }, Validators.required)
        )
      })
      return valueList;
    }
    valueList.push(this.buildValueValidators());
    return valueList;
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
  buildFields(): FormGroup {
    return this.fb.group({
      Name: ['', [Validators.required, Validators.maxLength(100)]],
      DisplayName: ['', [Validators.required, Validators.maxLength(100)]],
      Type: ['', Validators.required],
      DisplayType: this.fb.group({
        Element: [null, Validators.required],
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
      AvilitarValidators: [false],
    });
  }
  increment() {
    this.fieldQuantity++;
    this.addField();
    this.observerFieldsList();
  }
  decrement() {
    if (this.fieldQuantity > 1) this.fieldQuantity--;
    this.removeField();
    this.observerFieldsList();
  }
  onUnlockSelection() {
    this.isUnlockSelection = !this.isUnlockSelection;
  }

  handlerNext() {
    this.precent = (100 / this.fieldQuantity) * this.bolck;
    this.bolck++;
  }
  handlerFieldNext() {
    this.precent = (100 / this.fieldQuantity) * this.bolck;
    if (this.bolck != this.fieldQuantity + 1) this.bolck++;
  }
  handlerPreview() {
    if (this.bolck > 1) this.bolck--;
    this.precent = (100 / this.fieldQuantity) * (this.bolck - 1);
  }
  addField() {
    const control = <FormArray>this.editModel.get('Fields');
    control.push(this.buildFields());
  }
  removeField() {
    const control = <FormArray>this.editModel.get('Fields');
    if (control.length > 1) control.removeAt(-1);
  }
  addOptionSelected(i: number) {
    const control = this.getoptionSelected(i);
    control.push(this.buildOptionselected());
    control.controls.forEach((el) => {
      el.enable();
    });
  }
  removeOptionSelected(i: number) {
    if (this.getoptionSelected(i).length == 1) {
      this.getoptionSelected(i).get('0')?.setValue('');
    }
    if (this.getoptionSelected(i).length > 1) {
      this.getoptionSelected(i).removeAt(-1);
    }
  }
  addValidatorAndValue(i: number) {
    this.getvalidators(i).push(this.buildValidators());
    this.getvalueValidators(i).push(this.buildValueValidators());
    this.getvalueValidators(i).controls.forEach((el) => {
      el.enable();
    });
    this.getvalidators(i).controls.forEach((el) => {
      el.enable();
    });

    this.observerVailidatorsList();
  }
  removeValidatorAndValue(i: number) {
    if (this.getvalidators(i).length == 1) {
      this.getvalueValidators(i).get('0')?.setValue('');
      this.getvalidators(i).get('0')?.setValue(null);
    }

    if (this.getvalidators(i).length > 1) {
      this.getvalidators(i).removeAt(-1);
      this.getvalueValidators(i).removeAt(-1);
    }
  }

  edit() {
    const valueForm = JSON.stringify(this.editModel.value);
    const a = document.createElement('a');
    const archivo = new Blob([valueForm], { type: 'text/plain' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = this.editModel.get('Name')?.value + '.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  get fm() {
    return this.editModel.controls;
  }
  getoptionSelected(i: number): FormArray {
    return <FormArray>(
      this.editModel.get(`Fields.${i}.DisplayType.OptionsSelected`)
    );
  }
  getvalidators(i: number): FormArray {
    return <FormArray>this.editModel.get(`Fields.${i}.Validators`);
  }
  getvalueValidators(i: number): FormArray {
    return <FormArray>this.editModel.get(`Fields.${i}.ValueValidators`);
  }
  get fields(): FormArray {
    return <FormArray>this.editModel.get('Fields');
  }
  observerVailidatorsList() {
    this.fields.controls.forEach((el, i) => {
      this.getvalidators(i).controls.forEach((elm, ind) => {
        elm.valueChanges.subscribe((res) => {
          if (
            res == this.validatorsEnum.typeFile &&
            this.fields.get(`${i}.DisplayType.FileOptions.TypeFile`)?.value ==
              this.typeFileEnum.imgFile
          ) {
            this.getvalueValidators(i)
              .get(`${ind}`)
              ?.setValue(ValuesValidatorsDynamic.mimeImg);
          } else if (
            res == this.validatorsEnum.typeFile &&
            this.fields.get(`${i}.DisplayType.FileOptions.TypeFile`)?.value ==
              this.typeFileEnum.textFile
          ) {
            this.getvalueValidators(i)
              .get(`${ind}`)
              ?.setValue(ValuesValidatorsDynamic.mimeText);
          } else if (
            res == this.validatorsEnum.required ||
            res == this.validatorsEnum.requiredTrue ||
            res == this.validatorsEnum.email
          ) {
            this.getvalueValidators(i)
              .get(`${ind}`)
              ?.setValue(ValuesValidatorsDynamic.none);
          }

          if (
            res == this.validatorsEnum.maxDate ||
            res == this.validatorsEnum.minDate
          ) {
            this.getvalueValidators(i)
              .get(`${ind}`)
              ?.addValidators(valueValidatorMinAndMaxDate);
          } else {
            this.getvalueValidators(i)
              .get(`${ind}`)
              ?.removeValidators(valueValidatorMinAndMaxDate);
          }

          if (res == this.validatorsEnum.maxSizeFile) {
            this.getvalueValidators(i).get(`${ind}`)?.setValue(null);
            this.getvalueValidators(i)
              .get(`${ind}`)
              ?.addValidators(valueValidatorMaxSizeFile);
          } else {
            this.getvalueValidators(i)
              .get(`${ind}`)
              ?.removeValidators(valueValidatorMaxSizeFile);
          }

          if (res == this.validatorsEnum.typeFile) {
            this.getvalueValidators(i)
              .get(`${ind}`)
              ?.addValidators(valueValidatorTypeFile);
          } else {
            this.getvalueValidators(i)
              .get(`${ind}`)
              ?.removeValidators(valueValidatorTypeFile);
          }
          this.getvalueValidators(i).get(`${ind}`)?.updateValueAndValidity();
        });
      });
    });
  }
  observerFieldsList() {
    this.fields.controls.forEach((el, i) => {
      this.fields
        .get(`${i}.DisplayType.Element`)
        ?.valueChanges.subscribe((res) => {
          if (res != this.elementsEnum.input) {
            this.editModel
              .get(`Fields.${i}.DisplayType.ElementType`)
              ?.setValue(null);
            this.editModel
              .get(`Fields.${i}.DisplayType.ElementType`)
              ?.disable();
          } else {
            this.editModel.get(`Fields.${i}.DisplayType.ElementType`)?.enable();
          }
          if (res != this.elementsEnum.select) {
            this.getoptionSelected(i).controls.forEach((el) => {
              el.disable();
            });
          } else {
            this.getoptionSelected(i).controls.forEach((el) => {
              el.enable();
            });
          }
        });

      this.fields
        .get(`${i}.DisplayType.ElementType`)
        ?.valueChanges.subscribe((res) => {
          this.getvalidators(i).controls.forEach((elm, ind) => {
            elm?.setValue(null);
            this.getvalueValidators(i).get(`${ind}`)?.setValue(null);
          });
          if (res !== ElementType.file) {
            this.editModel
              .get(`Fields.${i}.DisplayType.FileOptions.TypeFile`)
              ?.setValue(null);
            this.editModel
              .get(`Fields.${i}.DisplayType.FileOptions.TypeFile`)
              ?.disable();
          } else {
            this.editModel
              .get(`Fields.${i}.DisplayType.FileOptions.TypeFile`)
              ?.enable();
          }
        });

      this.fields
        .get(`${i}.AvilitarValidators`)
        ?.valueChanges.subscribe((res) => {
          if (!res) {
            this.getvalidators(i).controls.forEach((el) => {
              el.disable();
            });
            this.getvalueValidators(i).controls.forEach((el) => {
              el.disable();
            });
          } else {
            this.getvalidators(i).controls.forEach((el) => {
              el.enable();
            });
            this.getvalueValidators(i).controls.forEach((el) => {
              el.enable();
            });
          }
        });

      this.fields.get(`${i}.Type`)?.valueChanges.subscribe((res) => {
        this.editModel.get(`Fields.${i}.DisplayType.Element`)?.setValue('');
        this.getvalidators(i).controls.forEach((elm, ind) => {
          this.getvalueValidators(i).get(`${ind}`)?.setValue(null);
          this.getvalidators(i).get(`${ind}`)?.setValue(null);
        });
      });

      // *****  Validators Fileds Changes********************
      this.observerVailidatorsList();

      //******************** * TypeFile Changes**************/
      this.fields
        .get(`${i}.DisplayType.FileOptions.TypeFile`)
        ?.valueChanges.subscribe((res) => {
          this.getvalidators(i).controls.forEach((elm, ind) => {
            if (
              res == this.typeFileEnum.imgFile &&
              elm.value == this.validatorsEnum.typeFile
            ) {
              this.getvalueValidators(i)
                .get(`${ind}`)
                ?.setValue(ValuesValidatorsDynamic.mimeImg);
            } else if (
              res == this.typeFileEnum.textFile &&
              elm.value == this.validatorsEnum.typeFile
            ) {
              this.getvalueValidators(i)
                .get(`${ind}`)
                ?.setValue(ValuesValidatorsDynamic.mimeText);
            }
          });
        });
    });
  }
}
