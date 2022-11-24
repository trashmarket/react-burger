import { TItems } from './types/data';

export interface TypeBurgerCardProp {
  readonly key: string;
  readonly item: TItems;
  readonly setUseModalState: (item: TItems, typeState?: string) => void
}