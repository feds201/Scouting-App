import {Pressable, StyleSheet, Text, View, TextInput, ImageBackground, ScrollView} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { MatchEntity } from "../../../database/entity/Match.entity";
import { dataSource } from "../../../database/data-source";
import { Item } from "../../../types/Item";
import { useFonts } from 'expo-font';
import {Background} from "@react-navigation/elements";
import {ButtonGroup, Divider} from "@rneui/base";
import Counter from "react-native-counters";
import Dropdown from "../../../components/Dropdown";
import DropdownComponent from "../../../components/Dropdown";


export default function MatchScout() {

  const [fontsLoaded] = useFonts({
    'Raleway-Black': require('../../../assets/fonts/Raleway-Black.ttf'),
    'Raleway-Extrabold': require('../../../assets/fonts/Raleway-ExtraBold.ttf'),
    'Raleway-Semibold': require('../../../assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Regular': require('../../../assets/fonts/Raleway-Regular.ttf'),
    'Inter-Regular': require('../../../assets/fonts/Inter-Regular.otf')
  });

  const { id } = useLocalSearchParams();
  const [match, setMatch] = useState<MatchEntity>(null);
  const [data, setData] = useState<Item[]>([]);
  const [scouterID, setScouterID] = useState<string>("-1");
  const [matchTitle, setMatchTitle] = useState("");
  const [selected, setSelected] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexes, setSelectedIndexes] = useState([2, 2, 2]);

  console.log("RENDERING!", Date.now(), `${match}, ${data}`);

  useEffect(() => {

    const getMatch = async () => {
      const MatchRepository = dataSource.getRepository(MatchEntity);
      const wantedMatch = await MatchRepository
        .createQueryBuilder("match")
        .where("match.id = :id", { id: id })
        .getOne();

      setMatch(wantedMatch);

    }
    getMatch().then(r => console.log("update"));
  }, [id]);

  return (
    <>
      {match ? (
          <Background style={{backgroundColor: 'transparent'}}>
            <View style={{alignItems: "center", backgroundColor: "white", borderBottomLeftRadius: 100, borderBottomRightRadius: 100, paddingBottom: 10, zIndex: 1 }}>
              <Text style={{fontFamily: 'Raleway-Black', fontSize: 70}}>{filterMatch(match.matchType) + " " + match.matchNumber}</Text>
              <Text style={{fontFamily: 'Raleway-Semibold', fontSize: 40}}>{"Team Number: " + filterTeamNumber(match.teamNumber)}</Text>
              <View style={{flexDirection: "row"}}>
                <TextInput placeholder={"Input Scouting ID  "} textAlign={"center"} style={{fontFamily: 'Raleway-Regular', fontSize: 30}} onChangeText={(text) => setScouterID(text)} />
              </View>
            </View>
              <ScrollView style={{marginTop: -100, marginBottom: -50}}>
                <ImageBackground source={require('../../../assets/images/bkg.png')} style={{width: '100%', height: '100%'}}>
                  <View style={{alignItems: "center", paddingTop: 100}}>
                    <Text style={{fontFamily:'Raleway-Extrabold', fontSize: 50, color: "white"}}>Auton</Text>
                    <Divider color={"white"} inset={true} orientation={"vertical"} width={5} insetType="middle" />
                    <ButtonGroup buttons={['Leave', 'Center Area']} selectedButtonStyle={{backgroundColor: "#429ef5"}} disabledSelectedStyle={{backgroundColor: "black"}} selectMultiple selectedIndexes={selectedIndexes} onPress={(value) => {setSelectedIndexes(value);}} containerStyle={{ marginTop:20, marginBottom:20, borderRadius: 50 }}/>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                      <Text style={{fontFamily: 'Raleway-Semibold', fontSize: 30, color: "white"}}>Speaker: </Text>
                      <Counter
                          buttonStyle={{
                            width: 50,
                            height: 50,
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 100
                          }}
                          buttonTextStyle={{
                            color: 'white',
                          }}
                          countTextStyle={{
                            alignItems: "center",
                            fontFamily: 'Inter-Regular',
                            fontSize: 20,
                            color: 'white',
                          }}
                      />
                      <Text style={{fontFamily: 'Raleway-Semibold', fontSize: 30, paddingLeft: 30, color: "white"}}>Amp: </Text>
                      <Counter
                          buttonStyle={{
                            width: 50,
                            height: 50,
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 100
                          }}
                          buttonTextStyle={{
                            color: 'white',
                          }}
                          countTextStyle={{
                            alignItems: "center",
                            fontFamily: 'Inter-Regular',
                            fontSize: 20,
                            color: 'white',
                          }}
                      />
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
                      <Text style={{fontFamily: 'Raleway-Semibold', fontSize: 30, color: "white"}}>Missed: </Text>
                      <Counter
                          buttonStyle={{
                            width: 50,
                            height: 50,
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 100
                          }}
                          buttonTextStyle={{
                            color: 'white',
                          }}
                          countTextStyle={{
                            alignItems: "center",
                            fontFamily: 'Inter-Regular',
                            fontSize: 20,
                            color: 'white',
                          }}
                      />
                    </View>
                    <Text style={{fontFamily:'Raleway-Extrabold', fontSize: 50, color: "white"}}>Teleop</Text>
                    <Divider color={"white"} inset={true} orientation={"vertical"} width={5} insetType="middle" />
                    <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
                      <Text style={{fontFamily: 'Raleway-Semibold', fontSize: 30, color: "white"}}>Speaker: </Text>
                      <Counter
                          buttonStyle={{
                            width: 50,
                            height: 50,
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 100
                          }}
                          buttonTextStyle={{
                            color: 'white',
                          }}
                          countTextStyle={{
                            alignItems: "center",
                            fontFamily: 'Inter-Regular',
                            fontSize: 20,
                            color: 'white',
                          }}
                      />
                      <Text style={{fontFamily: 'Raleway-Semibold', fontSize: 30, paddingLeft: 30, color: "white"}}>Amp: </Text>
                      <Counter
                          buttonStyle={{
                            width: 50,
                            height: 50,
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 100
                          }}
                          buttonTextStyle={{
                            color: 'white',
                          }}
                          countTextStyle={{
                            alignItems: "center",
                            fontFamily: 'Inter-Regular',
                            fontSize: 20,
                            color: 'white',
                          }}
                      />
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
                      <Text style={{fontFamily: 'Raleway-Semibold', fontSize: 30, color: "white"}}>Missed: </Text>
                      <Counter
                          buttonStyle={{
                            width: 50,
                            height: 50,
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 100
                          }}
                          buttonTextStyle={{
                            color: 'white',
                          }}
                          countTextStyle={{
                            alignItems: "center",
                            fontFamily: 'Inter-Regular',
                            fontSize: 20,
                            color: 'white',
                          }}
                      />
                    </View>
                    <ButtonGroup
                        selectedButtonStyle={{backgroundColor: "#429ef5"}}
                        disabledSelectedStyle={{backgroundColor: "black"}}
                        buttons={['Offensive', 'Defensive', 'Hybrid']}
                        selectedIndex={selectedIndex}
                        onPress={(value) => {
                          setSelectedIndex(value);
                        }}
                        containerStyle={{ marginTop:20, marginBottom:20, borderRadius: 50 }}
                    />
                    <View style={{flexDirection: "row", alignItems: "center", marginTop: 0}}>
                      <Text style={{fontFamily: 'Raleway-Semibold', fontSize: 30, color: "white"}}>Amplifications: </Text>
                      <Counter
                          buttonStyle={{
                            width: 50,
                            height: 50,
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 100
                          }}
                          buttonTextStyle={{
                            color: 'white',
                          }}
                          countTextStyle={{
                            alignItems: "center",
                            fontFamily: 'Inter-Regular',
                            fontSize: 20,
                            color: 'white',
                          }}
                      />
                    </View>
                    <ButtonGroup
                        selectedButtonStyle={{backgroundColor: "#429ef5"}}
                        disabledSelectedStyle={{backgroundColor: "black"}}
                        buttons={['Inside Wing', 'Outside Wing', 'Center Area']}
                        selectedIndex={selected}
                        onPress={(value) => {
                          setSelected(value);
                        }}
                        containerStyle={{ marginTop:20, marginBottom:20, borderRadius: 50 }}
                    />
                    <Text style={{fontFamily:'Raleway-Extrabold', fontSize: 50, color: "white"}}>Endgame</Text>
                    <Divider color={"white"} inset={true} orientation={"vertical"} width={5} insetType="middle" />
                    <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
                      <Text style={{fontFamily: 'Raleway-Semibold', fontSize: 30, color: "white"}}>High Notes: </Text>
                      <Counter
                          buttonStyle={{
                            width: 50,
                            height: 50,
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 100
                          }}
                          buttonTextStyle={{
                            color: 'white',
                          }}
                          countTextStyle={{
                            alignItems: "center",
                            fontFamily: 'Inter-Regular',
                            fontSize: 20,
                            color: 'white',
                          }}
                      />
                      <Text style={{fontFamily: 'Raleway-Semibold', fontSize: 30, paddingLeft: 30, color: "white"}}>Trap: </Text>
                      <Counter
                          buttonStyle={{
                            width: 50,
                            height: 50,
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 100
                          }}
                          buttonTextStyle={{
                            color: 'white',
                          }}
                          countTextStyle={{
                            alignItems: "center",
                            fontFamily: 'Inter-Regular',
                            fontSize: 20,
                            color: 'white',
                          }}
                      />
                    </View>
                    <DropdownComponent></DropdownComponent>
                    <Text style={{paddingTop: 200}}>a</Text>
                  </View>
                </ImageBackground>
              </ScrollView>
                <View style={{alignItems: "center", borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: "white"}}>
                  <Link href={"/MatchScouting/QRCodeGenerator"} asChild>
                    <Pressable style={styles.pressable}>
                      <View style={styles.createView}>
                        <Text style={{fontFamily:'Raleway-Semibold', fontSize: 18, color: "white"}}>Submit</Text>
                      </View>
                    </Pressable>
                  </Link>
                </View>
          </Background>
      ) : (
        <>
          <View style={{alignItems: "center"}}>
            <Text style={{fontFamily:'Raleway-Semibold', fontSize: 60, color: "black"}}>Loading Match...</Text>
          </View>
        </>
      )}
    </>
  );
}

function filterMatch(bro: string) {
  if(bro == "qm") {
    return "Qualifying"
  } else if(bro == "qf") {
    return "Quarterfinals"
  } else if(bro == "sf") {
    return "Semifinals"
  } else if(bro == "f") {
    return "Finals"
  }
  return bro;
}

function filterTeamNumber(num: number) {
  let broooo = num.toString();
  return broooo.substring(3, broooo.length);
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
  topLevelView: {
    alignItems: "center",
  },
  titleText: {
    marginTop: 20,
    fontSize: 50,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  pressable: {
    padding: 10,
  },
  createView: {
    backgroundColor: "black",
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  createText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  flatList: {
    marginTop: 10,
  },
  textInput: {
    color: "black",
    textAlign: "center",
    fontSize: 30
  },
  textInputView: {
    flex: 1,
    backgroundColor: "red",
    height: 100,
    marginTop: 30,
  }
});