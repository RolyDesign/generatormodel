import {DataTypes, ElementType, Elements, TypeFile, ValidatorsEnum} from "../shared/meta-data"

export interface appModel {

  Id:number
  Name: string
  Entities: IEntity[]
}

export interface IEntity {
  Id:number;
  AppId:number;
  Name: string;
  PluralName: string;
  Fields:IFields[];
}

export interface IFields {
  Id:number
  EntityId:number;
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
