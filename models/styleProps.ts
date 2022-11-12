export interface PropsObj {
  onPress: any;
  src: any;
  width: string;
  height: string;
  fontSize: number;
  fontWeight: string;
  source: string;
  align: string;
  color: string;
  backgroundColor: string;
  marginTop: number;
  marginBottom: number;
  marginRight: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingLeft: number;
  borderRadius: number;
  paddingBottom: number;
  size: number;
  theme: Theme
}

export type Props = Partial<PropsObj>

export interface Theme {
  PRIMARY_COLOR: string;
  SECONDARY_COLOR: string;
  BUTTON_TITLE_COLOR: string;
  TITLE_COLOR: string;
  BACKGROUND_COLOR: string;
  BUTTON_COLOR: string;
}
