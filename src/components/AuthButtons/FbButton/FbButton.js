import React from 'react';
import { LoginButton, accessToken } from 'react-native-fbsdk';

const fbButton = props => (
    <LoginButton
        onLoginFinished={
            (error, result) => {
                if (error) return alert(result.error, 'ERR')
                if (result.isCancelled) return alert(result.error, 'EROARE')
                AccessToken.getCurrentAccessToken().then(
                    data => {
                        alert(data, 'DATA')
                    }
                )
            }
        }
        onLogoutFinished={() => alert("logout.")}>
    </LoginButton>
);

export default fbButton;
