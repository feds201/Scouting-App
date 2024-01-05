import {FlatList, Pressable, Text, View} from "react-native";
import {Item} from "./TemplateEditor";
import React, {useState} from "react";
import {componentsView} from "../../components/TemplateComponents";
import DraggableFlatList from "react-native-draggable-flatlist/src/components/DraggableFlatList";
import {Button} from "@rneui/base";
import {Link} from "expo-router";
import createQR from "./QR";

let initialData:Item[] = [{text: "", key: ""}];
let matchNum = 0;
let teamNum = 0;
let matchTyp = "";

export default function matchScout() {
    const [data, setData] = useState(initialData);
    return(
        <View style={{alignItems: "center"}}>
            <Text>{matchTyp + " " + teamNum + " " + matchNum}</Text>
            <Link href={"/MatchScouting/QR"} asChild>
                <Pressable style={{paddingTop: 30}} onPress={() => createQR("bomb")}>
                    <View style={{backgroundColor: "#429ef5", width: 200, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 30}}>
                        <Text style={{color: '#FFF', fontWeight: 'bold'}}>Create</Text>
                    </View>
                </Pressable>
            </Link>
            <DraggableFlatList data={(data)} keyExtractor={(item) => item.key} renderItem={componentsView}/>
        </View>
    );
}

export function setParams(matchNumber: number, teamNumber: number, matchType: string) {
    matchNum = matchNumber;
    teamNum = teamNumber;
    matchTyp = matchType;
}

export function setTemplate(item:Item[]) {
    initialData = item;
}