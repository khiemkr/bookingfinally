import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './Profile.scss'
import HomeFooter from '../../HomePage/Section/HomeFooter';
import { getDetailPatient, getInfoBookingOnePatient } from '../../../services/userService'

class Booking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailPatient: {},
            arrBooking: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.idPatient) {
            let id = this.props.match.params.idPatient;
            let res = await getDetailPatient(id);
            console.log(res)
            if (res && res.success === true) {
                this.setState({
                    detailPatient: res.result[0]
                })
            }
            console.log(res.result[0])
        }
        await this.getBooking();
    }
    getBooking = async () => {
        let response = await getInfoBookingOnePatient(this.props.match.params.idPatient);
        console.log(response)
        if (response && response.success === true) {
            this.setState({
                arrBooking: response.result
            })
        }
    }
    render() {
        let detailPatient = this.state.detailPatient;
        let arrBooking = this.state.arrBooking
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='booking-container'>
                    <div className='row booking-intro'>
                        <span className='booking-intro-item'>
                            THÔNG TIN CÁ NHÂN
                        </span>
                        <div className='border'></div>
                    </div>
                    <div className='row'>
                        <div className='col-5 patient-container'>
                            <div className='patient-container-header'>
                                <b>SƠ YẾU LÝ LỊCH</b>
                            </div>
                            <div className='row patient-container-booking'>
                                <div className='col-7 patient-container-booking-info'>
                                    <p><b>Tên bệnh nhân</b>: {detailPatient.name}</p>
                                    <p><b>Email</b>: {detailPatient.email}</p>
                                    <p><b>Giới tính</b> {detailPatient.gender}</p>
                                    <p><b>Số Điện Thoại</b>: {detailPatient.phoneNumber}</p>
                                    <p><b>Ngày sinh</b>: {detailPatient.date}</p>
                                    <p><b>Địa chỉ</b>:{detailPatient.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-7 patient-container-header'>
                            <b>HỒ SƠ BỆNH ÁN</b>
                            <div className='row patient-container-information'>
                                <p>Lịch khám bệnh</p>
                                <table class="table table-striped patient-container-information-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ngay kham</th>
                                            <th scope="col">Gio</th>
                                            <th scope="col">Bác sĩ phu trach</th>
                                            <th scope="col">Trang thai</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arrBooking && arrBooking.map((item, index) => {
                                            return (
                                                <tr>
                                                    <th>{item.date}</th>
                                                    <td>{item.slotTime}</td>
                                                    <td>{item.nameDoctor}</td>
                                                    <td>{item.active ===  1 ? 'Đang chờ xử lí' : 'Đã xử lí'}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className='row patient-container-information'>
                                <p>Lịch sử khám bệnh</p>
                                <table class="table table-striped patient-container-information-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ma</th>
                                            <th scope="col">Bác sĩ phụ trách</th>
                                            <th scope="col">Nhân viên hỗ trợ</th>
                                            <th scope="col">Giờ khám bệnh</th>
                                            <th scope="col">Ngày khám bệnh</th>
                                            <th scope="col">Mô tả</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>

                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>

                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
