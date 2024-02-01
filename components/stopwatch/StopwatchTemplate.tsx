import { TouchableOpacity, TextInput, StyleSheet } from "react-native";
import StopwatchTimer, { StopwatchTimerMethods } from "react-native-animated-stopwatch-timer";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { Item } from "../../types/Item";
import { Button } from "@rneui/base";
import { useRef } from "react";

interface StopwatchTemplateProps {
  item: Item
  drag: () => void;
  isActive: boolean;
}

const StopwatchTemplate = ({ item, drag, isActive }: StopwatchTemplateProps) => {
  const stopwatchTimerRef = useRef<StopwatchTimerMethods>(null);

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
        <StopwatchTimer ref={stopwatchTimerRef} />
        <Button title={"Start"} buttonStyle={styles.button} containerStyle={styles.firstButtonContainer} />
        <Button title={"Pause"} buttonStyle={styles.button} containerStyle={styles.restButtonContainer} />
        <Button title={"Reset"} buttonStyle={styles.button} containerStyle={styles.restButtonContainer} />
      </TouchableOpacity>
    </ScaleDecorator>
  );
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
  button: {
    borderRadius: 30,
  },
  firstButtonContainer: {
    marginLeft: 10,
  },
  restButtonContainer: {
    marginLeft: 0
  }
})

export default StopwatchTemplate;
