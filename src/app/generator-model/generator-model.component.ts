import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VALIDATION_FORMS, helpeMessage } from './message-validation.const';
import {
  DataTypes,
  ElementType,
  Elements,
  TypeFile,
  ValidatorsEnum,
  ValuesValidatorsDynamic,
} from './meta-data';
import { valueValidatorMinAndMaxDate } from '../shared/value-validator-min-and-max-date.validator';
import { valueValidatorMaxSizeFile } from '../shared/value-validator-max-size-file.validator';
import { valueValidatorTypeFile } from '../shared/value-validator-type-file.validator ';
import { faFileCircleQuestion } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-generator-model',
  templateUrl: './generator-model.component.html',
  styleUrls: ['./generator-model.component.scss'],
})
export class GeneratorModelComponent {
  title = 'Generator Model';
  helpIcon = faFileCircleQuestion;
  helpMessage = helpeMessage;
  generator!: FormGroup;
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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.generator = this.fb.group({
      Name: ['', [Validators.required, Validators.maxLength(100)]],
      PluralName: ['', [Validators.required, Validators.maxLength(100)]],
      Fields: this.fb.array([this.initialFields()]),
    });
  }

  initialFields():FormGroup{
    return  this.fb.group({
      Name: new FormControl({ value: 'id', disabled: false }, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      DisplayName: ['Id', [Validators.required, Validators.maxLength(100)]],
      Type: ['', Validators.required],
      DisplayType: this.fb.group({
        Element: new FormControl(
          { value: '', disabled: true },
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
      AvilitarValidators: new FormControl({ value: '', disabled: true }),
    })
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
        Element: ['', Validators.required],
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
    this.observerFieldsList()
  }
  decrement() {
    if (this.fieldQuantity > 1) this.fieldQuantity--;
    this.removeField();
    this.observerFieldsList()
  }
  onUnlockSelection() {
    this.isUnlockSelection = !this.isUnlockSelection;
  }
  generate() {
    const valueForm = JSON.stringify(this.generator.value);
    const a = document.createElement('a');
    const archivo = new Blob([valueForm], { type: 'text/plain' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = this.generator.get('Name')?.value + '.json';
    a.click();
    URL.revokeObjectURL(url);
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
    const control = <FormArray>this.generator.get('Fields');
    control.push(this.buildFields());
  }
  removeField() {
    const control = <FormArray>this.generator.get('Fields');
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

    this.observerVailidatorsList()
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
  get fm() {
    return this.generator.controls;
  }
  getoptionSelected(i: number): FormArray {
    return <FormArray>(
      this.generator.get(`Fields.${i}.DisplayType.OptionsSelected`)
    );
  }
  getvalidators(i: number): FormArray {
    return <FormArray>this.generator.get(`Fields.${i}.Validators`);
  }
  getvalueValidators(i: number): FormArray {
    return <FormArray>this.generator.get(`Fields.${i}.ValueValidators`);
  }
  get fields(): FormArray {
    return <FormArray>this.generator.get('Fields');
  }
  observerVailidatorsList(){
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
  observerFieldsList(){
    this.fields.controls.forEach((el, i) => {
      this.fields
        .get(`${i}.DisplayType.Element`)
        ?.valueChanges.subscribe((res) => {
          if (res != this.elementsEnum.input) {
            this.generator
              .get(`Fields.${i}.DisplayType.ElementType`)
              ?.setValue(null);
            this.generator
              .get(`Fields.${i}.DisplayType.ElementType`)
              ?.disable();
          } else {
            this.generator.get(`Fields.${i}.DisplayType.ElementType`)?.enable();
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
            this.generator
              .get(`Fields.${i}.DisplayType.FileOptions.TypeFile`)
              ?.setValue(null);
            this.generator
              .get(`Fields.${i}.DisplayType.FileOptions.TypeFile`)
              ?.disable();
          } else {
            this.generator
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
        this.generator.get(`Fields.${i}.DisplayType.Element`)?.setValue('');
        this.getvalidators(i).controls.forEach((elm, ind) => {
          this.getvalueValidators(i).get(`${ind}`)?.setValue(null);
          this.getvalidators(i).get(`${ind}`)?.setValue(null);
        });
      });

      // *****  Validators Fileds Changes********************
     this.observerVailidatorsList()

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
