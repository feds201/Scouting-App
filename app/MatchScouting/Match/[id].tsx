import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DraggableFlatList from "react-native-draggable-flatlist/src/components/DraggableFlatList";
import { Link, useLocalSearchParams } from "expo-router";
import { MatchEntity } from "../../../database/entity/Match.entity";
import { dataSource } from "../../../database/data-source";
import QRCodeGenerator from "../QR";
import { templateViewGenerator } from "../../../components/GenerateDraggableFlatList";

export default function MatchScout() {
  const { id } = useLocalSearchParams();

  const [match, setMatch] = useState<MatchEntity>(null);

  const data = [];

  useEffect(() => {
    const getMatch = async () => {
      console.log(id);
      const MatchRepository = dataSource.getRepository(MatchEntity);
      const wantedMatch = await MatchRepository
        .createQueryBuilder("match")
        .where("match.id = :id", { id: id })
        .getOne();
      setMatch(wantedMatch);
    }
    getMatch();
  }, [id]);

  return (
    <View style={styles.topLevelView}>
      {match ? (
        <>
          <Text>{match.matchType + " " + match.teamNumber + " " + match.matchNumber}</Text>
          <Link href={"/MatchScouting/QR"} asChild>
            <Pressable
              style={styles.pressable}
              onPress={() => QRCodeGenerator({ text: "No data loaded." })}
            >
              <View style={styles.createView}>
                <Text style={styles.createText}>Create</Text>
              </View>
            </Pressable>
          </Link>
          <DraggableFlatList
            data={(data)}
            keyExtractor={(item) => item.key}
            renderItem={templateViewGenerator}
          />
        </>
      ) : (
        <>
          <Text>Loading Match...</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topLevelView: {
    alignItems: "center",
  },
  pressable: {
    paddingTop: 30,
  },
  createView: {
    backgroundColor: "#429ef5",
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  createText: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});