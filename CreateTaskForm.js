import { StyleSheet, Text, View,TextInput, ScrollView, TouchableOpacity} from 'react-native';
import CheckBox from 'expo-checkbox';
import { DropdownComponent } from './DropdownComponent';
import { StatusBar } from 'expo-status-bar';
import {TextInputMask} from 'react-native-masked-text';


import { useState,useEffect } from 'react';


const data = [
    {label: 'Environmental', value: 'Environmental'},
    {label: 'Community', value: 'Community'},
    {label: 'Animal', value: 'Animal'},
    {label: 'Education', value: 'Education'},
    {label: 'Health', value: 'Health'},
]






export const CreateTaskForm = () => {
    const [isRemote, setIsRemote] = useState(false);
    const [date, setDate] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((json) => {
                const array = json.map((country) => {
                    return {label: country.name.common, value: country.name.common};
                }
                );
                setCountries(array);
            })
            .catch((error) => console.error(error))
    }, []);
    
  return (
    <View style={styles.container}>
    <ScrollView  style={styles.scroll}>
      <Text style={styles.title}>Create Task</Text>
      <View style={styles.form}>
        <Text style={styles.formLabel} placeholder="test">Task Name</Text>
        <TextInput style={styles.input}/>
        <Text style={styles.formLabel}>What kind of task is this?</Text>
        <DropdownComponent data={data} placeholder="Task Type" withSearch={false} disabled={false}/>
        <Text style={styles.formLabel}>Where will this take place?</Text>
        <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Remote</Text>
            <CheckBox value={isRemote} onValueChange={setIsRemote} style={styles.checkbox} />
        </View>
        <Text style={styles.formLabel}>Country</Text>
        <DropdownComponent data={countries} placeholder="Country" withSearch={true} disabled={isRemote} onValueChange={(value) => setSelectedCountry(value)}/>
        <Text style={styles.formLabel}>State</Text>
        <DropdownComponent data={countries} placeholder="State" withSearch={true} disabled={isRemote} />
        <Text style={styles.formLabel}>City</Text>
        <DropdownComponent data={countries} placeholder="City" withSearch={true} disabled={isRemote}/>

        <Text style={styles.formLabel} >How many volunteers will you require?</Text>
        <TextInput style={styles.input} keyboardType="numeric"/>

        <Text style={styles.formLabel} >When is it happening? (DD/MM/YYYY)</Text>
        <TextInputMask
            type={'datetime'}
            options={{
                format: 'DD/MM/YYYY'
            }}
            style={styles.input}
            value={date}
            onChangeText={text => {
                setDate(text);
            }}
        />
        <Text style={styles.formLabel} >Explain the task in a few words</Text>
        <TextInput style={styles.multilineInput} multiline={true}/>

        <Text style={styles.formLabel} >Attach a google form link. They will be directed to this link when they volunteer.</Text>
        <TextInput style={styles.input} keyboardType="url"/>

      </View>
      <StatusBar style="auto" />
    </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F7FFF7",
        flex: 1,
        justifyContent: 'center',
    },
    scroll: {
        flex: 1,
        margin: 20,
        marginRight: 0,
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
        color: "#1A535C",
    },
    multilineInput: {
        minHeight: 100,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        width: 350,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 300,
        paddingTop: 20,
    },
    checkboxLabel: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: "#1A535C",

    },
    checkbox: {
        color: "#1A535C",
        width: 25,
        height: 25,

    },
    datePicker: {
        width: 350,
        height: 50,
        marginVertical: 10,
        borderWidth: 2,

    },

});
