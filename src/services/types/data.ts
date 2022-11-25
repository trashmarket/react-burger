import { type } from "os";

export type TWsOrders = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export type TItems = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
}

export type TpasswordMessage = {
  readonly success: boolean;
  readonly message: string;
}

export type TExitBody = {
  success?: boolean;
  message?: string;
}

export type TUser = {
  email?: string;
  name?: string;
}

export type TPostEmailBody = {
  email: string;
} | {
  password: string;
  token: string;
}

export type TItemSelect = {
  readonly uuid: string;
} & TItems

export type TOrderDetails = {
  success: boolean;
  name: string;
  order: {
    ingredients: Array<TItems>;
    _id: string;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
  }
}