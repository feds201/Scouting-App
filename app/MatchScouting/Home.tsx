import { Pressable, ScrollView, View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { MatchEntity } from "../../database/entity/Match.entity";
import { dataSource } from "../../database/data-source";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFonts} from "expo-font";

export default function Home({ }) {
  const [matches, setMatches] = useState<MatchEntity[]>([]);
  const [eventCode, setEventCode] = useState<string>("");

  const isFocused = useIsFocused();

  const [fontsLoaded] = useFonts({
    'Raleway-Black': require('../../assets/fonts/Raleway-Black.ttf'),
  });

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    const connect = async () => {
      if (!dataSource.isInitialized) {
        await dataSource.initialize();
      }
    };
   connect().then(r => retrieveMatches());

    const retrieveMatches = async () => {
      const MatchRepository = dataSource.getRepository(MatchEntity);
      console.log(dataSource.getRepository(MatchEntity));
      const qmMatches = await MatchRepository
        .createQueryBuilder("match")
        .where("match.matchType = :matchType", { matchType: "qm" })
        .orderBy("match.matchNumber", "ASC")
        .getMany()

      const qfMatches = await MatchRepository
        .createQueryBuilder("match")
        .where("match.matchType = :matchType", { matchType: "qf" })
        .orderBy("match.matchNumber", "ASC")
        .getMany()

      const sfMatches = await MatchRepository
        .createQueryBuilder("match")
        .where("match.matchType = :matchType", { matchType: "sf" })
        .orderBy("match.matchNumber", "ASC")
        .getMany()

      const fMatches = await MatchRepository
        .createQueryBuilder("match")
        .where("match.matchType = :matchType", { matchType: "f" })
        .orderBy("match.matchNumber", "ASC")
        .getMany()

      let allMatches = [...qmMatches, ...qfMatches, ...sfMatches, ...fMatches];
      // console.log(allMatches);
      setMatches(allMatches);
    }

    const getEventCode = async () => {
      const returnedEventCode = await AsyncStorage.getItem("Event Code");
      setEventCode(returnedEventCode);
    }
    getEventCode().then(r => console.log("yoooo"));
  }, [isFocused]);

  return (
    <View style={styles.topLevelView}>
      <Text style={{fontFamily: 'Raleway-Black', fontSize: 60, paddingTop: 10}}> Matches </Text>
      <ScrollView style={styles.topLevelScrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollViewArea}>
          {matches.map((match) => {
            return (
              <View key={match.id} style={styles.topLevelMatchView}>
                <Link
                  href={{
                    pathname: "/MatchScouting/Match/MatchScout",
                    params: { id: match.id }
                  }}
                  asChild>
                  <Pressable
                    style={styles.pressable}
                  >
                    <View style={styles.matchView}>
                      <Text style={styles.matchViewText}>
                        {(match.matchType).toUpperCase() + " " + match.matchNumber}
                      </Text>
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

const styles = StyleSheet.create({
  topLevelView: {
    alignItems: "center",
  },
  matchHeadingText: {
    alignItems: "center",
  },
  topLevelScrollView: {
    marginBottom: 0,
  },
  scrollViewArea: {
    paddingBottom: 80,
  },
  topLevelMatchView: {
    alignItems: "center",
    paddingTop: 10
  },
  pressable: {
    paddingTop: 3,
  },
  matchView: {
    backgroundColor: "#429ef5",
    width: 400,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  matchViewText: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold'
  }
})