export interface PropsObj {
  onPress: any;
  src: any;
  width: string;
  height: any;
  fontSize: number;
  fontWeight: string;
  source: string;
  align: string;
  color: any;
  startDirection: any;
  endDirection: any;
  backgroundColor: string;
  totalBorderRadius: string;
  marginTop: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
  shadowColor: number;
  shadowRadius: number;
  shadowOpacity: number;
  shadowWidth: number;
  shadowHeight: number;
  elevation: number;
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
