import React, {useCallback, useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextInputProps,
  TextInputSelectionChangeEventData,
  TextStyle,
} from 'react-native';
import {
  getDecimalSeparator,
  getFormattedNumber,
  removeCharacterByIndex,
  spliceSlice,
} from './numberUtils';

interface ILocaleNumberTextInput extends TextInputProps {
  inputValue: string;
  handleChange: (value: number) => void;
  customStyle?:StyleProp<TextStyle> | undefined;
}
   
const LocaleNumberTextInput = ({
  inputValue,
  handleChange,
  customStyle,
  ...others
}: ILocaleNumberTextInput) => {
  const [validValue, setValidValue] = useState('');
  const [cursorPosition, setCursorPosition] = useState({
    start: 0,
    end: 0,
  });

  useEffect(()=>{
    setValidValue(String(inputValue));
  },[])

  const handleSendDefaultFormate=(text:string)=>{
    const separator = getDecimalSeparator();
    let defaultFormatNumber=text.replace(separator.decimalSeparator,'.');
    let _defaultFormatNumber=parseFloat(defaultFormatNumber)
    handleChange(_defaultFormatNumber)
  }

  const onKeyPress = useCallback(
    (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      const separator = getDecimalSeparator();
      switch (event.nativeEvent.key) {
        case separator.decimalSeparator:
          const isAlreadyDecimalSeparator = validValue.includes(
            separator.decimalSeparator,
          );
          if (!isAlreadyDecimalSeparator) {
            setValidValue(`${validValue}${event.nativeEvent.key}`);
            handleSendDefaultFormate(`${validValue}${event.nativeEvent.key}`);
          }
          break;
        case 'Backspace':
          let text = '';
          if (
            cursorPosition.start === cursorPosition.end &&
            cursorPosition.start === validValue.length
          ) {
            text = validValue.slice(0, -1);
          } else {
            text = removeCharacterByIndex(validValue, cursorPosition);
          }
          setValidValue(text);
          handleSendDefaultFormate(text);
          break;
        case separator.groupingSeparator:
          break;
        case '-':
          break;
        case ' ':
          break;
        case separator.groupingSeparator:
          break;
        default:
          let _text = '';
          if (
            cursorPosition.start === cursorPosition.end &&
            cursorPosition.start === validValue.length
          ) {
            _text = `${validValue}${event.nativeEvent.key}`;
          } else {
            _text = spliceSlice(
              validValue,
              cursorPosition,
              event.nativeEvent.key,
            );
          }
          setValidValue(_text);
          handleSendDefaultFormate(_text);
          break;
      }
    },
    [cursorPosition, validValue],
  );

  const onFocus = () => {
    const separator = getDecimalSeparator();
    let formattedValue = validValue.split(separator.groupingSeparator).join('');
    setValidValue(formattedValue);
  };

  const onBlur = () => {
    const separator = getDecimalSeparator();
    let defaultValue = validValue.replace(separator.decimalSeparator, '.');
    const formattedValue_ = getFormattedNumber(defaultValue);
    setValidValue(formattedValue_);
  };

  const onSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => {
    setCursorPosition(event.nativeEvent.selection);
  };

  return (
    <TextInput
      onKeyPress={onKeyPress}
      style={[styles.input,customStyle]}
      value={validValue}
      keyboardType="numeric"
      onBlur={onBlur}
      onFocus={onFocus}
      onSelectionChange={onSelectionChange}
      {...others}
    />
  );
};

export default LocaleNumberTextInput;

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 5,
  },
});
