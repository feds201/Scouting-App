import React, {useCallback, useMemo, useRef, useState} from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import DraggableFlatList from "react-native-draggable-flatlist/src/components/DraggableFlatList";
import {componentsView} from "../../components/TemplateComponents";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import {Button} from "@rneui/base";
import {setTemplate} from "./MatchScout";

const initialData: Item[] = [{text: "", key: ""}];

export default function templateEditor() {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState(initialData);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['3.5%', '38%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        //console.log('handleSheetChanges', index);
    }, []);

    function pushComponent(text: string) {
        setIndex(index + 1);
        setData([...data, {text: text, key: index.toString()}]);
    }

    function exportData() {
        console.log("Export data");
        console.log(data);
        setTemplate(data);
    }

    return (
        <View>
            <View style={{height: "100%"}}>
                <Button title={"Finish"} buttonStyle={{height: 50}} onPress={() => exportData()}/>
                <DraggableFlatList data={(data)} onDragEnd={({data}) => setData(data)} keyExtractor={(item) => item.key} renderItem={componentsView}/>
            </View>
            <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity style={{backgroundColor: "#4287f5", borderRadius: 100, padding: 30, marginLeft:20}} onPress={() => pushComponent("header")}>
                        <MaterialCommunityIcons name="label" size={35} color="#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: "#4287f5", borderRadius: 200, padding: 30, marginLeft:18}} onPress={() => pushComponent("plusminus")}>
                        <MaterialCommunityIcons name="plus-minus-variant" size={35} color="#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: "#4287f5", borderRadius: 100, padding: 30, marginLeft:18}} onPress={() => pushComponent("checkbox")}>
                        <Ionicons name="checkbox-outline" size={35} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: "#4287f5", borderRadius: 100, padding: 30, marginLeft:20, marginTop: 20}} onPress={() => pushComponent("stopwatch")}>
                        <Entypo name="stopwatch" size={35} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: "#4287f5", borderRadius: 100, padding: 30, marginLeft:20, marginTop: 20}} onPress={() => pushComponent("notes")}>
                        <MaterialIcons name="notes" size={35} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: "#4287f5", borderRadius: 100, padding: 30, marginLeft:20, marginTop: 20}} onPress={() => pushComponent("slider")}>
                        <Feather name="sliders" size={35} color="#fff" />
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contentContainer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    footer: {
        height: 400
    }
});

export const mapData = (d:any, index: number, arr: any[]) => {
    return {
        text: `${index}`,
        key: `${index}`
    };
}

export type Item = ReturnType<typeof mapData>;