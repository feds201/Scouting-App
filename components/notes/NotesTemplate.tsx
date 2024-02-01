import { TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { Item } from "../../types/Item";

interface NotesProps {
  item: Item
  drag: () => void;
  isActive: boolean;
}

const NotesTemplateTemplate = ({ item, drag, isActive }: NotesProps) => {
  return (
    <ScaleDecorator>
      <TouchableOpacity activeOpacity={1} onLongPress={drag} disabled={isActive} style={styles.touchableOpacity}>
        <TextInput 
          placeholder={"Title"} 
          textAlign={"center"} 
          style={styles.titleTextInput} 
          onChangeText={
            (text) => {
              item.name = text;
            }
          }
          />
        <Text style={styles.notesTextInput}> Notes </Text>
      </TouchableOpacity>
    </ScaleDecorator>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: "#FFFAFA",
    height: 100,
    flex: 1,
    alignContent: "center",
    alignItems: "center"
  },
  titleTextInput: {
    width: 100,
  },
  notesTextInput: {
    marginTop: 10
  }
});

export default NotesTemplateTemplate;