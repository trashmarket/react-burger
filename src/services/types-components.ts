import { type } from 'os';
import { TItems, TWsOrders } from './types/data';

export type TSetUseModalState<T> = (item: T, typeState?: string) => void;
export type TOnClose = (e: any, typeCode: null | string, path: string) => void;

export type TCartIngredient = {
  count: number;
  fullPrice: number

} & TItems

export type TItemObjectList = {
  item: TWsOrders;
  cartIngredient: Array<TCartIngredient>;
  time: string;
  costFull: number;
  todayOrNotetoday: string;
}

export interface TypeBurgerCardProp {
  readonly key: string;
  readonly item: TItems;
  readonly setUseModalState: TSetUseModalState<TItems>
}

export interface TBurgerConstructor {
  readonly setUseModalState: TSetUseModalState<boolean>;
  readonly bool: boolean | TItems | null;
  readonly onClose: TOnClose;
}

export interface IFeedMain {
   readonly setUseModalState: TSetUseModalState<TItemObjectList>;
   readonly ingredient: TItemObjectList | null;
   readonly onClose: TOnClose;
}

export type TBackgroundState = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
}