import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInfoDoctor } from '../../../services/userService'
import HomeFooter from '../../HomePage/Section/HomeFooter';
import Booking from '../Booking/Booking';
import { getAllExamination } from '../../../services/userService'
import { withRouter } from 'react-router'
class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }
    handleShow = () => {
        this.props.history.push(`/booking`)
    }
    async componentDidMount() {
        await this.getAllExamination();
        console.log(this.props)
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInfoDoctor(id);
            if (res && res.success === true) {
                this.setState({
                    detailDoctor: res.result[0]
                })
            }
        }

    }
    getAllExamination = async () => {
        let response = await getAllExamination();
        // console.log('kiem tra', response)
        if (response && response.success === true) {
            this.setState({
                arrExamanition: response.result
            })


        }
    }
    render() {
        console.log(this.state.detailDoctor.image)
        let { detailDoctor } = this.state;
        let nameVi = '';
        let arrExamanition = this.state.arrExamanition
        let imageBase64 = '';

        if (detailDoctor.image) {
            imageBase64 = new Buffer(detailDoctor.image, 'base64').toString('binary')
        }
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>

                        <div
                            className='content-left'
                            style={{ backgroundImage: `url(${imageBase64})` }}
                        >

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {nameVi}
                            </div>
                            <div className='down'>
                                {
                                    <span>
                                        {detailDoctor.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='row'>
                        <div className=' col-6 '>
                            <div className='detail-infor-doctor'>
                                {detailDoctor && detailDoctor && detailDoctor.contentHTML
                                    &&
                                    <div dangerouslySetInnerHTML={{ __html: detailDoctor.contentHTML }}>

                                    </div>
                                }
                            </div>
                        </div>
                        <div className='col-6 detail-info-celendar'>
                            <div className='detail-infor-day'>
                                <select>
                                    <option selected>10-10-2022</option>
                                    <option>10-10-2022</option>
                                    <option>10-10-2022</option>
                                    <option>10-10-2022</option>
                                </select>
                            </div>
                            <div className='row specialty-content-item-celender-content'>
                                {
                                    arrExamanition && arrExamanition.map((item, index) => {
                                        return (
                                            <div className='col-3' onClick={() => this.handleShow()}>
                                                <div className='specialty-content-item-celender-content'>
                                                    <p>{item.slotTime}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='detail-info-address'>
                                <span> ĐỊA CHỈ PHÒNG KHÁM </span>
                                <p>Trường DHCT, 3/2 phường Xuân Khánh,quận Ninh Kiều, Thành phố Cần Thơ</p>
                                <p>Email: medicalbooking@gmail.com</p>
                                <p>SDT:038943476344</p>

                            </div>
                            <div className='detail-info-price'>
                                <span>GIÁ KHÁM BỆNH:</span>
                                <p>500.000 VND</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailDoctor));
