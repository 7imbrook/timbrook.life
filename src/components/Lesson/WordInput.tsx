import * as React from 'react';
import {
    TextField,
} from 'material-ui';
import {WordInfo} from '../../reducers/lessonReducer';

export interface WordCreatorProps {
    value?: WordInfo;
    onChange?: (w: WordInfo) => void;
}

export class WordInput extends React.Component<WordCreatorProps, WordInfo> {

    constructor(props: WordCreatorProps) {
        super(props);
        this.state = {word: props.value !== undefined ? props.value.word : ''} as WordInfo;
    }

    get value() {
        return this.state;
    }

    onWordChanged(ev: any) {
        let state = {
            word: ev.target.value
        };
        this.setState(state);
        if (this.props.onChange !== undefined) {
            this.props.onChange(state);
        }
    }

    render() {
        return (
            <TextField style={{margin: 0}} value={this.state.word} hintText='New Word' onChange={this.onWordChanged.bind(this)} />
        );
    }
}

export default WordInput;