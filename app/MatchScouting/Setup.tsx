import {Input, Text} from '@rneui/themed';
import {View} from "react-native";
import {Button} from "@rneui/base";
import {useState} from "react";
import createEventDatabase, {addToEventDatabase, debugPrint, deleteData} from "../../database/eventDatabase";


let qualsMatchNumbers:number[] = [];
let qualsTeamNumbers:number[] = [];
let quarterFinalsMatchNumbers:number[] = [];
let quarterFinalsTeamNumbers:number[] = [];
let semiFinalsMatchNumbers:number[] = [];
let semiFinalsTeamNumbers:number[] = [];
let finalsMatchNumbers:number[] = [];
let finalsTeamNumbers:number[] = [];

export default function Setup() {

    const [eventCode, setEventCode] = useState('');
    const [robotCode, setRobotCode] = useState('');

    const requestURL = "https://www.thebluealliance.com/api/v3/event/" + eventCode + "/matches/simple";

    return(
        <View style={{alignItems: "center", paddingTop: 20}}>
            <Text h3>Event Code</Text>
            <Input
                placeholder='Example: 2022miroc'
                onChangeText={text => setEventCode(text)}
                containerStyle={{width: 200, paddingTop: 20}}
            />
            <Text h3>Robot Code</Text>
            <Input
                placeholder='Example: R1'
                onChangeText={text => setRobotCode(text)}
                containerStyle={{width: 200, paddingTop: 20}}
            />

            <Button title={"Submit"} onPress={() => {getEventDetailsFromBlueAlliance(requestURL, robotCode.at(0), robotCode.at(1)).then(r => console.log(r))}}/>

            <Text h3 style={{paddingTop: 30}}>Debug Options</Text>
            <Button title={"Create Database"} onPress={() => createEventDatabase()} containerStyle={{paddingTop: 20}}/>
            <Button title={"Add to Database"} onPress={() => addToEventDatabase(1, 201, "qm")} containerStyle={{paddingTop: 30}}/>
            <Button title={"Get from Database"} onPress={() => debugPrint()} containerStyle={{paddingTop: 30}}/>
            <Button title={"Delete Debug Data"} onPress={() => deleteData()} containerStyle={{paddingTop: 30}}/>
        </View>
    );
}

