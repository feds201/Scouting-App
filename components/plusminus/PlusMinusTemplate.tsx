import { TouchableOpacity, TextInput, Text } from "react-native";
import { Button } from "@rneui/base";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { StyleSheet } from "react-native";
import { Item } from "../../types/Item";
import { useState } from "react";

interface PlusMinusTemplateProps {
  item: Item;
  drag: () => void;
  isActive: boolean;
}

const PlusMinusTemplate = ({ item, drag, isActive }: PlusMinusTemplateProps) => {
  return (
    <ScaleDecorator>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={drag}
        disabled={isActive}
        style={styles.touchableOpacity}
      >
        <TextInput
          placeholder={"Title"}
          textAlign={"center"}
          style={styles.textInput}
          onChangeText={
            (text) => {
              item.name = text;
            }
          } />

        <Button
          title={"+"}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.plusContainerStyle} />
        <Text id={item.key} style={styles.text}>0</Text>
        <Button
          title={"-"}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.minusContainerStyle} />
      </TouchableOpacity>
    </ScaleDecorator>
  )
}


const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: "#FFFAFA",
    height: 100,
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center"
  },
  textInput: {
    marginLeft: 5,
    width: 100
  },
  buttonStyle: {
    borderRadius: 30,
  },
  plusContainerStyle: {
    width: 60,
    marginLeft: 50,
  },
  minusContainerStyle: {
    width: 60,
    marginLeft: 20,
  },
  text: {
    marginLeft: 20
  }
});

export default PlusMinusTemplate;