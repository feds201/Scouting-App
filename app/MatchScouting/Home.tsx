import {Pressable, ScrollView, View} from "react-native";
import {getEventDatabase} from "../../database/eventDatabase";
import {Button, Text} from "@rneui/themed";
import {Link} from "expo-router";
import React from "react";
import {setParams} from "./MatchScout";

export default function Match_Home() {
    const arr: any[] = getEventDatabase();

    //MAP FEATURE IS SO LAGGYYYYYYYYYY
    //Have to save its state in database so it dosent keep doing this each time we load the page

    return(
        <View style={{alignItems: "center"}}>
            <Text h3 style={{alignItems: "center"}}>Matches</Text>
            <ScrollView style={{marginBottom: 0}} showsVerticalScrollIndicator={false}>
                <View style={{paddingBottom: 50}}>
                    {arr.map((tang) => {
                        return (
                            <View key={tang.id} style={{alignItems: "center", paddingTop: 10}}>
                                <Link href={"/MatchScouting/MatchScout"} asChild>
                                    <Pressable style={{paddingTop: 3}} onPress={() => setParams(tang.matchNumber, tang.teamNumber, tang.matchType)}>
                                        <View style={{backgroundColor: "#429ef5", width: 200, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 30}}>
                                            <Text style={{color: '#FFF', fontWeight: 'bold'}}>{(tang.matchType).toUpperCase() + " " + tang.matchNumber}</Text>
                                        </View>
                                    </Pressable>
                                </Link>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}