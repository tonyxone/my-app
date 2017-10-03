
/*import React from 'react';
 import ReactDOM from 'react-dom';
 import './index.css';
 import App from './App';
 import registerServiceWorker from './registerServiceWorker';

 ReactDOM.render(<App />, document.getElementById('root'));
 registerServiceWorker();*/

 function createStore(reducer){

     let state = null
     const listeners = []
     const subscribe = (listener) => listeners.push(listener)
     const getState = () => state
     const dispatch = (action) => {
         state = reducer(state,action)
         listeners.forEach((listener)=>listener())}
     dispatch({})
     return {getState,dispatch,subscribe}

 }

 
 function themeReducer (state,action) {

     if(!state) return{
         themeName: 'Red Theme',
         themeColor:'red'
     }
     switch(action.type){
         case 'UPATE_THEME_NAME':
                return {...state,themeName:action.themeName}
             break;
         case 'UPATE_THEME_COLOR':
                return {...state,themeColor:action.themeColor}
             break
         default:
             return state
     }

 }

function TitleReducer(state,action){
     if(!state){
         return{
             title:{
                 text: '123123',
                 color: 'red',
             },
             content:{
                 text: '32131231',
                 color: 'blue'
             }
         }
     }
     switch (action.type){
         case 'UPDATE_TITLE_TEXT':
             return{
                 ...state,
                 title:{
                     ...state.title,
                     text: action.text
                 }
             }
             break
         case 'UPDATE_TITLE_COLOR':
             return{
                 ...state,
                 title:{
                     ...state.title,
                     color:action.color
                 }
             }
             break
         default:
             return state
     }
}

 function renderApp (newAppState,oldAppState = {}) {
     if(newAppState === oldAppState) return
     renderTitle(newAppState.title,oldAppState.title)
     renderContent(newAppState.content,oldAppState.content)
 }

 function renderTitle (newTitle,oldTitle = {}) {
    if(newTitle === oldTitle) return
     const titleDOM = document.getElementById('title')
     titleDOM.innerHTML = newTitle.text
     titleDOM.style.color = newTitle.color
 }

 function renderContent (newContent,oldContent = {}) {
     if(newContent === oldContent) return
     const contentDOM = document.getElementById('content')
     contentDOM.innerHTML = newContent.text
     contentDOM.style.color = newContent.color
 }

const store = createStore(TitleReducer)
let oldState = store.getState()
store.subscribe(() => {
    const newState = store.getState()
    renderApp(newState,oldState)
    oldState = newState
})

renderApp(store.getState());

store.dispatch({type:'UPDATE_TITLE_TEXT',text:'6768686876867'})
store.dispatch({type:'UPDATE_TITLE_COLOR',color:'pink'})




