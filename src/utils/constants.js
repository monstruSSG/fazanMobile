import { Dimensions } from 'react-native';

export default {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    secondaryColor: '#2EB67D',
    thirdColor: '#4A154B',
    borderColor: '#000000',
    backgroundColor: "white",
    buttonColor: "#4A154B",
    textColor: "azure",
    secondaryColor: '#33691E',
    thirdColor: '#01579B',
    db: {
        name: 'words.db'
    },
    backendUrl: 'http://192.168.2.103/api/v1',
    socketsBackendUrl: 'http://192.168.2.103',
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    firstRow: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    secondRow: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    thirdRow: ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

};