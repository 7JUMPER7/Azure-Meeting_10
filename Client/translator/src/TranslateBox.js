import Switcher from './Switcher';
import './TranslateBox.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { endpoint } from './config';

export default function TranslateBox() {
    const [rotated, setRotated] = useState(false);
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    useEffect(() => {
        setInputText(translatedText);
        setTranslatedText(inputText);
    }, [rotated]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            await axios.post(endpoint + '/api/translator', {
                from: (rotated) ? 'ru' : 'en',
                to: (rotated) ? 'en' : 'ru',
                text: inputText
            }).then((res) => {
                const {text} = res.data[0].translations[0];
                setTranslatedText(text);
            }).catch(() => {
                setTranslatedText('Some error happened');
            });


            }, 300);
            return () => clearTimeout(delayDebounceFn);
    }, [inputText, rotated]);

    const changeHandler = (e) => {
        setInputText(e.target.value);
    }

    return(
        <div className="container">
            <label>English<textarea type="text" readOnly={rotated} onChange={(e) => changeHandler(e)} width='200px' height={100} value={(rotated) ? translatedText : inputText}></textarea></label>
            <Switcher rotated={rotated} setRotated={setRotated}></Switcher>
            <label>Russian<textarea type="text" readOnly={!rotated} onChange={(e) => changeHandler(e)} value={(rotated) ? inputText : translatedText}></textarea></label>
        </div>
    );
}