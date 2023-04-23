import {NativeModules, Platform} from 'react-native';
import * as RNLocalize from 'react-native-localize';

export const getDeviceLang = () => {
  const appLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;
  return String(appLanguage).replace('_', '-');
};

export const getFormattedNumber = numberValue => {
  const locale = getDeviceLang();
  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'decimal',
  }).format(Number(numberValue));
  return formattedValue;
};

export const getDefaultFormattedNumber = (
  numberValue,
) => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    useGrouping: false,
  }).format(Number(numberValue));
  return formattedValue;
};

export const getDecimalSeparator = () => {
  return RNLocalize.getNumberFormatSettings();
};

export const spliceSlice = (str, cursor, add) => {
  let count = cursor?.end - cursor?.start;
  let index = cursor?.start;
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }
  return str.slice(0, index) + (add || '') + str.slice(index + count);
};

export const removeCharacterByIndex = (text, cursor) => {
  let _text = String(text);
  if (cursor?.start == cursor?.end) {
    let result = _text.replace(
      _text.substring(cursor.start - 1, cursor.end),
      '',
    );
    return result;
  } else {
    let result = _text.replace(_text.substring(cursor.start, cursor.end), '');
    return result;
  }
};
