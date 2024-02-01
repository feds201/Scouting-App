import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { ScaleDecorator } from "react-native-draggable-flatlist"
import { Item } from "../../types/Item";

interface HeaderProps {
  item: Item
  drag: () => void;
  isActive: boolean;
}

const Header = ({ item, drag, isActive }: HeaderProps) => {
  return (
    <ScaleDecorator>
      <TouchableOpacity
        activeOpacity={1}
        disabled={isActive}
        style={styles.touchableOpacity}
      >
        <Text>{item.name}</Text>
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

export default Header;