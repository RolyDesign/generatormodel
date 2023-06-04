import {DataTypes, ElementType, Elements, TypeFile, ValidatorsEnum} from "../generator-model/meta-data"

export interface IModel {
  Name: string;
  PluralName: string;
  Fields:IFields[];
}

export interface IFields {
  Name: string;
  DisplayName: string;
  Type: DataTypes;
  DisplayType?: IDisplayType;
  Validators?: ValidatorsEnum[];
  ValueValidators?: Array<any>;
  AvilitarValidators?: boolean
}

export interface IDisplayType {
  Element: Elements;
  ElementType?: ElementType;
  OptionsSelected?: Array<any>;
  FileOptions?:IFileOptions
}

export interface IFileOptions {
  TypeFile: TypeFile
}
