
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal,ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:''
        }
        this.listenEmitter();
    }
    listenEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA',() =>{
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                address:''
            })
        })
    }

    componentDidMount() {

    }
    toggle = () =>{
        this.props.toggleFromParent();
    }
    handleOnChangInput = (e,id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () =>{
        let isValid = true
        let arrInput = ['email','password','firstName','lastName','address'];
        for(let i = 0; i< arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                break
            }
        }
        return true
    }
    handleAddNewUSer = () => {
        let isvalid = this.checkValidateInput();
        if(isvalid === true){
            this.props.createNewUser(this.state);
        }
    }
    render() {
        return (
            <Modal 
                isOpen = {this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'abcclassName'}
                size='md'
                centered
            >
                <ModalHeader toggle={() => {this.toggle()}}> Thêm người dùng </ModalHeader> 
                <ModalBody>
                <div className="row">
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label for="inputEmail4">Email</label>
                                <input type="email" onChange={(e)=>{this.handleOnChangInput(e,'email')}} value={this.state.email} className="form-control" placeholder="Email" name="email"></input>
                            </div>
                            <div className="form-group col-md-12">
                                <label for="inputPassword4">Password</label>
                                <input type="password" onChange={(e)=>{this.handleOnChangInput(e,'password')}} value={this.state.password} className="form-control" name="password" placeholder="Password"></input>
                            </div>
                            <div className="form-group col-md-12">
                                <label for="inputEmail4">Name</label>
                                <input type="text" onChange={(e)=>{this.handleOnChangInput(e,'firstName')}} value={this.state.firstName} className="form-control" placeholder="FirstName" name="firstName"></input>
                            </div>
                            {/* <div className="form-group col-md-12">
                                <label for="inputPassword4">Last Name</label>
                                <input type="text" onChange={(e)=>{this.handleOnChangInput(e,'lastName')}} value={this.state.lastName} className="form-control" name="lastName" placeholder="lastname"></input>
                            </div> */}
                            <div className="form-group">
                                <label for="inputAddress">Address</label>
                                <input type="text" onChange={(e)=>{this.handleOnChangInput(e,'address')}} value={this.state.address} className="form-control" name="address" placeholder="1234 Main St"></input>
                            </div>
                            <div className="form-group col-md-12">
                                <label for="inputCity">Phone number</label>
                                <input type="text" className="form-control" name="phonenumber"></input>
                            </div>
                                <div className="form-group col-md-12">
                                    <label for="inputState">Gender</label>
                                    <select name="gender" className="form-control">
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-12">
                                    <label for="inputZip">Role</label>
                                    <select name="roleId" className="form-control">
                                        <option value="1">Admin</option>
                                        <option value="2">Doctor</option>
                                        <option value="3">Patient</option>
                                    </select>
                                </div>
                        </div>
                </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' className='px-3' onClick={() => {this.handleAddNewUSer()}}>Thêm</Button>
                    <Button color='secondary' className='px-3' onClick={() => {this.toggle()}}>Hủy Bỏ</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
