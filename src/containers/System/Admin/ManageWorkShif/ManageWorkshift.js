import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../../redux";
import './ManageWorkshift.scss';
import * as actions from '../../../../store/actions';
import { CRUD_ACTIONS, CommonUtils } from '../../../../utils';
import DatePicker from "../../../../components/Input/DatePicker";
import Select from 'react-select';
import moment from "moment";
class ManageWorkshift extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: '',
            selectedTime:'',
            listDoctors: [],
            listTime:[],
            hasOldData: false,
            currentDate: '',
            
        }
    } 
    componentDidMount() {
        this.props.fetAllDoctorsRedux();
        this.props.fetchAllScheduleHoursRedux();;
        this.props.fetAllExaminationRedux();
    }
    buildDataInputSelectDoctor = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = `${item.name}`;
                object.value = item.idStaff;
                result.push(object)  
            })
        }
        return result
    }
    buildDataInputSelectExamination = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = `${item.slotTime}`;
                object.value = item.idTime;
                result.push(object)
                
            })
        }
        return result
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelectDoctor = this.buildDataInputSelectDoctor(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelectDoctor
            })
        }
        if(prevProps.allExamination !== this.props.allExamination){
            let dataSelectExamination = this.buildDataInputSelectExamination(this.props.allExamination)
            this.setState({
                listTime: dataSelectExamination
            })
        }
    }
    handleChangeDoctor = async (selectedDoctor) => {
        this.setState({
            selectedDoctor,
        })

    }
    handleChangeTime = async (selectedTime) => {
        this.setState({
            selectedTime
        })

    }
    handleOnChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    handleOnchageDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }) 
    }
    handleSaveUser = () => {
            this.props.createNewDoctorTime({
                idStaff: this.state.selectedDoctor.value,
                idTime: this.state.selectedTime.value,
            })
        console.log(this.state.image)
    }
    render() { 
        console.log(this.state.selectedDoctor.value)
        return (
            <div className='user-redux-container'>
                <div className="title" >
                    GIO KHAM BENH BAC SI
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-4'>
                                <label>Bac si</label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeDoctor}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className='col-4'>
                                <label>Gio Kham benh</label>
                                <Select
                                    value={this.state.selectedTime}
                                    onChange={this.handleChangeTime}
                                    options={this.state.listTime}
                                />
                            </div>
                            <div className='col-4'>
                                <label>Ngay Kham benh</label>
                                <DatePicker
                                    onChange={this.handleOnchageDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate[0]}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className='col-12 mt-3'>
                                <button onClick={() => this.handleSaveUser()} className='btn btn-primary'
                                >
                                    save
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                            </div>
                        </div>
                        <div className="row doctor-workshift-content ">
                            <div className="col-12">
                                <p><b> Cac Khung Gio</b></p>
                                <table id="customers">
                                    <tbody>
                                        <tr >
                                            <th>Khung Gio</th>
                                            <th>Bac Si</th>
                                            <th>Tac vu</th>

                                        </tr>
                                        <tr>
                                            <td>2:00PM - 3:00PM</td>
                                            <td>Nguyen Phuc Thinh</td>
                                            <td>
                                                <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                                <button className='btn-delete' ><i className='fas fa-trash'></i></button>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        allExamination: state.admin.allExamination
    };
};
const mapDispatchToProps = dispatch => {
    return {
        createNewDoctorTime: (data) => dispatch(actions.createNewDoctorTime(data)),
        fetAllDoctorsRedux: () => dispatch(actions.fetchAllDoctor()),
        fetAllExaminationRedux: () => dispatch(actions.fetchAllExamination()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailInfoDoctor(data)),
        fetchAllScheduleHoursRedux: () => dispatch(actions.fetchAllScheduleHours()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageWorkshift)