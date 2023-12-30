import {Input, Text} from '@rneui/themed';
import {View} from "react-native";
import {Button} from "@rneui/base";
import {useState} from "react";

export default function Setup() {

    const [eventCode, setEventCode] = useState('');

    const requestURL = "https://www.thebluealliance.com/api/v3/event/" + eventCode + "/matches/simple";

    return(
        <View style={{alignItems: "center", paddingTop: 20}}>
            <Text h3>Event Code</Text>
            <Input
                placeholder='Event Code'
                id='eventcode'
                onChangeText={text => setEventCode(text)}
                containerStyle={{width: 200, paddingTop: 20}}
            />
            <Button title={"Submit"} onPress={() => {getEventDetailsFromBlueAlliance(requestURL).then(r => console.log("Submitted"))}}/>
        </View>
    );
}

const getEventDetailsFromBlueAlliance = async (requestURL: string) => {
    try {
        await fetch(requestURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-TBA-Auth-Key': "SEKJIktW6qP1oovjihNBI4MRclNvbU4mMlyccCqnTlCqO39AqpxUNAvaqlaSuj9F"
            },
        }).then(response => response.json()).then(json => {
            console.log(json);
        });
    } catch (error) {
        console.error(error);
    }
};