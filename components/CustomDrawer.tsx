import { View, StyleSheet } from "react-native";
import {DrawerContentComponentProps, DrawerItemList} from "@react-navigation/drawer";
import { Text } from '@rneui/themed';
import {Button} from "@rneui/base";
const CustomDrawer = (props: DrawerContentComponentProps) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{alignItems: "center", paddingTop: 30}}>
                <Text h4 style={{}}>Match Scouting</Text>
            </View>
            <View
                style={{
                    borderTopWidth: 1,
                    borderTopColor: "#ccc",
                }}
            >
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 0 }}>
                <DrawerItemList {...props} />
            </View>
            <View style={{marginBottom: 20, alignItems: "center"}}>
                <Button title={"Switch to Pit Scouting"} buttonStyle={{borderRadius: 30}} containerStyle={{width: 200}}></Button>
            </View>
        </View>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    userAvatar: {
        height: 67.5,
        width: 67.5,
        borderRadius: 40,
        marginBottom: 10,
        marginTop: 30,
    },
    switchTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 7,
        paddingVertical: 5,
    },
    preferences: {
        fontSize: 16,
        color: "#ccc",
        paddingTop: 10,
        fontWeight: "500",
        paddingLeft: 20,
    },
    switchText: {
        fontSize: 17,
        color: "",
        paddingTop: 10,
        fontWeight: "bold",
    },
});