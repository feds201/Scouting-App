import { TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { ScaleDecorator } from "react-native-draggable-flatlist"
import { Item } from "../../types/Item";
import { useState } from "react";

interface HeaderTemplateProps {
  item: Item
  drag: () => void;
  isActive: boolean;
}

const HeaderTemplate = ({ item, drag, isActive }: HeaderTemplateProps) => {

  return (
    <ScaleDecorator>
      <TouchableOpacity
        activeOpacity={1}
        disabled={isActive}
        style={styles.touchableOpacity}
        onLongPress={drag}
      >
        <TextInput
          placeholder={"Header Title"}
          onChangeText={
            (text) => {
              item.name = text;
            }
          } />
      </TouchableOpacity>
    </ScaleDecorator>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: "#FFFAFA",
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default HeaderTemplate;