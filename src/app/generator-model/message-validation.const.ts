import { ValuesValidatorsDynamic } from "./meta-data";

export const VALIDATION_FORMS  = {
  required: "The field is required",
  max: "Exceeds the maximum value allowed",
  min: "Doesn't exceed the minimum value allowed",
  maxlength:"Exceeds the maximum character allowed",
  minlength:"Doesn't exceed the minimum characters allowed",
  email:"It's not an email",
  pattern: "Does not match the expected character pattern",
  maxsizefile:"Exceeds the maximum size alowed",
  typefile: "Does not match the expected types alowed",
  valuevalidatorminandmaxdate: "Siga el patron (yyyy-mm-dd) o Use valores dinamicos como 'today' , 'tomorrow' o 'new Date(something)'",
  valuevalidatormaxsizefile: "Solo numeros por favor",
  valuevalidatortypefile: `Los valores esperados sin ${ValuesValidatorsDynamic.mimeImg} y ${ValuesValidatorsDynamic.mimeText}`,

};

export const helpeMessage = {
  appname: "Este campo es Requerido, Debe ser con letra inicial Mayuscula y no debe contener espacios ni caracteres extranios. Espesifica el nombre de la Aplicacion",
  entityname : "Este campo es Requerido, Debe ser con letra inicial Mayuscula y no debe contener espacios ni caracteres extranios. Espesifica el nombre de la Entidad",
  entityPluralName: "Este campo es Requerido, Debe ser con letra inicial Mayuscula y no debe contener espacios ni caracteres extranios. Espesifica el nombre de la Entidad en plural",
  DisplayName:"Este campo es Requerido, Define el nombre de la entidad a usar en el view",
  Element:'Este campo es requerido define el elemento HTML que se usara en los formularios de creacion y edicion',
  decrementFields: "Este boton decrementa en uno la cantidad de campos, siempre va descontando el ultimo en la lista",
  incrementFields: "Este boton incrementa en uno la cantidad de campos, siempre va agrgando al final de la lista",
  disableCounter: "Este boton desabilita o avilita la funcionalidad de agrgar o disminuir campos evitando asi eliminar un campo terminado por error",
  preview: 'Este boton retrosede un paso ',
  next :" Avanza un paso. Estara desabilitado mientras el formulario en cuestion no sea valido "
}



