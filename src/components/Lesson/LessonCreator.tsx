import * as React from 'react';
import WordCreator from './WordCreator';
import Page from '../util/Page';
import BindingComponent from '../util/BindingComponent';
import {Lesson} from '../../reducers/lessonReducer';
import {
    TextField,
} from 'material-ui';

export interface LessonCreatorProps {
    children?: Element[];
    onChange?: (l: Lesson) => void;
    loadLession?: () => void;
    value?: Lesson;
    notFound: boolean;
}

export class LessonCreator extends BindingComponent<LessonCreatorProps> {
    constructor(props: LessonCreatorProps) {
        super(props);
        this.state = props.value || {
            'id': 0,
            'title': '',
            'word_infos': []
        };
    }

    componentWillReceiveProps(newProps: LessonCreatorProps) {
        this.setState(newProps.value || {
            'id': 0,
            'title': '',
            'word_infos': []
        });
    }

    get value(): Lesson {
        return {
            id: this.state['id'],
            title: this.state['title'],
            word_infos: this.state['word_infos'],
        };
    }

    componentWillMount() {
        if (this.props.notFound) {
            if (this.props.loadLession !== undefined) {
                this.props.loadLession();
            }
        }
    }

    componentStateChange() {
        if (this.props.onChange !== undefined) {
            this.props.onChange(this.value);
        }
    }

    render() {
        let content: any;
        if (this.props.notFound) {
            content = 'Lesson Not Found';
        } else {
            content = (
                <div style={{textAlign: 'left'}}>
                <TextField
                    style={{width: '100%'}}
                    inputStyle={{fontSize: '1.5em'}}
                    floatingLabelText='Lesson Title'
                    name='title'
                    value={this.state['title']}
                    onChange={this.bindValueToName.bind(this)}/>
                <WordCreator name='word_infos' value={this.state['word_infos']} onChange={this.updateState('word_infos')}/>
                </div>
            );
        }
        return  (
            <Page>
                {content}
            </Page>
        );
    }
}

export default LessonCreator;