import React, {useState} from 'react';
import {TextInput, Text, View} from 'react-native';
import {primaryColors} from '../../styles/colors';

const TextInputComponent = ({
  value,
  onChange,
  validator,
  placeholder,
  marginBottom,
  ...props
}) => {
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleOnChange = inputValue => {
    if (inputValue.length === 0) {
      setError(null);
    } else {
      const validationResult = validator(inputValue);
      setError(validationResult);
    }

    onChange(inputValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const borderColor = isFocused
    ? primaryColors.primaryYellow
    : error
    ? 'red'
    : '#F6F6F680';
  return (
    <>
      <View
        style={{
          marginBottom: marginBottom,
        }}>
        <TextInput
          value={value}
          onChangeText={handleOnChange}
          style={{
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 8,
            width: 343,
            height: 50,
            paddingLeft: 15,

            backgroundColor: '#E8E8E8',
          }}
          placeholder={placeholder}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...props}
        />
        {error && <Text style={{color: 'red'}}>{error}</Text>}
      </View>
    </>
  );
};

export default TextInputComponent;
