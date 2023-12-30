import { Drawer } from 'expo-router/drawer';
import {DrawerContentComponentProps} from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";

export default function Layout() {
    return (
        <Drawer drawerContent={(props: DrawerContentComponentProps) => <CustomDrawer{...props}/>}>
            <Drawer.Screen
                name="MatchScouting/Home" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                }}
            />
            <Drawer.Screen
                name="MatchScouting/Template" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Templates',
                    title: 'Templates',
                }}
            />
            <Drawer.Screen
                name={"MatchScouting/Setup"}
                options={{
                    drawerLabel: 'Setup',
                    title: 'Setup',
                }}
            />
            <Drawer.Screen
                name={"MatchScouting/Settings"}
                options={{
                    drawerLabel: 'Settings',
                    title: "Settings",
                }}
            />
            <Drawer.Screen
                name="index"
                options={{
                    drawerItemStyle: { height: 0 },
                    title: 'Home'
                }}
            />
        </Drawer>
    );
}