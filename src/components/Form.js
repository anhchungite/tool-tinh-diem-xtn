import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setRequireSubjects, setIsTHPT, setCombineSubjects, setIsKHTN} from '../action';
import Subject from '../components/Subject'; 

class Form extends Component {
  render() {
    return (
        <React.Fragment>
            <form className="form-inline" onSubmit={this.handleGetResult.bind(this)}>
                <h4>Hình thức đào tạo:</h4>
                <div onChange={this.handleOnChangeTHPT.bind(this)}>
                    <label className="radio-inline"><input type="radio" value="true" name="thpt" defaultChecked={true}/>Trung học phổ thông</label>
                    <label className="radio-inline"><input type="radio" value="false" name="thpt"/>Giáo dục thường xuyên</label>
                </div>
                <input type="hidden" ref="isTHPT" defaultValue={this.props.isTHPT}/> 
                <hr/>
                <div className="subject form-group">
                    <label className="control-label"> TB lớp 12: </label>
                    <input type="text" onChange={this.handleOnChangeTB12.bind(this)} className="form-control" placeholder={this.props.tb12}/>
                </div>
                <div className="subject form-group">
                    <label className="control-label"> Khuyến khích (nếu có): </label>
                    <input type="text" onChange={this.handleOnChangeKK.bind(this)} className="form-control" placeholder={this.props.kk}/>
                </div>
                <div className="subject form-group">
                    <label className="control-label"> Ưu tiên (nếu có): </label>
                    <input type="text" onChange={this.handleOnChangeUT.bind(this)} className="form-control" placeholder={this.props.uutien}/>
                </div>
                <hr/>
                <h4>Điểm các môn bắt buộc:</h4>
                    {this.props.requireSubjects.map((subject,i) => <Subject subjectProp={subject} key={subject.id}/>)}
                <hr/>
                <h4>Điểm các môn tổ hợp:</h4>
                <div onChange={this.handleOnChangeKHTN.bind(this)}>
                    <label className="radio-inline"><input type="radio" value="true" name="khtn" defaultChecked={true}/>Khoa học tự nhiên</label>
                    <label className="radio-inline"><input type="radio" value="false" name="khtn"/>Khoa học xã hội</label>
                </div>
                <input type="hidden" ref="isKHTN" defaultValue={this.props.isKHTN}/>
                <br/><br/>
                    {this.props.combineSubjects.map((subject,i) => <Subject subjectProp={subject} key={subject.id}/>)}
                
                <hr/>
                <button type="submit" className="btn btn-primary">Xem kết quả</button>
                
            </form>
        </React.Fragment>
    );
  }

  handleGetResult(e) {
    e.preventDefault();
    var requireSubjects = []
    var combineSubjects = []
    var sateless = []
    if(this.props.isTHPT) {
        requireSubjects = this.props.getSubjects(this.props.subjectsTHPT.require, this.props.subjects);
        combineSubjects = this.props.isKHTN ? this.props.getSubjects(this.props.subjectsTHPT.combine.khtn, this.props.subjects) : this.props.getSubjects(this.props.subjectsTHPT.combine.khxh, this.props.subjects)
    } else {
        requireSubjects = this.props.getSubjects(this.props.subjectsGDTX.require, this.props.subjects);
        combineSubjects = this.props.isKHTN ? this.props.getSubjects(this.props.subjectsGDTX.combine.khtn, this.props.subjects) : this.props.getSubjects(this.props.subjectsGDTX.combine.khxh, this.props.subjects)
    }
    this.props.setRequireSubjects(requireSubjects);
    this.props.setCombineSubjects(combineSubjects);
    var batBuoc = requireSubjects.reduce((total, i) => total += i.score, 0);
    var toHop = combineSubjects.reduce((total, i) => total += i.score, 0) / combineSubjects.length;
    var result = this.calcDiemXTN(batBuoc, toHop, this.props.tb12, this.props.kk, this.props.uutien);
    var satelessRequireSubjects = this.checkSateless(requireSubjects);
    var satelessCombineSubjects = this.checkSateless(combineSubjects);
    sateless = [...satelessRequireSubjects, ...satelessCombineSubjects]
    this.props.setResult(result);
    this.props.setSateless(sateless);
  }

