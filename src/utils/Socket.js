import React, { Component } from 'react';
import { Button, View, TouchableOpacity } from 'react-native';
import SocketIOClient from 'socket.io-client';

class Socket extends Component {

    constructor(props) {
        super(props);
        this.socket = SocketIOClient('http://192.168.43.228'); // replace 'environment.serverUrl' with your server url
        //this.socket.emit('pingEvent', 'Hi server'); // emits 'hi server' to your server

        // Listens to channel2 and display the data recieved
        this.socket.on('pongEvent', (data) => {
             this.props.saveWord(data.oponentWord)
        });
    }
    

    clicked = () => {
        const dataObj = {
            word: this.props.word
        };
        this.props.saveWord(this.props.word);
        this.socket.emit('pingEvent', dataObj);
    }

    render() {
        return (
            <View>
                <Button title="CLICK" onPress={() => this.clicked()}></Button>
            </View>
        );
    }
}

export default Socket;