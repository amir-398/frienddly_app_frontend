declare module "*.png" {
  const value: any;
  export = value;
}

// src/@types/react-native-stars.d.ts
declare module "react-native-stars" {
  import { Component } from "react";

  interface StarsProps {
    default?: any;
    count?: number;
    disabled?: boolean;
    fullStar?: any;
    emptyStar?: any;
    update?: (val: number) => void;
  }

  export default class Stars extends Component<StarsProps> {}
}
