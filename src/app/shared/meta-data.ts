export enum ValuesValidatorsDynamic {
  mimeImg = 'mimeImg',
  mimeText = 'mimeText',
  none = 'none',
  today = 'today',
  tomorrow = 'tomorrow',
  newDate = 'new Date',
}

export enum DataTypes {
  boolean = 'boolean',
  string = 'string',
  number = 'number',
  any = 'any',
  customType = 'customType',
  date = 'date',
  arrayNumber = 'Array<number>',
  arrayString = 'Array<string>',
  arrayAny = 'Array<any>',
  arrayBoolean = 'Array<boolean>',
  booleanArray = 'boolean[]',
  numberArray = 'number[]',
  anyArray = 'any[]',
  stringArray = 'string[]',
}

export enum ElementType {
  button = 'button',
  checkbox = 'checkbox',
  color = 'color',
  date = 'date',
  datetimeLocal = 'datetime-local',
  week = 'week',
  time = 'time',
  month = 'month',
  email = 'email',
  file = 'file',
  hidden = 'hidden',
  image = 'image',
  number = 'number',
  password = 'password',
  radio = 'radio',
  range = 'range',
  reset = 'reset',
  search = 'search',
  submit = 'submit',
  tel = 'tel',
  text = 'text',
  url = 'url',
}
export enum Elements {
  input = 'input',
  select = 'select',
  textarea = 'textarea',
}

export enum TypeFile {
  imgFile = 'imgFile',
  textFile = 'textFile',
}

export enum ValidatorsEnum {
  min='min',
  max='max',
  required='required',
  requiredTrue='requiredTrue',
  email='email',
  minLength='minLength',
  maxLength='maxLength',
  pattern='pattern',
  maxSizeFile='maxSizeFile',
  typeFile='typeFile',
  minDate='minDate',
  maxDate='maxDate',
}

export const VALIDATION_FORMS= {
  required: "The field is required",
  max: "Exceeds the maximum value allowed",
  min: "Doesn't exceed the minimum value allowed",
  maxlength:"Exceeds the maximum character allowed",
  minlength:"Doesn't exceed the minimum characters allowed",
  email:"It's not an email",
  pattern: "Does not match the expected character pattern",
  valuevalidatorminandmaxdate: "No cumple con el formato yyyy-mm-dd",
  valuevalidatormaxsizefile : "Solo numeros por favor",
  valuevalidatortypefile: 'Los valores permitidos son mimeImg, y mimeText'
}

export const helpeMessage ={
  appname : "Define el nombre de la app",
  entityname:"Define el nombre de la entidad",
  DisplayName:"Define el nombre de la entidad en el UI",
  entityPluralName: "Define el nombre de la entidad en plural"
}

export enum TemplatesOptions{
  coreui = "coreui"
}



export const Mode = {
  dark: "Dark",
  light: 'Light'
}
