import { AnyAction } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { StateType } from './login';
import { AccountModelState } from './account';

export { GlobalModelState, SettingModelState, AccountModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    settings?: boolean;
    account?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  settings: SettingModelState;
  loading: Loading;
  account: AccountModelState;
  login: StateType;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}
