import { TItems } from './types/data';

type TSetUseModalState<T> = (item: T, typeState?: string) => void;
type TOnClose = (e: any, typeCode: null | string, path: string) => void;

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