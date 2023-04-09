import listActions from '../stores/actionType';
import endent from 'endent';
import { firebase } from '../scripts/firebase.js';
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";

const handleAnonymousLogin = async () => {
  try {
    const auth = getAuth(firebase);
    const userCredential = await signInAnonymously(auth)
    const userId = userCredential.user.uid;
    return userId
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  }
}

// UX
export const switchDarkMode = (darkMode) => {
  return async (dispatch, getState) => {
    dispatch({type:listActions.switchDarkMode, payload:{darkMode}})
  }
}

export const changeLanguage = (sourceTarget, language) => {
  return async (dispatch, getState) => {
    dispatch({type:listActions.changeLanguage, payload:{sourceTarget, language}})
  }
}

// USERS
export const createProfile = () => {
  return async (dispatch, getState) => {
    console.log('triggered')
    const db = getDatabase();
    // const userId = await handleAnonymousLogin()
    // set(ref(db, 'users/' + userId), {
    //   name: userId,
    // });
    const starCountRef = ref(db, 'users');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      // updateStarCount(postElement, data);
    });
  }
}

export const changeAPIkey = (APIkey) => {
  return async (dispatch, getState) => {
    try {
      const params = {
        model: "text-davinci-003",
        temperature: 0.7,
        max_tokens: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        prompt: ''
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(APIkey)
        },
        body: JSON.stringify(params)
      };
      const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
      const data = await response.json();
      // console.log(data)
      if (data.error?.code){
        throw new Error(data.error.message)
      }

      localStorage.setItem('APIkey', APIkey)
      dispatch({type:listActions.changeAPIkey, payload:{APIkey}})
    } catch (error) {
      alert(error.message)
    }


    // dispatch({type:listActions.changeAPIkey, payload:{APIkey}})
  }
}

// TRANSLATION
export const runTranslation = (inputLanguage, outputLanguage, inputCode, key) => {
  return async (dispatch, getState) => {
    try {
      const params = {
        model: "text-davinci-003",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        prompt: createPrompt(inputLanguage, outputLanguage, inputCode)
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(key)
        },
        body: JSON.stringify(params)
      };
      const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
      const data = await response.json();
      return {data: data.choices[0].text, error: null};
    } catch (error) {
      return {data: null, error: error};
    }
  }
}


const createPrompt = (inputLanguage, outputLanguage, inputCode) => {
  if (inputLanguage === 'Natural Language') {
    return endent`
    You are an expert programmer in all programming languages. Translate the natural language to "${outputLanguage}" code. Do not include \`\`\`.

    Example translating from natural language to JavaScript:

    Natural language:
    Print the numbers 0 to 9.

    JavaScript code:
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }

    Natural language:
    ${inputCode}

    ${outputLanguage} code (no \`\`\`):
    `;
  } else if (outputLanguage === 'Natural Language') {
    return endent`
      You are an expert programmer in all programming languages. Translate the "${inputLanguage}" code to natural language in plain English that the average adult could understand. Respond as bullet points starting with -.
  
      Example translating from JavaScript to natural language:
  
      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
  
      Natural language:
      Print the numbers 0 to 9.
      
      ${inputLanguage} code:
      ${inputCode}

      Natural language:
    `;
  } else {
    return endent`
      You are an expert programmer in all programming languages. Translate the "${inputLanguage}" code to "${outputLanguage}" code. Do not include \`\`\`.
  
      Example translating from JavaScript to Python:
  
      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
  
      Python code:
      for i in range(10):
        print(i)
      
      ${inputLanguage} code:
      ${inputCode}

      ${outputLanguage} code (no \`\`\`):
    `;
  }
}