  checkSateless(subjects) {
    var sateless = []
    for(var i of subjects) {
        if(i.score <= 1) {
            sateless.push(i.name)
        }
    }
    return sateless;
  }
  calcDiemXTN(batBuoc, toHop, diemTB12, diemKK=0, diemUT=0) {
    var div = 3;
    if(this.props.isTHPT) {
        div = 4;
    }
    var score = ((((batBuoc + toHop + diemKK) / div) + diemTB12) / 2) + diemUT;
    return Math.round(score * 100) / 100;
  }

  handleOnChangeTB12(e) {
    var score = e.target.value.trim()
    var patt = new RegExp(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/);
    var res = patt.test(score);
    if(!res) {
        score = 0;
    }
    this.props.setTB12(Number(score))
  }

  handleOnChangeKK(e) {
    var score = e.target.value.trim()
    var patt = new RegExp(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/);
    var res = patt.test(score);
    if(!res) {
        score = 0;
    }
    this.props.setKK(Number(score))
}

handleOnChangeUT(e) {
    var score = e.target.value.trim()
    var patt = new RegExp(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/);
    var res = patt.test(score);
    if(!res) {
        score = 0;
    }
    this.props.setUT(Number(score))
}

  handleOnChangeTHPT(e) {
    this.refs.isTHPT.value = e.target.value === "true"
    this.props.setIsTHPT(e.target.value === "true")
    this.handleSetRequireSubjects(e.target.value === "true")
    this.handleSetCombineSubjects(this.refs.isKHTN.value === "true")
  }

  handleOnChangeKHTN(e) {
    this.refs.isKHTN.value = e.target.value === "true"
    this.props.setIsKHTN(e.target.value === "true")
    this.handleSetCombineSubjects(e.target.value === "true");
  }

  handleSetRequireSubjects(thpt = true) {
    var requireSubjects = [];
    if(!thpt) {
        requireSubjects = this.props.getSubjects(this.props.subjectsGDTX.require, this.props.subjects);
    } else {
        requireSubjects = this.props.getSubjects(this.props.subjectsTHPT.require, this.props.subjects);
    }
    this.props.setRequireSubjects(requireSubjects);
  }

  handleSetCombineSubjects(khtn = true) {
    var combineSubjects = [];
    if(!khtn) {
        if(this.refs.isTHPT.value === "true") {
            combineSubjects = this.props.getSubjects(this.props.subjectsTHPT.combine.khxh, this.props.subjects);
        } else {
            combineSubjects = this.props.getSubjects(this.props.subjectsGDTX.combine.khxh, this.props.subjects);
        }
    } else {
        combineSubjects = this.props.getSubjects(this.props.subjectsTHPT.combine.khtn, this.props.subjects);
    }
    this.props.setCombineSubjects(combineSubjects);
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
        subjectsGDTX: state.subjectsGDTX,
        tb12: state.tb12,
        uutien: state.uutien,
        kk: state.kk
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        setRequireSubjects: (subjects) => {
            dispatch(setRequireSubjects(subjects))
        },
        setIsTHPT: (value) => {
            dispatch(setIsTHPT(value))
        },
        setCombineSubjects: (subjects) => {
            dispatch(setCombineSubjects(subjects))
        },
        setIsKHTN: (value) => {
            dispatch(setIsKHTN(value))
        },
        setTB12: (score) => {
            dispatch({type: 'SET_TB12', score: score})
        },
        setKK: (score) => {
            dispatch({type: 'SET_KK', score: score})
        },
        setUT: (score) => {
            dispatch({type: 'SET_UT', score: score})
        },
        setResult: (score) => {
            dispatch({type: 'SET_RESULT', score: score})
        },
        setSateless: (items) => {
            dispatch({type: 'SET_SATELESS', items: items})
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Form);
