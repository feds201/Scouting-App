import { Button, Dialog, Slider as RNEUISlider } from "@rneui/base";
import { TouchableOpacity, TextInput, View, Text, StyleSheet } from "react-native";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { Item } from "../../types/Item";
import { useState } from "react";

interface SliderProps {
  item: Item
  drag: () => void;
  isActive: boolean;
}

const Slider = ({ item, drag, isActive }: SliderProps) => {
  const [dialog, setDialog] = useState<boolean>(false);
  const [minValue, setMinValue] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

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
          style={styles.titleTextInput}
          onChangeText={
            (text) => {
              item.name = text;
            }
          } />

        <View style={styles.sliderView}>
          <RNEUISlider
            minimumValue={minValue}
            step={step}
            maximumValue={maxValue}
            thumbTintColor={"#4287f5"}
            style={styles.slider}
            value={minValue} />
          <Text>Value: {minValue}</Text>
        </View>

        <Button title={"Options"} onPress={() => setDialog(true)} />
      </TouchableOpacity>

      <Dialog
        overlayStyle={styles.dialog}
        isVisible={dialog}
        onBackdropPress={() => setDialog(!dialog)}>
        <Dialog.Title title="Options" />
        <Dialog.Actions>
          <TextInput
            placeholder={"MIN VALUE"}
            onChangeText={
              (value) => {
                setMinValue(parseInt(value));
                const object = JSON.parse(item.data);
                object.minValue = value;
                item.data = JSON.stringify(object);
              }
            } />
          <TextInput
            placeholder={"STEP VALUE"}
            onChangeText={
              (value) => {
                setStep(parseInt(value));
                const object = JSON.parse(item.data);
                object.step = value;
                item.data = JSON.stringify(object);
              }
            } />
          <TextInput
            placeholder={"MAX VALUE"}
            onChangeText={
              (value) => {
                setMaxValue(parseInt(value));
                const object = JSON.parse(item.data);
                object.maxValue = value;
                item.data = JSON.stringify(object);
              }
            } />
          <Button title={"Submit"} onPress={() => setDialog(false)} />
        </Dialog.Actions>
      </Dialog>

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
  titleTextInput: {
    marginLeft: 5,
    width: 100
  },
  sliderView: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  slider: {
    marginRight: 40
  },
  dialog: {
    backgroundColor: "#fff",
  }
})

export default Slider;