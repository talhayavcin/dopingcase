import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DividerCircleIcon, XCircleIcon, MinusCircleIcon, CheckCircleIcon } from '../assets/icons/icons'

export const ResultScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Seviye Belirleme Sınav Sonucu</Text>
        <Image source={require('../assets/Dopi.png')} style={styles.image} />
        <Text style={styles.subHeaderText}>Tebrikler! Sınavı başarıyla tamamladınız.</Text>
        <Text style={styles.descriptionText}>Dopi Yapay Zeka seviyeni "Temel Seviye" olarak belirlemiştir. Seviyeni istediğin zaman ünite içerisinden değiştirebilirsin.</Text>
        <View style={styles.resultPart}>
          <View style={styles.resultItem}>
            <View style={styles.firstItem}>
              <DividerCircleIcon />
            </View>
            <Text style={styles.resultNumber}>23 Net</Text>
          </View>
          <View style={styles.resultItem}>
            <View style={styles.secondItem}>
              <CheckCircleIcon />
            </View>
            <Text style={styles.resultNumber}>24 Doğru</Text>
          </View>
          <View style={styles.resultItem}>
            <View style={styles.thirdItem}>
              <XCircleIcon />
            </View>
            <Text style={styles.resultNumber}>4 Yanlış</Text>
          </View>
          <View style={styles.resultItem}>
            <View style={styles.fourthItem}>
              <MinusCircleIcon />
            </View>
            <Text style={styles.resultNumber}>2 Boş</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Üniteye Başla</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#305B83',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#DCF5FF',
    marginVertical: 20
  },
  image: {
    width: 62.22,
    height: 64,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  subHeaderText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#DCF5FF'
  },
  descriptionText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    textAlign: 'center',
    color: '#DCF5FF'
  },
  resultPart: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    alignSelf: 'center'
  },
  resultItem: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  firstItem: {
    width: 56,
    height: 56,
    borderRadius: 99,
    backgroundColor: '#369AC6',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondItem: {
    width: 56,
    height: 56,
    borderRadius: 99,
    backgroundColor: '#499D8D',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thirdItem: {
    width: 56,
    height: 56,
    borderRadius: 99,
    backgroundColor: '#EA5E63',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fourthItem: {
    width: 56,
    height: 56,
    borderRadius: 99,
    backgroundColor: '#5281AB',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  resultNumber: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#DCF5FF',
    marginTop: 5
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#1A85B4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#DCF5FF'
  }
})

