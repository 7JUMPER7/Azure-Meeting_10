import Switcher from './Switcher';
import './TranslateBox.css';

export default function TranslateBox() {
    return(
        <div className="container">
            <label>English<input type="text"></input></label>
            <Switcher></Switcher>
            <label>Russian<input type="text"></input></label>
        </div>
    );
}