import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Victory from "./victory"

const VictoryBar = Victory.VictoryBar;
const VictoryChart = Victory.VictoryChart;
const VictoryTheme = Victory.VictoryTheme;
const VictoryLine = Victory.VictoryLine;
const VictoryArea = Victory.VictoryArea;
const VictoryAxis = Victory.VictoryAxis;

// const data = [
//    { x: "19/10/22", y: 1, y0: 0 },
//    { x: "20/10/22", y: 1, y0: 0 },
//    { x: "21/10/22", y: 3, y0: 0 },
//    { x: "22/10/22", y: 3, y0: 0 },
//    { x: "23/10/22", y: 4, y0: 0 }
// ]
const data = [
   { x: "Jan", y: 1, y0: 0 },
   { x: "Feb", y: 1, y0: 0 },
   { x: "Mar", y: 3, y0: 0 },
   { x: "Apr", y: 3, y0: 0 },
   { x: "May", y: 4, y0: 0 },
   { x: "Jun", y: 4, y0: 0 },
   { x: "Jul", y: 4, y0: 0 },
   { x: "Oct", y: 4, y0: 0 },
   { x: "Nov", y: 8, y0: 0 },
   { x: "Dec", y: 12, y0: 0 },
]

const dates = []

export default function Chart() {
   VictoryTheme.material.axis.style.grid.strokeWidth = 0;
   return (
      <View style={styles.container}>
         <Text style={styles.heading}>Your Progress</Text>
         <VictoryChart
            theme={VictoryTheme.material}
            padding={30}
            height={250}
            chartConfig={{ decimalPlaces: 0 }}
         >
            <VictoryArea
               style={{
                  data: { stroke: "#ff6b6b", strokeWidth: 5, fill: "#ff6b6b" },
                  parent: { backgroundColor: "#F7FFF7" },
                  grid: { stroke: "none" }
               }}
               chartConfig={{ decimalPlaces: 0 }}
               data={data}
               categories={{
                  x: dates
               }}
               animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
               }}
            // interpolation="natural"
            />
         </VictoryChart>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#F7FFF7",
      width: "100%",
   },
   heading: {
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "Poppins",
      color: "#FF6B6B",
      textAlign: "center",
      marginTop: 20,
   },

});
