import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {TaskCard} from './TaskCard';


import Icon from 'react-native-vector-icons/FontAwesome';

const tasks = [
    {
        name: "Plant Trees",
        type: "Environmental",
        location: "New York, NY",
    },
    {
        name: "Clean Up",
        type: "Community",
        location: "New York, NY",
    },
    {
        name: "Feed the Animals",
        type: "Animal",
        location: "New York, NY",
    },
    {
        name: "Teach Kids",
        type: "Education",
        location: "New York, NY",
    },
    {
        name: "Give Blood",
        type: "Health",
        location: "New York, NY",
    },
]

export const OrganizationFeed = ({navigation}) => {
    return (
      <View style={styles.screen}>
        <ScrollView style={styles.container}>
          {tasks.map((task, index) => {
              return (
                  <TaskCard key={index} name={task.name} type={task.type} location={task.location}/>
              )
          })}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateTaskForm')}>
            <Icon name="plus" style={styles.icon}/>
        </TouchableOpacity>
      </View>
    );
}
  

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#F7FFF7",
        // alignItems: 'center',
        padding: 10,
    },
    button: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        backgroundColor: "#F7FFF7",
        color: "#1A535C",
        borderRadius: 50,
    },
    icon: {
        fontSize: 30,
        color: "#1A535C",
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 60,
    }
});