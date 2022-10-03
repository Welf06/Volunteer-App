
import { VolunteerFeed } from './VolunteerFeed';
import {OrganizationFeed} from './OrganizationFeed';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


export const OrganizationTabs = ({navigation}) => {
    return (
        <Tab.Navigator screenOptions={
            {
                tabBarLabelStyle:{
                    color: '#1A535C',
                    padding: 5,
                    fontWeight: 'bold',
                    fontSize: 15,
                },
                tabBarContentContainerStyle:{
                    backgroundColor: '#4ECDC459',
                },
                tabBarIndicatorStyle:{
                    backgroundColor: '#1A535C',
                    height: 3,
                }
            }
        }>
            <Tab.Screen name="Create" component={OrganizationFeed} />
            <Tab.Screen name="Browse" component={VolunteerFeed} />
        </Tab.Navigator>
    )
}

