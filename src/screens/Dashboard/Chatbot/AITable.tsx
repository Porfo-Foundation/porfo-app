/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
import CoinLogo from '../../../components/coindetails/CoinLogo';

const AITable = ({tableContent}: any) => {
  let tableHeading = ['Name'];
  let tableData = [];
  if (tableContent) {
    let arr = tableContent;
    const keys = Object.keys(arr[0]);
    tableHeading = keys;
    for (let i = 0; i < arr.length; i++) {
      const data = arr[i];
      const tempArr = [];
      for (let j = 0; j < keys.length; j++) {
        tempArr.push(data[keys[j]]);
      }
      tableData.push(tempArr);
    }
  }

  return (
    <View style={styles.container} className="w-[290px] w-max-[70vw]">
      <Table borderStyle={{borderWidth: 1, borderColor: 'rgba(0,0,0,0.4)'}}>
        <Row
          data={tableHeading}
          style={styles.head}
          textStyle={styles.headText}
        />
        {tableData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={
                  cellData.toString().includes('coins/images') ? (
                    <View className="w-[40px] h-[40px] bg-[#171A3B] self-center mt-1 mb-1 items-center justify-center">
                      <CoinLogo logoURI={cellData} />
                    </View>
                  ) : (
                    cellData
                  )
                }
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
    </View>
  );
};

export default AITable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  head: {
    height: 44,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: 'white',
  },
  headText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  row: {flexDirection: 'row'},
  text: {
    margin: 6,
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
});
