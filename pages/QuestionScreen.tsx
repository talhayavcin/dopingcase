import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, ActionSheetIOS } from 'react-native'
import React, {useState} from 'react'
import { BackIcon, DotIcon, BrushIcon, ZoomInIcon, ZoomOutIcon, ChevronLeftIcon } from '../assets/icons/icons'
import Timer from '../components/Timer'
import questionsData from '../questionData.json'


export const QuestionScreen = ({navigation}: {navigation: any}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


  const handleOptionPress = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: option
    });
  };

  // Sonraki soruya geçiş
  const handleNext = () => {
    if (currentQuestionIndex < questionsData.data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Önceki soruya dönüş
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questionsData.data[currentQuestionIndex];

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Vazgeç', 'Cevap Anahtarı', 'Testi Bitir'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      },
      (buttonIndex) => {
        if (buttonIndex === 2) {
          navigation.navigate('ResultScreen');
        } else if(buttonIndex === 1) {
          navigation.navigate('AnswerKeyScreen', {selectedOptions});
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.buttonContainer}>
            <BackIcon />
          </TouchableOpacity>
          <Timer initialMinutes={100}/>
          <TouchableOpacity style={styles.buttonContainer}>
            <DotIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.headerBottom}>
          <Text style={styles.headerText}>Temel Kavramlar Seviye Belirleme Sınavı</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.topButtons}>
          <View style={styles.questionNumberButton}>
            <Text style={styles.questionNumberText}>Soru: {currentQuestionIndex + 1}</Text>
          </View>
          <View style={styles.appearanceButtons}>
            <TouchableOpacity style={styles.buttonContainer}>
              <BrushIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <ZoomInIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <ZoomOutIcon />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.questionContent}>
            <View style={styles.questionPart}>
              <Text style={styles.questionIntroText}>{currentQuestion.questionIntro}</Text>
              <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
            </View>
              {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOptions[currentQuestionIndex] === option && styles.optionSelected
                ]}                
                onPress={() => handleOptionPress(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={handlePrevious} style={styles.footerButtonLeft}>
            <ChevronLeftIcon />
            <Text style={styles.footerButtonText}>Önceki Soru</Text>
          </TouchableOpacity>
          {currentQuestionIndex === 14 ? (
            <TouchableOpacity onPress={showActionSheet} style={styles.footerButtonRight}>
            <Text style={styles.footerButtonText}>Testi Bitir</Text>
          </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleNext} style={styles.footerButtonLeft}>
            <Text style={styles.footerButtonText}>Sonraki Soru</Text>
          </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#305B83",
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 120,
    backgroundColor: "#305B83",
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    color: "#DCF5FF",
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold'
  },
  headerBottom: {
    width: '100%',
    justifyContent: 'flex-start'
  }, 
  buttonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#3D678D",
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#1A3855"
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    paddingVertical: 20,
  },
  appearanceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4
  },
  questionContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionNumberButton: {
    width: 59,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: "#284F74",
  },
  questionPart: {
    width: '95%',
    marginBottom: 20,
  },
  questionNumberText: {
    color: "#97BDE0",
    fontSize: 12,
  },
  questionIntroText: {
    color: "#DCF5FF",
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 10,
    fontFamily: 'Nunito-Regular'
  },
  questionText: {
    color: "#DCF5FF",
    fontSize: 16,
    lineHeight: 28,
    fontFamily: 'Nunito-Bold'
  },
  optionButton: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginVertical: 5,
    backgroundColor: '#2A537C',
    borderRadius: 10,
  },
  optionSelected: {
    backgroundColor: '#3C79AF',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito-Regular' 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '95%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: "#1A3855",
  },
  footerButtonLeft: {
    width: '40%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#1A85B4",
    flexDirection: 'row',
  },
  footerButtonRight: {
    width: '40%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#16A085",
  },
  footerButtonText: {
    color: "#F8FAFC",
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  }
});
