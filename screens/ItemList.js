import React, { useState } from 'react';
import {
  View,
  AsyncStorage,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

import items from '../items';

const ItemList = () => {
  const [isCompleted, setCompletion] = useState(items.isCompleted);
  const [itemList, setItemList] = useState(items.list);

  // AsyncStorage.getItem('items', (err, res) => {
  //   if (res) {
  //     const savedItems = JSON.parse(res);
  //     setCompletion(savedItems.isCompleted);
  //     setItemList(savedItems.list);
  //   }
  // });

  const clicked = (index) => {
    const newList = itemList;
    newList[index].isChecked = !newList[index].isChecked;

    setItemList(newList);

    let numDone = 0;
    itemList.forEach((item) => {
      if (item.isChecked === true) {
        numDone += 1;
      } 
    });
    if (numDone === itemList.length) {
      setCompletion(true);
    } else {
      setCompletion(false);
    }

    const currList = {
      isCompleted,
      list: itemList,
    };

    // AsyncStorage.setItem('items', JSON.stringify(currList));
  };

  return (
    <View>
      {
        itemList.map((item, index) => (
          <CheckBox
            key={index}
            title={item.name}
            checked={item.isChecked}
            onPress={() => { clicked(index); }}
          />
        ))
      }
    </View>
  );
};

export default ItemList;
