import { CheckBox } from "@rneui/base";
import { TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { useState } from "react";
import { Item } from "../../types/Item";

interface CheckboxTemplateProps {
  item: Item;
  drag: () => void;
  isActive: boolean;
}

const CheckboxTemplate = ({ item, drag, isActive }: CheckboxTemplateProps) => {
  return (
    <ScaleDecorator>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={drag}
        disabled={isActive}
        style={styles.touchableOpacity}
      >
        <CheckBox checked={false} />
        <TextInput
          placeholder={"Title"}
          textAlign={"center"}
          style={styles.checkbox}
          onChangeText={
            (text) => {
              item.name = text;
            }
          }
        />
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
  checkbox: {
    marginLeft: 5,
    width: 100
  }
});

export default CheckboxTemplate;