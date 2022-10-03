import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {TaskCard} from './TaskCard';

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
]

export const OrganizationFeed = () => {
    return (
      <ScrollView style={styles.container}>
        {tasks.map((task, index) => {
            return (
                <TaskCard key={index} name={task.name} type={task.type} location={task.location}/>
            )
        })}
      </ScrollView>
    );
}
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7FFF7",
        // alignItems: 'center',
        padding: 10,
    },
});