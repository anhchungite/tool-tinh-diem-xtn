import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setScoreSubject} from '../action';

class Subject extends Component {
    render() {
        return (
        <div className="subject form-group">
            <label className="control-label"> {this.props.subjectProp.name}: </label>
            <input type="text" onChange={this.onChangeScore.bind(this, this.props.subjectProp.id)} className="form-control" placeholder={this.props.subjectProp.score}/>
        </div>
        );
    }
    onChangeScore(id, e) {
        var score = e.target.value.trim()
        var patt = new RegExp(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/);
        var res = patt.test(score);
        if(!res) {
            score = 0;
        }
        this.props.setScoreSubject(id, Number(score))
    }
}

const mapStateToProp = (state) => {
    return {
        requireSubjects: state.requireSubjects,
        combineSubjects: state.combineSubjects,
        isTHPT: state.isTHPT,
        isKHTN: state.isKHTN,
        subjects: state.subjects,
        getSubjects: state.getSubjects,
        subjectsTHPT: state.subjectsTHPT,
        subjectsGDTX: state.subjectsGDTX
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        setScoreSubject: (id, score) => {
            dispatch(setScoreSubject(id, score))
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(Subject);
