import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const Login = ({ setIsLogged }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput style={styles.input} placeholder="Email" />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" />
            </View>
            <TouchableOpacity style={styles.button}
                onPress={() => setIsLogged(true)}
            >
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7FFF7",
        alignItems: 'center',
        padding: 20,
    },
    button: {
        backgroundColor: "#1A535C",
        width: 300,
        height: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    text: {
        color: "#F7FFF7",
        fontSize: 20,
        fontFamily: 'Poppins',
    }
}); 