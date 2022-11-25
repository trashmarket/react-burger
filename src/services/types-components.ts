import { type } from 'os';
import { TItems, TWsOrders } from './types/data';

export type TSetUseModalState<T> = (item: T, typeState?: string) => void;
type TOnClose = (e: any, typeCode: null | string, path: string) => void;

type TCartIngredient = {
  count: number;
  fullPrice: number

} & TItems

type TItemObjectList = {
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
  readonly bull: boolean;
  readonly onClose: TOnClose;
}

export interface IFeedMain {
   readonly setUseModalState: TSetUseModalState<TItemObjectList>;
   readonly ingredient: TCartIngredient | null;
   readonly onClose: TOnClose;
}