import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export const TaskCard = (props) => {
    return (
      <TouchableOpacity style={styles.container} activeOpacity={0.7}>
        <Image source={require('./assets/images/education.png')} style={styles.image}/>
        <View style={styles.textContainer}>
        {/* Name */}
        <Text style={styles.name}>
            {props.name}
        </Text>
        {/* Type and Location */}
        <View>
            <Text style={styles.text}>
                    {`${props.type} `}
                    
                    {props.type === "Environmental" && <Icon name="tree" size={20} color="#F7FFF7"/>}
                    {props.type === "Community" && <Icon name="user" size={20} color="#F7FFF7"/>}
                    {props.type === "Animal" && <Icon name="paw" size={20} color="#F7FFF7"/>}
                    {props.type === "Education" && <Icon name="book" size={20} color="#F7FFF7"/>}
                    {props.type === "Health" && <Icon name="medkit" size={20} color="#F7FFF7"/>}
                </Text>
                <Text style={styles.text}>
                    {`${props.location} `}
                    <Icon name="map-marker" size={20} color="#F7FFF7"/>
                </Text>
        </View>
            
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        height: 300,
        borderRadius: 10,
        backgroundColor: "#FF6B6B",
        shadowColor: "black",
        shadowOpacity: 0.50,
        elevation: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    textContainer: {
        flex: 2,
        backgroundColor: "#F7FFF7",
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: "#FF6B6B",
    },
    image: {
        flex: 5,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    name: {
        fontSize: 20,
        color: "#F7FFF7",
    },
    text: {
        fontSize: 16,
        color: "#F7FFF7",
    },

});