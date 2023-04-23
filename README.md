# React Native LocaleNumberInput

**React Native LocaleNumberInput** This is  made to solve the problem of Numeric TextInput which is not supporting value format & input accept based on user device region for both Android and iOS.

 **Note**: This library has a peer dependency:- [react-native-localize](https://github.com/zoontek/react-native-localize). but you don't need to install manually this dependency.

### Maintainers

**This library is being maintained by Ranjan Sharma**. It is self motivated work.  
Feel free to provide your feedback, If you see any room for improvement in this, **it really makes a difference.**

### Platform compatibility

This project is compatible with `iOS`, and `Android`

### Getting Started

**Installation**

`yarn add react-native-locale-number-input` or `npm install react-native-locale-number-input --save`

[This library support autolinking]()

### Usage

Import the `LocaleNumberInput` component from `react-native-locale-number-input` and use it like so:

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import LocaleNumberInput from "react-native-locale-number-input";

// ...
const App = () => {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <View style={{ flex: 1 }}>
      <LocaleNumberTextInput
        inputValue={inputValue}
        handleChange={setInputValue}
      />
    </View>
  );
};
```

### Props And Events

<table>
<tr>
    <th>Prop</th>
    <th>Type</th>
    <th>Default</th>
    <th>Note</th>
</tr>
<tr>
    <td>value</td>
    <td>string</td>
    <td>-</td>
    <td>TextInput value prop</td>
</tr>
<tr>
    <td>handleChange</td>
    <td>function</td>
    <td>-</td>
    <td>It is similar like onChangeText of TextInput prop</td>
</tr>
<tr>
    <td>customStyle</td>
    <td>Stylesheet</td>
    <td>-</td>
    <td>Provide your custom style using this props, It supports all style props of TextInput</td>
</tr>
<tr>
    <td>Other all props of TextInput</td>
    <td>TextInputProps</td>
    <td>-</td>
    <td>You can provide all other props of TextInput</td>
</tr>
</table>
<br/>

#### Contributing

Contributions are welcome

### License

MIT

