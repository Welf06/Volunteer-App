import React from "react";
import { StyleSheet, View } from "react-native";
import Victory from "./victory"
import CalendarHeatmap from 'react-calendar-heatmap';

const VictoryBar = Victory.VictoryBar;
const VictoryChart = Victory.VictoryChart;
const VictoryTheme = Victory.VictoryTheme;
const VictoryLine = Victory.VictoryLine;

const data = [
   { x: 1, y: 2 },
   { x: 2, y: 3 },
   { x: 3, y: 5 },
   { x: 4, y: 4 },
   { x: 5, y: 7 }
]

export default function Chart() {
   return (
      <View style={styles.container}>
         {/* <VictoryChart
            theme={VictoryTheme.material}
         >
            <VictoryLine
               style={{
                  data: { stroke: "#ff6b6b", strokeWidth: 5,},
                  parent: { backgroundColor: "#F7FFF7" },
               }}
               data={data}
               animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
               }}
               interpolation="natural"
            />
         </VictoryChart> */}
         <CalendarHeatmap
  startDate={new Date('2016-01-01')}
  endDate={new Date('2016-04-01')}
  values={[
    { date: '2016-01-01', count: 12 },
    { date: '2016-01-22', count: 122 },
    { date: '2016-01-30', count: 38 },
    // ...and so on
  ]}
/>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#F7FFF7"
   }
});
