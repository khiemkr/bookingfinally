import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './ListDoctor.scss'
import HomeFooter from '../../HomePage/Section/HomeFooter';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import ab1 from '../../../assets/about/ab1.jpeg';
import ab2 from '../../../assets/about/ab2.jpeg';
import ab3 from '../../../assets/about/ab3.jpeg';
import ab4 from '../../../assets/about/ab4.jpeg';
import { getAllSpecialist, getAllDoctors } from '../../../services/userService'

const images = [
    ab1, ab2, ab3, ab4
];
class ListDocTor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
            selectedDoctor: '',
            listDoctors: [],
        }
    }
    async componentDidMount() {
        await this.getAllListDoctor();
        await this.getAllSpecialist();
    }
    getAllListDoctor = async () => {
        let response = await getAllDoctors();
        if (response && response.success === true) {
            this.setState({
                listDoctors: response.result
            })
        }
    }
    handleview = (specialist) => {
        this.props.history.push(`/specialty/${specialist.idSpecialist}`)
    }
    getAllSpecialist = async () => {
        let response = await getAllSpecialist();
        console.log('kiem tra', response)
        if (response && response.success === true) {
            this.setState({
                arrSpecialty: response.result
            })
        }
    }
    getAllSpecialist = async () => {
        let response = await getAllSpecialist();
        console.log('kiem tra', response)
        if (response && response.success === true) {
            this.setState({
                arrSpecialty: response.result
            })
        }
    }
    handleViewDetailDoctor = (staff) =>{
        this.props.history.push(`/detail-doctor/${staff.idStaff}`) 
    } 
    render() {
        let arrSpecialty = this.state.arrSpecialty
        let listDoctors = this.state.listDoctors;
        console.log(arrSpecialty)
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='category-container'>
                    <div className='row category-intro'>
                        <span className='category-intro-item'>
                            <b>DANH SACH BAC SI</b>
                        </span>
                        <div className='border'></div>
                    </div>
                    <div className='category-intro-slide'>
                        <Zoom scale={0.4}>
                            {
                                images.map((each, index) => <img key={index} style={{ width: "100%", height: '200px', objectFit: 'cover' }} src={each} />)
                            }
                        </Zoom>
                    </div>
                    <div class="row">
                        <div className='col-3 category-sidebar'>
                            <nav class="category">
                                <h3 class="category-sidebar-heading">
                                    <i class="fas fa-align-justify"></i>
                                    Trang chủ
                                </h3>
                                <ul class="category-list">
                                    {
                                        arrSpecialty && arrSpecialty.map((item, index) => {
                                            return (
                                                <li class="category-item ">
                                                    Bac si {item.departmentName}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </nav>
                        </div>
                        <div className='col-9 listdoctor-content-list' >
                            {listDoctors && listDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if(item.image){
                                    imageBase64 = new Buffer(item.image,'base64').toString('binary')
                                }
                                return (
                                    <div className="grid__column-2-4"
                                    onClick={() =>this.handleViewDetailDoctor(item)}
                                    >
                                        <a class="home-product-item" href="">
                                            <div className="home-product-item__img" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            <h4 className="home-product-item__name">Bs.{item.name}</h4>
                                            <div className="home-product-item__action">
                                                <span className="home-product-item__sold">{}</span>
                                            </div>
                                        </a>
                                    </div>
                                )
                            })}
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDocTor);
