import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components';

const ProceedButton = styled(LinearGradient)`
  height: 35px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  padding-left: 34px;
  padding-right: 30px;
  flex-direction: row;
`;

const ProceedButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export default function renderGradientButton({
  title,
  onPress,
  showIcon = true,
  icon,
}) {
  icon = icon || (
    <AntDesign
      name="arrowright"
      size={14}
      color="#FFF"
      style={{ fontWeight: 'bold' }}
    />
  );
  return (
    <TouchableOpacity onPress={onPress}>
      <ProceedButton
        colors={['rgba(10,11,9,0.7)', '#0A0B09']}
        start={[0, 1]}
        end={[1, 0]}
      >
        <ProceedButtonText>{`${title}  `}</ProceedButtonText>
        {showIcon && icon}
      </ProceedButton>
    </TouchableOpacity>
  );
}