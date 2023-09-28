import React from 'react';
import { Button } from 'react-native';
import { GoogleViewController } from './GoogleButtonViewController';



export const GoogleButtonView =()  => {
  const { onGoogleLogin } = GoogleViewController()
  return (
    //TODO please update Google-Login button with icon
    <Button
      title="Google Sign-In"
      onPress={() => {
        onGoogleLogin().then((userData)=>{
          try {
            console.log('Signed in with Google!', JSON.stringify(userData));
          } catch (err) {
            console.log('Error occurred!');
          }
        })
      }}
    />
  );
}





