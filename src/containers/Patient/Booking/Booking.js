import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './Booking.scss'
import HomeFooter from '../../HomePage/Section/HomeFooter';
class Booking extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            detailDoctor: {}
        }
    }

    async componentDidMount() {
    }
    render() {
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
                                <div className='booking-info-doctor-avt'></div>
                                <div className='booking-info-doctor-desc'>
                                    <div className='booking-info-doctor-desc-name'>
                                        <span>BS. Nguyen Tho Lo</span>
                                        <p> Chuyên khoa thần kinh</p>
                                    </div>
                                </div>
                            </div>
                            <div className='booking-info-booking'>
                                <div className='booking-info-booking-time'>
                                    <p>Ngày 9-3-2022</p>
                                    <span>8:00AM - 10:00AM</span>
                                </div>
                                <div className='booking-info-booking-price'>
                                    <span>500.000 VND</span>
                                </div>
                            </div>
                            <div className='booking-info-booking-btn'>
                                <button className='btnsucces'> Đặt lịch </button>   
                                <button className='btncancel'> Hủy </button>    
                            </div>
                        </div>
                        <div className='col-9 patient-container'>
                            <div className='patient-container-header'>
                                <b>THÔNG TIN KHÁM BỆNH</b>
                            </div>
                            <div className='row patient-container-booking'>
                                <div className='col-7 patient-container-booking-info'>
                                    <p><b>Tên bệnh nhân</b>: Nguyễn Thế Vinh</p>
                                    <p><b>Email</b>: Vinh@gmail.com</p>
                                    <p><b>Giới tính</b> bê đê</p>
                                    <p><b>Địa chỉ</b>:12 thốt nốt, Cần Thơ, Việt Nam</p>
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
                                <p>Lịch tái khám</p>
                                <table class="table table-striped patient-container-information-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ma</th>
                                            <th scope="col">Ngày khám</th>
                                            <th scope="col">Bác sĩ</th>
                                            <th scope="col">Mô tả</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
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
