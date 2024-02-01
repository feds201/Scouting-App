import { CheckBox } from "@rneui/base";
import { TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { useState } from "react";
import { Item } from "../../types/Item";

interface CheckboxProps {
  item: Item;
  drag: () => void;
  isActive: boolean;
}

const Checkbox = ({ item, drag, isActive }: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <ScaleDecorator>
      <TouchableOpacity
        activeOpacity={1}
        disabled={isActive}
        style={styles.touchableOpacity}
      >
        <CheckBox checked={checked} onPress={() => setChecked(!checked)} />
        <TextInput
          placeholder={"Title"}
          textAlign={"center"}
          style={styles.checkbox}
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

export default Checkbox;