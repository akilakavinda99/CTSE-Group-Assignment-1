import React from 'react';
import {SelectList} from 'react-native-dropdown-select-list';

const DropdownComponent = () => {
  // const data = [
  //     {key: '1', value: 'All'},
  //     {key: '2', value: 'Computing'},
  //     {key: '3', value: 'Engineering'},
  //     {key: '4', value: 'Business School'},
  //     {key: '5', value: 'Humanaties & Sciences'},
  //     {key: '6', value: 'School of Architecture'},
  //     {key: '7', value: 'School of Law'},
  //     {key: '8', value: 'School of Hospitality & Culinary'},
  //     {key: '9', value: 'Graduate Studies & Researches'},
  //   ];

  return (
    <SelectList
      boxStyles={{
        borderRadius: 8,
        borderColor: '#E8E8E8',
        backgroundColor: '#E8E8E8',
        width: 343,
        height: 45,
        paddingLeft: 15,
      }}
      dropdownItemStyles={{marginHorizontal: 10}}
      dropdownTextStyles={{color: 'black'}}
      setSelected={setSelected}
      placeholder={'Select a Faculty'}
      maxHeight={150}
      data={data}
      save="value"
    />
  );
};

export default DropdownComponent;
