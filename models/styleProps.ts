export interface PropsObj {
  onPress: any;
  src: any;
  width: string;
  height: string;
  fontSize: string;
  fontWeight: string;
  source: string;
  align: string;
  color: string;
  backgroundColor: string;
  marginTop: string;
  marginBottom: string;
  marginRight: string;
  marginLeft: string;
  paddingTop: string;
  paddingRight: string;
  paddingLeft: string;
  borderRadius: string;
  paddingBottom: string;
  size: string;
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
