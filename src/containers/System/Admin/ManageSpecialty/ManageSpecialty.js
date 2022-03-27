import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../../redux";
import * as actions from '../../../../store/actions';
import { CRUD_ACTIONS, CommonUtils } from '../../../../utils';
import { getAllSpecialist } from '../../../../services/userService'
import { emitter } from '../../../../utils/emitter';
import './ManageSpecialty.scss'
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentName: '',
            price: '',
            previewImg: '',
            description: '',
            arrSpecialty: [],
            avatar:''
        }
    }
    async componentDidMount() {
        await this.getAllSpecialist();
    }
    componentDidUpdate(preProps, preState, snapshot) {

    }
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImg: objectUrl,
                avatar: base64
            })
        }
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;
        console.log(this.state)
        this.props.createSpeciatly({
            departmentName: this.state.departmentName,
            price: this.state.price,
            description: this.state.description,
            image: this.state.avatar
        })

    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['departmentName', 'price', 'description']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('nhap day du thong tin')
                break
            }
        }
        return isValid
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            password: 'hashcode',
            name: user.name,
            price: user.price,
            desc: user.desc,
            avatar: '',
            previewImg: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id

        })
    }

    getAllSpecialist = async () => {
        let response = await getAllSpecialist();
        if (response && response.success === true) {
            this.setState({
                arrSpecialty: response.result
            })


        }
        // console.log('get user from node.js', response.result)
    }
    render() {
        let arrSpecialty = this.state.arrSpecialty
        console.log('cejc', arrSpecialty)
        let { departmentName, price, description} = this.state
        return (
            <div className='user-redux-container'>
                <div className="title" >
                    THÊM MỚI CHUYEN KHOA
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <label>Ten khoa</label>
                                <input className='form-control' type='text'
                                    value={departmentName}
                                    onChange={(e) => { this.onChangeInput(e, 'departmentName') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-6'>
                                <label>Gia dich vu</label>
                                <input className='form-control' type='text'
                                    value={price}
                                    onChange={(e) => { this.onChangeInput(e, 'price') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-6'>
                                <label>Mo ta</label>
                                <input className='form-control' type='text'
                                    value={description}
                                    onChange={(e) => { this.onChangeInput(e, 'description') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label>Image</label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(e) => this.handleOnchangeImage(e)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'> Tải Ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image' style={{ backgroundImage: `url(${this.state.previewImg})` }}>

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? 'Save Change' : 'Save'}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>

                            </div>
                        </div>
                        <div className="row doctor-workshift-content ">
                            <div className="col-12">
                                <p><b> Danh sach chuyen khoa</b></p>
                                <table id="customers">
                                    <tbody>
                                        <tr >
                                            <th>Ma chuyen khoa</th>
                                            <th>Ten chuyen khoa</th>
                                            <th>Mo ta</th>
                                            <th>Gia dich vu</th>
                                            <th>Hinh anh</th>
                                            <th>Tac vu</th>
                                        </tr>
                                        {
                                            arrSpecialty && arrSpecialty.map((item, index) => {
                                                let imageBase641 = '';
                                                imageBase641 = new Buffer(item.image,'base64').toString('binary')
                                                console.log(item.image)
                                                return (
                                                    <tr key = { index } >
                                                        <td>{item.idSpecialist}</td>
                                                        <td>{item.departmentName}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.price}</td>
                                                        <td><img src = {imageBase641} style={{width:'50px' , height :'50px'}} /></td>

                                                        <td>
                                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
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
            </div>
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};
const mapDispatchToProps = dispatch => {
    return {
        createSpeciatly: (data) => dispatch(actions.createSpeciatly(data)),
        fetSpecialtyRedux: () => dispatch(actions.fetchAllSpecialty()),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty)