import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailPatient, getDetailInfoDoctor, getOneExamination, getInfoBooking, getInfoBookingOnePatient, getHistoryBookingOnePatient } from '../../../services/userService';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, CommonUtils } from '../../../utils';
import './Booking.scss'
import HomeFooter from '../../HomePage/Section/HomeFooter';
class Booking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            detailPatient: {},
            slotTime: {},
            arrBooking: [],
            arrHistoryBooking: []
        }
    }

    async componentDidMount() {
        console.log(this.props)
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailPatient(id);
            if (res && res.success === true) {
                this.setState({
                    detailPatient: res.result[0]
                })
            }
            if (this.props.match && this.props.match.params && this.props.match.params.idDoctor) {
                let idDoctor = this.props.match.params.idDoctor;
                let resDetailDoctor = await getDetailInfoDoctor(idDoctor);
                if (resDetailDoctor && resDetailDoctor.success === true) {
                    this.setState({
                        detailDoctor: resDetailDoctor.result[0]
                    })
                }
            }
            if (this.props.match && this.props.match.params && this.props.match.params.idTime) {
                let idTime = this.props.match.params.idTime;
                let resSlotTime = await getOneExamination(idTime);
                console.log(resSlotTime)
                if (resSlotTime && resSlotTime.success === true) {
                    this.setState({
                        slotTime: resSlotTime.result[0]
                    })
                }
            }
        }
        await this.getBooking();
        await this.getHistoryBooking();

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
    getHistoryBooking = async () => {
        let response = await getHistoryBookingOnePatient(this.props.match.params.id);
        console.log(response)
        if (response && response.success === true) {
            this.setState({
                arrHistoryBooking: response.result
            })
        }
    }
    handlebooking = () => {
        this.props.createNewBooking({
            idTime: this.props.match.params.idTime,
            idStaff: this.props.match.params.idDoctor,
            idPatient: this.props.match.params.id,
            idSpecialist: this.state.detailDoctor.idSpecialist,
            date: this.props.match.params.date
        })
    }

    render() {
        let detailPatient = this.state.detailPatient;
        let detailDoctor = this.state.detailDoctor;
        let slotTime = this.state.slotTime.slotTime;
        let arrBooking = this.state.arrBooking;
        let arrHistoryBooking = this.state.arrHistoryBooking;
        console.log(this.props)
        let imageBase64 = '';
        if (detailDoctor.image) {
            imageBase64 = new Buffer(detailDoctor.image, 'base64').toString('binary')
        }
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='booking-container'>
                    <div className='row booking-intro'>
                        <span className='booking-intro-item'>
                            Xác nhận thông tin đặt lịch
                        </span>
                        <div className='border'></div>
                    </div>
                    <div className='row'>
                        <div className='col-3 booking-left-overlay'>
                            <div className='booking-info-doctor'>
                                <div className='booking-info-doctor-avt'
                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                ></div>
                                <div className='booking-info-doctor-desc'>
                                    <div className='booking-info-doctor-desc-name'>
                                        <span>BS.{detailDoctor.name}</span>
                                        <p>Chuyên {detailDoctor.departmentName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='booking-info-booking'>
                                <div className='booking-info-booking-time'>
                                    <p>{this.props.match.params.date}</p>
                                    <span>{slotTime}</span>
                                </div>
                                <div className='booking-info-booking-price'>
                                    <span>{detailDoctor.price} VND</span>
                                </div>
                            </div>
                            <div className='booking-info-booking-btn'>
                                <button className='btnsucces'
                                    onClick={() => this.handlebooking()}
                                > Đặt lịch
                                </button>
                                <button className='btncancel'> Hủy </button>
                            </div>
                        </div>
                        <div className='col-9 patient-container'>
                            <div className='patient-container-header'>
                                <b>THÔNG TIN KHÁM BỆNH</b>
                            </div>
                            <div className='row patient-container-booking'>
                                <div className='col-7 patient-container-booking-info'>
                                    <p><b>Tên bệnh nhân</b>: {detailPatient.name}</p>
                                    <p><b>Email</b>: {detailPatient.email}</p>
                                    <p><b>Giới tính</b> {detailPatient.gender}</p>
                                    <p><b>Địa chỉ</b>{detailPatient.address}</p>
                                    <p><b>Khám bệnh</b>: Khám thần kinh</p>
                                    <p><b>Ngày khám bệnh</b>: 9-3-2-2022</p>
                                    <p><b>Địa chỉ khám bênh</b>: 3-2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam</p>
                                    <p><b>Ghi chú</b>: Quý bệnh nhân đến khám theo giờ trên lịch đã đăng kí sẽ có nhân viên tư vấn hỗ trợ</p>
                                </div>
                                <div className='col-5 patient-container-booking-img'>
                                    
                                </div>
                            </div>
                            <div className='patient-container-header'><b>HỒ SƠ BỆNH ÁN</b></div>
                            <div className='row patient-container-information'>
                                <p>Lịch khám benh</p>
                                <table class="table table-striped patient-container-information-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ngày khám</th>
                                            <th scope="col">Gio khám</th>
                                            <th scope="col">Bác sĩ</th>
                                            <th scope="col">Trang Thai</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arrBooking && arrBooking.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item.date}</td>
                                                    <td>{item.slotTime}</td>
                                                    <td>{item.nameDoctor}</td>
                                                    <td>{item.active === 1 ? 'Dang cho xu li' : 'Da xu li'}</td>
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
                                            <th scope="col">Bác sĩ phụ trách</th>
                                            <th scope="col">Giờ khám bệnh</th>
                                            <th scope="col">Ngày khám bệnh</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arrHistoryBooking && arrHistoryBooking.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item.nameDoctor}</td>
                                                    <td>{item.slotTime}</td>
                                                    <td>{item.date}</td>
                                                </tr>
                                            )
                                        })}
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
        createNewBooking: (data) => dispatch(actions.createNewBooking(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
