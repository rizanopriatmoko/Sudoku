import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setBoard, solveBoard } from '../store/actionCreators';
import { fetchBoard } from '../store/actionCreators';
import CountDown from 'react-native-countdown-component';

export default function BoardScreen({ route, navigation }) {
    const dispatch = useDispatch()
    const dataBoard = useSelector((state) => state.board)
    const dataBoardProblem = useSelector((state) => state.boardProblem)
    const [status, setStatus] = useState('unsolved')
    const { difficulty, name } = route.params

    useEffect(() => {
        dispatch(fetchBoard(difficulty))
    }, [])

    useEffect(() => {
        const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
        const encodeParams = (params) =>
            Object.keys(params)
                .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
                .join('&');
        const data = { board: dataBoard }
        fetch('https://sugoku.herokuapp.com/validate', {
            method: 'POST',
            body: encodeParams(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                setStatus(response.status)
            })
            .catch(console.warn)
    }, [dataBoard])
    // console.log(dataBoard);

    function updateBoard(rowIdx, colIdx, newVal) {
        let newBoard = JSON.parse(JSON.stringify(dataBoard))
        newBoard[rowIdx][colIdx] = +newVal
        return dispatch(setBoard(newBoard))
    }
    function InputNum(props) {
        if (dataBoardProblem[props.rowIndex][props.colIndex] === 0) {
            return (
                <View style={{
                    height: 30,
                    width: 30,
                    borderColor: 'gray',
                    borderWidth: 1
                }}>
                    <TextInput
                        onChangeText={(text) => updateBoard(props.rowIndex, props.colIndex, text)}
                        defaultValue={
                            props.nums === 0 ? '' : String(props.nums)
                        }
                        keyboardType="number-pad"
                        editable={true}
                        maxLength={1}
                    ></TextInput>
                </View>
            )
        } else {
            return (
                <View style={{
                    height: 30,
                    width: 30,
                    borderColor: 'gray',
                    borderWidth: 1
                }}>
                    <TextInput
                        value={String(props.nums)}
                        editable={false}
                    ></TextInput>
                </View>
            )
        }
    }
    const showAlert = () =>
        Alert.alert(
            "Validation Error",
            "Complete the sudoku first!",
            [
                { text: "OK" }
            ],
        )

    const Solve = () => {
        const data = { board: [...dataBoardProblem] }
        dispatch(solveBoard(data))
    }
    if (dataBoard.length > 0 && dataBoardProblem.length > 0) {
        return (
            <View style={styles.container}>
                {
                    dataBoard.map((x, index) => {
                        return (
                            <View key={index} style={{ flexDirection: 'row' }}>{
                                x.map((y, idx) => {
                                    return (
                                        <View key={idx} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <InputNum nums={y} rowIndex={index} colIndex={idx} />
                                        </View>
                                    )
                                }
                                )}</View>
                        )
                    })
                }
                <View style={{ flexDirection: 'row', marginVertical: 20, padding: 10, marginHorizontal: 20 }}>
                    <View style={{ marginLeft:20, marginRight:20 }}>
                        <Button
                            style={styles.buttons}
                            onPress={Solve}
                            title="Solve"
                            color="#841584"
                        />
                    </View>
                    <View style={{ marginLeft: 20, marginRight: 20 }}>
                        <Button
                            style={styles.buttons}
                            onPress={
                                status !== 'solved' ? showAlert : () => {
                                    navigation.navigate('Finish', { name: name })
                                }
                            }
                            title="Validate"
                            color="#841584"
                        />
                    </View>

                </View>
                <CountDown
                    size={30}
                    until={1000}
                    onFinish={() => {
                        alert('Time is up')
                        navigation.navigate('Home')
                    }}
                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625' }}
                    digitTxtStyle={{ color: '#1CC625' }}
                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                    separatorStyle={{ color: '#1CC625' }}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                />
            </View>
        )
    } else {
        return (
            <Text>Loading...</Text>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    }
    // box: {
    //   borderColor: '#000000',
    //   borderWidth: 2,
    //   borderRadius: 2
    // },
});