import { useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


export const DropdownComponent = ({data, placeholder,withSearch,disabled,onSelect}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    return (
        <View>
            <Dropdown
                data={data}
                style={!disabled ? styles.dropdown : styles.disabledDropdown}
                placeholderStyle={!disabled ? styles.dropdownPlaceholder : styles.disabledPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.dropdownItemText}
                itemStyle={styles.dropdownItem}
                inputSearchStyle={styles.dropdownInputSearch}
                activeColor="#4ECDC459"
                placeholder = {placeholder}
                labelField="label"
                valueField="value"
                onChange={(value) => {
                    setValue(value);
                    onSelect(value);
                }}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                search={withSearch}
                disable={disabled}
                dropdownPosition='bottom'
                // onChangeText={onChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        width: 350,
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: "#1A535C",
        color: "#1A535C",
        borderWidth: 1,
        fontFamily: 'Poppins',
    },
    dropdownSelectedText: {
        color: "#1A535C",
        fontFamily: 'Poppins',
    },
    dropdownPlaceholder: {
        color: "#1A535C",
        fontFamily: 'Poppins',
    },
    dropdownContainer: {
        width: 350,
        borderRadius: 5,
        fontFamily: 'Poppins',
        backgroundColor: "#F7FFF7",
    },
    dropdownItemText: {
        color: "#1A535C",
        fontFamily: 'Poppins',
    },
    dropdownItem: {
        backgroundColor: "#F7FFF7",
        fontFamily: 'Poppins',
    },
    dropdownInputSearch: {
        backgroundColor: "#F7FFF7",
        fontFamily: 'Poppins',
    },
    disabledDropdown: {
        width: 350,
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: "#c5c9d1",
        color: "#9da1a8",
        borderWidth: 1,
        fontFamily: 'Poppins',
        backgroundColor: "#c5c9d1",
    },
    disabledPlaceholder: {
        color: "#9da1a8",
        fontFamily: 'Poppins',
    },
});