import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TouchableOpacity } from 'react-native';
import { FeedCard } from './FeedCard';

import Icon from 'react-native-vector-icons/FontAwesome';

const tasks = [
  {
    name: "Planting Volunteer",
    organisation: "Greenpeace",
    type: "Environmental",
    location: "Onsite - Delhi",
    picture: "./assets/images/environment.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Math Teacher Volunteer",
    organisation: "Greenpeace",
    type: "Education",
    location: "Remote",
    picture: "./assets/images/education.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Road Cleaning Volunteer",
    organisation: "Greenpeace",
    type: "Community",
    location: "Onsite - Delhi",
    picture: "./assets/images/community.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Planting Volunteer",
    organisation: "Greenpeace",
    type: "Environmental",
    location: "Onsite - Delhi",
    picture: "./assets/images/environmental.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Math Teacher Volunteer",
    organisation: "Greenpeace",
    type: "Education",
    location: "Remote",
    picture: "./assets/images/education.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Animal Feeding Volunteer",
    organisation: "Paw Patrol",
    type: "Animal",
    location: "Onsite - Delhi",
    picture: "./assets/images/animal.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  }
]

export const VolunteerFeed = () => {
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        {tasks.map((task, index) => {
          return (
            <FeedCard key={index} name={task.name} organisation ={task.organisation} type={task.type} location={task.location} picture={task.picture} description={task.description}/>
          )
        })}
      </ScrollView>
    </View>
  )
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