export interface IItem {
  id: number;
  order: number;
  text: string;
}

export interface IJira {
  id: number;
  title: string;
  items: IItems[];
}

export interface IItems {
  id: number;
  title: string;
}

export interface ICalc {
  id: number;
  title: JSX.Element;
}
