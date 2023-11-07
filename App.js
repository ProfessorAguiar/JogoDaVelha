import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Share, Alert } from 'react-native';
import React, { useState } from 'react';
import TicTacToe from './Components/TicTacToe';
export default function App() {
  return(
    <TicTacToe/>
  );
}