const getEventDetailsFromBlueAlliance = async (requestURL: string, teamColor: string|undefined, orderNumber: string|undefined) => {

    if(teamColor) {
        teamColor.toLowerCase();
    }

    let order = "";

    if(orderNumber == "1") {
        order = "0";
    } else if(orderNumber == "2") {
        order = "1"
    } else if(orderNumber == "3") {
        order = "2"
    }

    //Getting all the teams returned from Blue Alliance into arrays based off of match type

    const qualsTeams: string[] = [];
    const quarterFinalsTeams: string[] = [];
    const semiFinalsTeams: string[] = [];
    const finalsTeams: string[] = [];

    //Getting all the match numbers so we can link up the match number to the team number
    //Blue alliance does not put in the order we want but we do know that when we access each field the indexes for both arrays will correspond to eachother
    //The order for the teams arrays and the match number arrays correspond to eachother and will be correct at each index since we access both fields at the same time in the loop

    const qualsMatchNumbers: number[] = [];
    const quarterFinalsMatchNumbers: number[] = [];
    const semiFinalsMatchNumbers: number[] = [];
    const finalsMatchNumbers: number[] = [];

    try {
        await fetch(requestURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                //Prob a good idea to hide this soon
                'X-TBA-Auth-Key': "SEKJIktW6qP1oovjihNBI4MRclNvbU4mMlyccCqnTlCqO39AqpxUNAvaqlaSuj9F"
            },
        }).then(response => response.json()).then(json => {
            for (let index = 0; index < Object.keys(json).length; index++) {
                if(json[index].comp_level == "qm") {
                    if(teamColor == "r") {
                        qualsTeams.push(json[index].alliances.red.team_keys[order]);
                        qualsMatchNumbers.push(json[index].match_number);
                    } else {
                        qualsTeams.push(json[index].alliances.blue.team_keys[order]);
                        qualsMatchNumbers.push(json[index].match_number);
                    }
                } else if(json[index].comp_level == "qf") {
                    if(teamColor == "r") {
                        quarterFinalsTeams.push(json[index].alliances.red.team_keys[order]);
                        quarterFinalsMatchNumbers.push(json[index].match_number);
                    } else {
                        quarterFinalsTeams.push(json[index].alliances.blue.team_keys[order]);
                        quarterFinalsMatchNumbers.push(json[index].match_number);
                    }
                } else if(json[index].comp_level == "sf") {
                    if(teamColor == "r") {
                        semiFinalsTeams.push(json[index].alliances.red.team_keys[order]);
                        semiFinalsMatchNumbers.push(json[index].match_number);
                    } else {
                        semiFinalsTeams.push(json[index].alliances.blue.team_keys[order]);
                        semiFinalsMatchNumbers.push(json[index].match_number);
                    }
                } else if(json[index].comp_level == "f") {
                    if(teamColor == "r") {
                        finalsTeams.push(json[index].alliances.red.team_keys[order]);
                        finalsMatchNumbers.push(json[index].match_number);
                    } else {
                        finalsTeams.push(json[index].alliances.blue.team_keys[order]);
                        finalsMatchNumbers.push(json[index].match_number);
                    }
                }
            }

            matchesSorting(qualsTeams, quarterFinalsTeams, semiFinalsTeams, finalsTeams, qualsMatchNumbers, quarterFinalsMatchNumbers, semiFinalsMatchNumbers, finalsMatchNumbers);

        });
    } catch (error) {
        console.error(error);
    }
};

const matchesSorting = (qmTeams: string[], qfTeams: string[], sfTeams: string[], fTeams: string[], qmNum: number[], qfNum: number[], sfNum: number[], fNum: number[]) => {
    //Warning: let the unnecessarily long code but definitely necessary code (for my own sanity of understanding what im doing) begin
    //qmTeams => qmNum, qfTeams => qfNum, sfTeams => sfNum, fTeams => fNum

    sortPair(qmNum, qmTeams, "qm");
    sortPair(qfNum, qfTeams, "qf");
    sortPair(sfNum, sfTeams, "sf");
    sortPair(fNum, fTeams, "f");

    alert("Success!");

}

function sortPair(key: number[], list: string[], matchType: string) {
    const tempkey: number[] = [];
    const templist: number[] = [];

    let x = key.length;
    while (x != 0) {
        let smallest = 1000000000;
        for(let i = 0; i < key.length; i++) {
            if(key[i] < smallest) {
                smallest = key[i];
            }
        }
        const location = key.indexOf(smallest);
        tempkey.push(key[location]);
        templist.push(parseInt(list[location].substring(3)));
        delete key[location];
        delete list[location];
        x--;
    }
    if(matchType == "qm") {
        qualsMatchNumbers = qualsMatchNumbers.concat(tempkey);
        qualsTeamNumbers = qualsTeamNumbers.concat(templist)
    }
    if(matchType == "qf") {
        quarterFinalsMatchNumbers = quarterFinalsMatchNumbers.concat(tempkey);
        quarterFinalsTeamNumbers = quarterFinalsTeamNumbers.concat(templist);
    }
    if(matchType == "sf") {
        semiFinalsMatchNumbers = semiFinalsMatchNumbers.concat(tempkey);
        semiFinalsTeamNumbers = semiFinalsTeamNumbers.concat(templist);
    }
    if(matchType == "f") {
        finalsMatchNumbers = finalsMatchNumbers.concat(tempkey);
        finalsTeamNumbers = finalsTeamNumbers.concat(templist);
    }
}