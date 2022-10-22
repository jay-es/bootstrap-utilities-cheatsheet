export type Section = {
  title: string;
  styles: Style[];
};

export type Style = {
  selector: string;
  contents: string;
};
