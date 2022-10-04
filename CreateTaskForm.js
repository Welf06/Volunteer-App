import { StyleSheet, Text, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const CreateTaskForm = () => {
  return (
    <View style={styles.container}>
      <Text>Create Task</Text>
      <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F7FFF7",
      alignItems: 'center',
      justifyContent: 'center',
    },
});
