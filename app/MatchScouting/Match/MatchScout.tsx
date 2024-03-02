import {Pressable, StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, Modal} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { MatchEntity } from "../../../database/entity/Match.entity";
import { dataSource } from "../../../database/data-source";
import { Item } from "../../../types/Item";
import { useFonts } from 'expo-font';
import {Background} from "@react-navigation/elements";
import {Button, ButtonGroup, Divider} from "@rneui/base";
import Counter from "react-native-counters";
import QRCode from "react-native-qrcode-svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Dropdown} from "react-native-element-dropdown";

export default function MatchScout() {

  const [fontsLoaded] = useFonts({
    'Raleway-Black': require('../../../assets/fonts/Raleway-Black.ttf'),
    'Raleway-Extrabold': require('../../../assets/fonts/Raleway-ExtraBold.ttf'),
    'Raleway-Semibold': require('../../../assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Regular': require('../../../assets/fonts/Raleway-Regular.ttf'),
    'Inter-Regular': require('../../../assets/fonts/Inter-Regular.otf')
  });

  const datas = [
    { label: 'None', value: '1' },
    { label: 'Parked', value: '2' },
    { label: 'Climbed', value: '3' },
    { label: 'Climbed (+1)', value: '4' },
    { label: 'Climbed (+2)', value: '5' }
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const { id } = useLocalSearchParams();
  const [match, setMatch] = useState<MatchEntity>(null);
  const [data, setData] = useState<Item[]>([]);
  const [scouterID, setScouterID] = useState<string>("");
  const [endEnd, setEndEnd] = useState(-1);
  const [playstyle, setPlaystyle] = useState(-1);
  const [autonBeginning, setAutonBeginning] = useState([]);

  const [autonSpeaker, setAutonSpeaker] = useState(-1);
  const [autonAmp, setAutonAmp] = useState(-1);
  const [autonMissed, setAutonMissed] = useState(-1);
  const [teleopSpeaker, setTeleopSpeaker] = useState(-1);
  const [teleopAmp, setTeleopAmp] = useState(-1);
  const [teleopMissed, setTeleopMissed] = useState(-1);
  const [amplifications, setAmplifications] = useState(-1);
  const [highNotes, setHighNotes] = useState(-1);
  const [trap, setTrap] = useState(-1);

  const [matchData, setMatchData] = useState("");
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
              <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
              />
          )}
        </View>
    );
  };

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

  function doThings() {
    bundleData(match.matchType, match.matchNumber, parseInt(filterTeamNumber(match.teamNumber)), scouterID, autonBeginning, autonSpeaker, autonAmp, autonMissed, teleopSpeaker, teleopAmp, teleopMissed, playstyle, amplifications, highNotes, trap, endEnd);
    setModalVisible(true);
  }

  function bundleData(matchType: string, matchNum: number, teamNum: number, scoutingID: string, autonBeginning: number[], autonSpeaker: number, autonAmp: number, autonMissed: number, teleopSpeaker: number, teleopAmp: number, teleopMissed: number, playstyle: number, amplifications: number, highNotes: number, trap: number, endEnd: number) {
    let x = "";
    if(autonBeginning[0] == 0 && autonBeginning[1] == 1) {
      x = "leave, centerArea"
    } else if(autonBeginning[0] == 0) {
      x = "leave"
    } else if(autonBeginning[0] == 1) {
      x = "centerArea"
    } else {
      x = "stationary"
    }

    let y = scouterID;
    if(scoutingID == "") {
      y = "noID"
    }

    let z = "";
    if(playstyle == 0) {
      z = "Offensive"
    } else if(playstyle == 1) {
      z = "Defensive"
    } else if(playstyle == 2) {
      z = "hybrid"
    } else {
      z = "none"
    }

    let a = "";
    if(endEnd == 0) {
      a = "insideWing"
    } else if(endEnd == 1) {
      a = "outsideWing"
    } else if(endEnd == 2) {
      a = "centerArea"
    } else {
      a = "none"
    }

    let b = "";
    if(value == 1) {
      b = "none"
    } else if(value == 2) {
      b = "parked"
    } else if(value == 3) {
      b = "climbed"
    } else if(value == 4) {
      b = "climbed+1"
    } else if(value == 5) {
      b = "climbed+2"
    } else {
      b = "bruuuu"
    }

    setMatchData(matchType + "," + matchNum + "," + teamNum + "," + y + "," + x + "," + autonSpeaker + "," + autonAmp + "," + autonMissed + "," + teleopSpeaker + "," + teleopAmp + "," + teleopMissed + "," + z + "," + amplifications + "," + highNotes + "," + trap + "," + a + "," + b);
  }

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
                    <ButtonGroup buttons={['Leave', 'Center Area']} selectedButtonStyle={{backgroundColor: "#429ef5"}} disabledSelectedStyle={{backgroundColor: "black"}} selectMultiple selectedIndexes={autonBeginning} onPress={(value) => {setAutonBeginning(value);}} containerStyle={{ marginTop:20, marginBottom:20, borderRadius: 50 }}/>
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
                          onChange={(r) => setAutonSpeaker(r)}
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
                          onChange={(r) => setAutonAmp(r)}
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
                          onChange={(r) => setAutonMissed(r)}
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
                          onChange={(r) => setTeleopSpeaker(r)}
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
                          onChange={(r) => setTeleopAmp(r)}
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
                          onChange={(r) => setTeleopMissed(r)}
                      />
                    </View>
                    <ButtonGroup
                        selectedButtonStyle={{backgroundColor: "#429ef5"}}
                        disabledSelectedStyle={{backgroundColor: "black"}}
                        buttons={['Offensive', 'Defensive', 'Hybrid']}
                        selectedIndex={playstyle}
                        onPress={(value) => {
                          setPlaystyle(value);
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
                          onChange={(r) => setAmplifications(r)}
                      />
                    </View>
                    <ButtonGroup
                        selectedButtonStyle={{backgroundColor: "#429ef5"}}
                        disabledSelectedStyle={{backgroundColor: "black"}}
                        buttons={['Inside Wing', 'Outside Wing', 'Center Area']}
                        selectedIndex={endEnd}
                        onPress={(value) => {
                          setEndEnd(value);
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
                          onChange={(r) => setHighNotes(r)}
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
                          onChange={(r) => setTrap(r)}
                      />
                    </View>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={datas}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="End of Match"
                        value={value}
                        onChange={item => {
                          setValue(item.value);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                        )}
                        renderItem={renderItem}
                    />
                    <Text style={{paddingTop: 200}}>a</Text>
                  </View>
                </ImageBackground>
              </ScrollView>
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={modalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <QRCode value={matchData} size={200} color="black" backgroundColor="white"/>
                    <Pressable style={{paddingTop: 20}} onPress={() => setModalVisible(false)}>
                      <View style={styles.pressableView}>
                        <Text style={styles.pressableText}>Done</Text>
                      </View>
                    </Pressable>
                </View>
              </View>
            </Modal>
                <View style={{alignItems: "center", borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: "white"}}>
                  <Pressable style={styles.pressable} onPress={() => doThings()}>
                    <View style={styles.createView}>
                      <Text style={{fontFamily:'Raleway-Semibold', fontSize: 18, color: "white"}}>Submit</Text>
                    </View>
                  </Pressable>
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
  dropdown: {
    margin: 16,
    height: 70,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
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
  },
  buttonView: {
    alignItems: "center",
    paddingTop: 20
  },
  templateName: {
    marginBottom: 15,
  },
  templateInput: {
    paddingTop: 10,
  },
  pressableView: {
    backgroundColor: "#429ef5",
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  pressableText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 54,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topLevelTemplatesView: {
    alignItems: "center",
    paddingTop: 10
  },
  pressableForTemplates: {
    paddingTop: 3,
  },
  templateView: {
    backgroundColor: "#429ef5",
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  templateViewText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  topLevelScrollView: {
    marginBottom: 0,
  },
  scrollViewArea: {
    paddingBottom: 50,
  },
  templateHeadingText: {
    paddingTop: 20,
    paddingBottom: 0,
    fontSize: 20,
  }
});

