import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'ru-RU',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('en-US').create({
      rouletteTitleRart1: 'Spin the wheel',
      rouletteTitleRart2: 'and win cool prizes',
      actionText: 'Twist',
      victorine: 'Answer the quiz questions and',
      quizRule: 'To collect the prize answer a few questions:',
      testNext: 'farther',
      quizFinalMsg: 'You answered correctly to {f} questions from 4',
      tryAgain: 'try again'
    }),
    new MLanguage('ru-RU').create({
      rouletteTitleRart1: 'Крути колесо',
      rouletteTitleRart2: 'и выигрывай крутые призы',
      actionText: 'Крутить',
      victorine: 'Отвечай на вопросы викторины и',
      quizRule: 'Чтобы забрать приз ответьте на несколько вопросов:',
      testNext: 'дальше',
      quizFinalMsg: 'Вы правильно ответили на {f} вопросов из 4',
      tryAgain: 'попробовать еще раз'
    })
  ]
})