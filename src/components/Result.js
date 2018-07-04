import React, { Component } from 'react';
import {connect} from 'react-redux';

class Result extends Component {
  render() {
    return (
      <div className="result table-responsive">
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th className="text-center" colSpan={this.props.requireSubjects.length}>Môn bắt buộc</th>
              <th className="text-center" colSpan={this.props.combineSubjects.length}>Môn tổ hợp</th>
              <th className="text-center" rowSpan={2}>TB lớp 12</th>
              <th className="text-center" rowSpan={2}>Ưu tiên</th>
              <th className="text-center" rowSpan={2}>Khuyến khích</th>
            </tr>
            <tr>
              {
                this.props.requireSubjects.map(subject => <th key={subject.id}>{subject.name}</th>)
              }
              {
                this.props.combineSubjects.map(subject => <th key={subject.id}>{subject.name}</th>)
              }
            </tr>
          </thead>
          <tbody>
            <tr>
              {
                this.props.requireSubjects.map(subject => <td key={subject.id}>{subject.score}</td>)
              }
              {
                this.props.combineSubjects.map(subject => <td key={subject.id}>{subject.score}</td>)
              }
              <td>{this.props.tb12}</td>
              <td>{this.props.uutien}</td>
              <td>{this.props.kk}</td>
            </tr>
            <tr>
            <td colSpan={this.props.requireSubjects.length + this.props.combineSubjects.length + 3}>
            <strong>Điểm xét TN: </strong> {this.props.result} ({this.props.result <= 5 || this.props.sateless.length > 0 ? 'Trượt' : 'Đạt'} - 
            {this.props.sateless.length > 0 ? ' Điểm liệt: ' + this.props.sateless.join(', ') :' Không có điểm liệt'})
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
      requireSubjects: state.requireSubjects,
      combineSubjects: state.combineSubjects,
      result: state.result,
      tb12: state.tb12,
      uutien: state.uutien,
      kk: state.kk,
      sateless: state.sateless
  }
}

export default connect(mapStateToProp)(Result);
