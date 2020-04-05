import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, ImageBackground } from 'react-native';

import ModalTemplate from './ModalTemplate';
import CustomText from '../UI/Text/Text'

import Bg from '../../assets/Modals/toturial.png';
import NextButton from '../../assets/Buttons/textButton.png'

class ToturialModal extends Component {
    state = {
        components: [
            <CustomText style={{ textAlign: 'center' }}>
                Fazanul, un joc de cuvinte.{'\n'}
                            Reguli:{'\n\n'}
                            1. Trebuie sa raspunzi cu un cuvant care incepe cu ultimele 2 litere ale cuvantului existent.{'\n\n'}
                            2. Cine ramane fara cvuinte sau e "blocat", pierde.
            </CustomText>,
            <CustomText style={{ textAlign: 'center' }}>
                Poti sa iti urmaresti progresul obtinut in meciurile de {'\n'}<CustomText extra> multiplayer</CustomText>.
            </CustomText>,
            <CustomText style={{ textAlign: 'center' }}>
                <CustomText extra>Invita</CustomText>-ti{'\n'} prietenii la un duel al "cuvintelor" sau accepta provocarile lor.
            </CustomText>,
            <CustomText style={{ textAlign: 'center' }}>
                Urmareste {'\n'} <CustomText extra>clasarea</CustomText> {'\n'} ta fata de ceilalti maestrii ai cuvintelor.
            </CustomText>,
            <CustomText extra>
                Bafta!
            </CustomText>
        ],
        componentIndex: 0
    }

    animateNextButton = new Animated.Value(1)

    onNextPressHandler = () => {
        Animated.spring(this.animateNextButton, {
            toValue: 1.2,
            duration: 200
        }).start(() => {
            if (!this.state.components[this.state.componentIndex + 1]) {
                this.props.onClose()
            }

            this.setState(prevState => ({
                componentIndex: prevState.componentIndex + 1
            }), () => Animated.spring(this.animateNextButton, {
                toValue: 1,
                duration: 200
            }).start())
        })
    }

    render() {
        let animateNextButtonStyle = {
            transform: [{ scale: this.animateNextButton }]
        }

        return (
            <ModalTemplate background={Bg} isVisible={this.props.isVisible}>
                <View style={[styles.content]}>
                    <View style={styles.exitButton}>
                        <TouchableOpacity style={styles.exitButtonPressArea} onPress={this.props.onClose} />
                    </View>
                    <View style={[styles.center, styles.textContainer]}>
                        {this.state.components[this.state.componentIndex]}
                    </View>
                    <Animated.View style={[styles.next, animateNextButtonStyle]}>
                        <TouchableOpacity style={[styles.max, styles.center]} onPress={this.onNextPressHandler}>
                            <ImageBackground resizeMode='stretch' source={NextButton} style={[styles.max, styles.center]}>
                                <CustomText normal style={styles.ok}>OK</CustomText>
                            </ImageBackground>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ModalTemplate>
        );
    }
}

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    exitButtonPressArea: {
        width: '20%',
        height: '100%'
    },
    exitButton: {
        width: '100%',
        height: '22%',
        alignItems: 'flex-end'
    },
    content: {
        width: '90%',
        height: '70%',
        alignItems: 'center'
    },
    next: {
        width: '23%',
        height: '13%'
    },
    textContainer: {
        width: '65%',
        height: '65%',
        marginTop: '1%'
    },
    ok: {
        position: 'relative',
        bottom: '8%'
    }
});

export default ToturialModal;