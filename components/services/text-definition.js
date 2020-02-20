import truthAnswer from './truth-answer.js';
import alienAnswer from './alien-answer.js';

function chooseText(arg) {

    let l = arg.length;

    if (l === 0) {
        return 'No text'
    }

    if (l === 1) {
        return arg[0]
    }

    let i = Math.floor(Math.random() * (l - 0));

    return arg[i];
}

export default textDefinition = (arg, lang) => {

    switch (arg) {

        case 'truthScanner':
            return chooseText(truthAnswer[lang]);
            break;

        case 'alienScanner':
            return chooseText(alienAnswer[lang]);
            break;

        default:
            return chooseText(arg);
    }
}