import React, {useState} from 'react';
import {TextInput, Text, View} from 'react-native';

const TextInputComponent = ({
  value,
  onChange,
  validator,
  placeholder,
  marginBottom,
  ...props
}) => {
  const [error, setError] = useState(null);

  const handleOnChange = inputValue => {
    console.log(inputValue.length);
    if (inputValue.length === 0) {
      setError(null);
    } else {
      const validationResult = validator(inputValue);
      setError(validationResult);
    }

    onChange(inputValue);
  };
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
            borderColor: error ? 'red' : 'black',
            borderWidth: 1,
            borderRadius: 8,
            width: 343,
            height: 50,

            backgroundColor: '#E8E8E8',
          }}
          placeholder={placeholder}
          {...props}
        />
        {error && <Text style={{color: 'red'}}>{error}</Text>}
      </View>
    </>
  );
};

export default TextInputComponent;
