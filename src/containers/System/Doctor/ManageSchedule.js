import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../redux";
import * as actions from '../../../store/actions';
import './ManageSchedule.scss';
import { getAllExamination, getOneDoctorTime,getInfoBookingOnePatient } from '../../../services/userService'

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            listTimeOfDoctor: []
        }
    }
    async componentDidMount() {
        console.log(this.props.userInfo)
        // if (this.props.userInfo && this.props.userInfo[0].idStaff) {
        //     let id = this.props.userInfo[0].idStaff;
        //     let resOneDoctorTime = await getOneDoctorTime(id);
        //     if (resOneDoctorTime && resOneDoctorTime.success === true) {
        //         this.setState({
        //             listTimeOfDoctor: resOneDoctorTime.result,
        //         })
        //     }
        // }
        await this.getBooking();

    }

    getBooking = async () => {
        let response = await getInfoBookingOnePatient(this.props.match.params.id);
        console.log(response)
        if (response && response.success === true) {
            this.setState({
                arrBooking: response.result
            })
        }
    }
    render() {
        let listTimeOfDoctor = this.state.listTimeOfDoctor
        console.log(listTimeOfDoctor)
        return (
            <React.Fragment>
                <div className='doctor-workshift-container'>
                    <div className="row doctor-workshift-content ">
                        <div className="col-12">
                            <p><b> Lich kham benh ca nhan</b></p>
                            <table id="customers">
                                <tbody>
                                    <tr >
                                        <th>Gio Kham</th>
                                        <th>Ngay Kham</th>
                                        <th>Ten Benh Nhan</th>
                                        <th>Trang thai</th>
                                    </tr>
                                    {
                                        listTimeOfDoctor && listTimeOfDoctor.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item.slotTime}</td>
                                                    <td>{item.date}</td>
                                                    <td>{}</td>
                                                    <td>
                                                        <button className='btn-edit' ><i class="fas fa-check"></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        userInfo: state.user.userInfo
    };
};
const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleHours: () => dispatch(actions.fetchAllScheduleHours()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule)