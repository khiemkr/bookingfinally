import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './SpecialtyItem.scss'
import HomeFooter from '../../HomePage/Section/HomeFooter';
import { getAllSpecialist, getAllDoctorofSpecialty,getDetailSpecialist } from '../../../services/userService';
import { withRouter } from 'react-router';

class CategorySelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listAllDoctorofSpecialty: [],
            listSpecialty: [],
            detailSpecialty:{}
        }
    }
    handlShowdetail = (doctor) => {
        this.props.history.push(`/detail-doctor/45`)
    }
    async componentDidMount() {
        await this.getAllListDoctorOfSpecialty();
        console.log(this.props)
        if (this.props.match && this.props.match.params && this.props.match.params.idSpecilist) {
            let id = this.props.match.params.idSpecilist;
            console.log(id)
            let res = await getAllDoctorofSpecialty(id);
            if (res && res.success === true) {
                this.setState({
                    listAllDoctorofSpecialty: res.result
                })
            }
            let resSpecialty = await getDetailSpecialist(id);
            if (res && res.success === true) {
                this.setState({
                    detailSpecialty: resSpecialty.result[0]
                })
            }
        }
    }
    getAllListDoctorOfSpecialty = async () => {
        let response = await getAllSpecialist();
        console.log('kiem tra', response)
        if (response && response.success === true) {
            this.setState({
                listSpecialty: response.result
            })


        }
    }

    render() {
        console.log(this.state)
        let listAllDoctorofSpecialty = this.state.listAllDoctorofSpecialty;
        let detailSpecialty = this.state.detailSpecialty
        console.log(detailSpecialty)
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='specialty-container'>
                    <div className='specialty-banner'>
                        <div className='specialty-banner-opacity'>
                            <div className='specialty-intro'>
                                <div className='specialty-title'>
                                    <span>{detailSpecialty.departmentName}</span>
                                </div>
                                <div className='specialty-description'>
                                    <p>
                                       {detailSpecialty.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='specialty-content'>
                        <div className='specialty-content-intro'>
                            <p>Bác sĩ ăn khách</p>
                        </div>
                        {
                            listAllDoctorofSpecialty && listAllDoctorofSpecialty.map((item, index) => {
                                return (

                                    <div className='row specialty-content-item'>
                                        <div className='col-6 specialty-content-item-info'>
                                            <div className='specialty-content-item-info-avt'>
                                            </div>
                                            <div className='specialty-content-item-info-description'>
                                                <span>{item.name}</span>
                                                <p>{item.description} </p>
                                            </div>
                                        </div>
                                        <div className='col-6 specialty-content-item-celender'>
                                            <div className='specialty-content-item-celender-header'>
                                                <span><i class="fas fa-calendar"></i>  Lich Kham</span>
                                            </div>
                                            <div className='row specialty-content-item-celender-content'>
                                                <div className='col-3'>
                                                    <div className='specialty-content-item-celender-content'>
                                                        <p>8:00AM - 10:00AM</p>
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <div className='specialty-content-item-celender-content'>
                                                        <p>8:00AM - 10:00AM</p>
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <div className='specialty-content-item-celender-content'>
                                                        <p>8:00AM - 10:00AM</p>
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <div className='specialty-content-item-celender-content'>
                                                        <p>8:00AM - 10:00AM</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='specialty-content-item-celender-price'>
                                                <span>GIA KHAM : </span>
                                                <p>{detailSpecialty.price} VND</p>
                                            </div>
                                            <button
                                                onClick={() => this.handlShowdetail()}
                                                className='specialty-content-item-celender-btn-detail'>
                                                Xem chi tiet
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategorySelect));
