import * as React from 'react';
import {WordInput} from './WordInput';
import {WordInfo} from '../../reducers/lessonReducer';
import { List, ListItem, Subheader } from 'material-ui';
export interface WordCreatorProps {
    name?: string;
    value?: WordInfo[];
    onChange?: (w: WordInfo[]) => void;
}

export interface WordCreatorState {
    word_infos: WordInfo[];
}

export class WordCreator extends React.Component<WordCreatorProps, WordCreatorState> {
    state: WordCreatorState;
    inputs: WordInput[];

    constructor(props: WordCreatorProps) {
        super(props);
        this.inputs = [];
        this.state = {
            word_infos: (props.value || []).concat([{word: ''}]),
        };
    }

    get value() {
        // The last input will always be a dummy. Don't include it
        return this.state.word_infos.slice(0, this.state.word_infos.length - 1);
    }

    onWordChanged(i: number, word_info: WordInfo) {
        let word_infos = [] as WordInfo[];

        word_infos = Object.assign(this.state.word_infos, {
            [i]: word_info
        });

        if (i === word_infos.length - 1 && word_infos[i].word !== '') {
            // Create a new empty word
            word_infos.push({word: ''});
        } else if (i === word_infos.length - 2 && word_infos[i].word === '') {
            // If you empty the second-to-last input and the last input is empty,
            // Let's just remove that last empty input
            word_infos.pop();
        }


        this.setState({
            word_infos
        });

        if (this.props.onChange) {
            this.props.onChange(word_infos);
        }
    }

    render() {
        this.inputs = [];
        let inputs = this.state.word_infos.map((w, i) =>
            <ListItem key={i} disabled={true} style={{paddingTop: 0}}>
                <WordInput key={i} value={w} onChange={this.onWordChanged.bind(this, i)} ref={(e) => this.inputs[i] = e}/>
            </ListItem>
        );

        return (
            <List>
                <Subheader>Words</Subheader>
                {inputs}
            </List>
        );
    }
}

export default WordCreator;