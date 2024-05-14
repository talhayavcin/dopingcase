import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, ActionSheetIOS } from 'react-native'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { BackIcon, DotIcon, BrushIcon, ZoomInIcon, ZoomOutIcon, ChevronLeftIcon } from '../assets/icons/icons'
import Timer from '../components/Timer'
import questionsData from '../questionData.json'


export const QuestionScreen = ({ route, navigation }: { route: any, navigation: any }) => {

  const questionIndex = route?.params?.questionIndex ?? 0;
  const initialSelectedOptions = route?.params?.selectedOptions ?? {};
  
  const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(questionIndex);

  useEffect(() => {
    setCurrentQuestionIndex(questionIndex);
  }, [questionIndex]);

  const handleOptionPress = useCallback((option: string) => {
    setSelectedOptions((prevSelectedOptions: any) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: option,
    }));
  }, [currentQuestionIndex]);

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

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let empty = 0;

    questionsData.data.forEach((question, index) => {
      const selectedOption = selectedOptions[index];
      if (selectedOption) {
        if (selectedOption.startsWith(question.answer)) {
          correct++;
        } else {
          incorrect++;
        }
      } else {
        empty++;
      }
    });

    const net = correct - (incorrect * 0.25);

    return { correct, incorrect, empty, net };
  };

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Vazgeç', 'Cevap Anahtarı', 'Testi Bitir'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      },
      (buttonIndex) => {
        if (buttonIndex === 2) {
          const results = calculateResults();
          navigation.navigate('ResultScreen', { results });
        } else if(buttonIndex === 1) {
          navigation.navigate('AnswerKeyScreen', { selectedOptions });
        }
      }
    );
  };

  const currentQuestion = questionsData.data[currentQuestionIndex];
  const totalQuestions = questionsData.data.length;
  const answeredQuestions = Object.keys(selectedOptions).length;
  const progress = useMemo(() => {
    return (answeredQuestions / totalQuestions) * 100;
  }, [answeredQuestions, totalQuestions]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
            <BackIcon />
          </TouchableOpacity>
          <Timer initialMinutes={100}/>
          <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
            <DotIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.headerBottom}>
          <View style={styles.headerBottomTop}>
            <Text style={styles.headerText}>Temel Kavramlar Seviye Belirleme Sınavı</Text>
            <Text style={styles.progressText}>
              {answeredQuestions}/{totalQuestions}
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.topButtons}>
          <View style={styles.questionNumberButton}>
            <Text style={styles.questionNumberText}>Soru: {currentQuestionIndex + 1}</Text>
          </View>
          <View style={styles.appearanceButtons}>
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
              <BrushIcon />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
              <ZoomInIcon />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
              <ZoomOutIcon />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={styles.questionContent}>
            <View style={styles.questionPart}>
              <Text style={styles.questionIntroText}>{currentQuestion.questionIntro}</Text>
              <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
            </View>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={[
                  styles.optionButton,
                  selectedOptions[currentQuestionIndex] === option && styles.optionSelected,
                ]}
                onPress={() => handleOptionPress(option)}
              >
                <View style={styles.optionContainer}>
                  <View style={[
                    styles.radioButton,
                    selectedOptions[currentQuestionIndex] === option && styles.radioButtonSelected,
                  ]}>
                    {selectedOptions[currentQuestionIndex] === option && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.8} onPress={handlePrevious} style={styles.footerButtonLeft}>
            <ChevronLeftIcon />
            <Text style={styles.footerButtonText}>Önceki Soru</Text>
          </TouchableOpacity>
          {currentQuestionIndex === 14 ? (
            <TouchableOpacity activeOpacity={0.8} onPress={showActionSheet} style={styles.footerButtonRight}>
            <Text style={styles.footerButtonText}>Testi Bitir</Text>
          </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={handleNext} style={styles.footerButtonLeft}>
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
    fontSize: 13,
    fontFamily: 'Nunito-SemiBold'
  },
  headerBottom: {
    width: '100%',
    justifyContent: 'flex-start',
  }, 
  headerBottomTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
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
  scrollView: {
    width: '95%',
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
    width: '100%',
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    color: '#BCDCFA',
    fontSize: 16,
    fontFamily: 'Nunito-Regular', 
    marginLeft: 5,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BCDCFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  radioButtonSelected: {
    borderColor: '#BCDCFA',
  },
  radioButtonInner: {
    width: 13,
    height: 13,
    borderRadius: 6,
    backgroundColor: '#BCDCFA',
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
    opacity: 0.9,
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
  },
  progressContainer: {
    width: '100%',
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 9,
    marginTop: 10,
    marginBottom: 5,
  },
  progressBar: {
    height: 5,
    backgroundColor: '#F2C44D',
    borderRadius: 9,
  },
  progressText: {
    color: '#FDD368',
    fontSize: 13,
    fontFamily: 'Nunito-Bold',
  },
});
