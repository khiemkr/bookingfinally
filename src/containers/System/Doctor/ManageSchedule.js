import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../redux";
import * as actions from '../../../store/actions';
import './ManageSchedule.scss'
class ManageSchedule extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='doctor-workshift-container'>
                    <div className="row doctor-workshift-content ">
                        <div className="col-12">
                            <p><b> Lich kham benh ca nhan</b></p>
                            <table id="customers">
                                <tbody>
                                    <tr >
                                        <th>Ma ho so</th>
                                        <th>Gio Kham</th>
                                        <th>Ngay Kham</th>
                                        <th>Ten Benh Nhan</th>
                                        <th>Trang thai</th>
                                    </tr>
                                    <tr>
                                        <td>h2326</td>
                                        <td>2:00AM - 3:00AM</td>
                                        <td>20/12/2022</td>
                                        <td>Nguyen The Vinh</td>
                                        <td>
                                            <button className='btn-edit' ><i class="fas fa-check"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>h2326</td>
                                        <td>2:00AM - 3:00AM</td>
                                        <td>20/12/2022</td>
                                        <td>Nguyen The Vinh</td>
                                        <td>
                                            <button className='btn-edit' ><i class="fas fa-check"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>h2326</td>
                                        <td>2:00AM - 3:00AM</td>
                                        <td>20/12/2022</td>
                                        <td>Nguyen The Vinh</td>
                                        <td>
                                            <button className='btn-edit' ><i class="fas fa-check"></i></button>
                                        </td>
                                    </tr>
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
        allScheduleTime: state.admin.allScheduleTime

    };
};
const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleHours: () => dispatch(actions.fetchAllScheduleHours()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule)