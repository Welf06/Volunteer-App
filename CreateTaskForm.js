import { StyleSheet, Text, View,TextInput} from 'react-native';
import CheckBox from 'expo-checkbox';
import { DropdownComponent } from './DropdownComponent';
import { StatusBar } from 'expo-status-bar';

import { useState } from 'react';

const data = [
    {label: 'Environmental', value: 'Environmental'},
    {label: 'Community', value: 'Community'},
    {label: 'Animal', value: 'Animal'},
    {label: 'Education', value: 'Education'},
    {label: 'Health', value: 'Health'},
]


export const CreateTaskForm = () => {
  const [isRemote, setIsRemote] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Task</Text>
      <View style={styles.form}>
        <Text style={styles.formLabel} placeholder="test">Task Name</Text>
        <TextInput style={styles.input}/>
        <Text style={styles.formLabel}>What kind of task is this?</Text>
        <DropdownComponent data={data} placeholder="Task Type" withSearch={false}/>
        <Text style={styles.formLabel}>Where will this take place?</Text>
        <View >
            <Text style={styles.formLabel}>Remote</Text>
            <CheckBox value={isRemote} onValueChange={setIsRemote}/>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F7FFF7",
      padding: 20,
    },
    title:{
        fontSize: 24,
        fontFamily: 'Poppins',
        color: "#1A535C",
        textAlign: 'center',
    },
    form: {
        flex: 1,
        backgroundColor: "#F7FFF7",
        marginTop: 20,
    },
    formLabel: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: "#1A535C",
        paddingTop: 20,
    },
    input: {
        height: 30,
        marginVertical: 10,
        borderWidth: 2,
        width: 350,
        borderBottomColor: "#1A535C",
        borderTopColor: "#F7FFF7",
        borderLeftColor: "#F7FFF7",
        borderRightColor: "#F7FFF7",
        fontFamily: 'Poppins',
    },
});
