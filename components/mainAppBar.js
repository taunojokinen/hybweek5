import {Appbar} from 'react-native-paper';
import React from 'react';

export default function MainAppBar(props) {
    return (
        <Appbar.Header style = {{backgroundColor: props.backgroundColor}}>
            <Appbar.BackAction onPress={props.onBackPress} />
            <Appbar.Content title={props.title} />
            <Appbar.Action icon = {props.icon} onPress={props.getUserPosition} />
        </Appbar.Header>
    );
}