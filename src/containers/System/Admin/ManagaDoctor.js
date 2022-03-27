import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import './ManageDoctor.scss'
import Select from 'react-select'
import {getDetailInfoDoctor} from '../../../services/userService'
const mdParser = new MarkdownIt();
class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idStaff:'',
            idSpecialist:'',
            contentMarkdown: '', 
            contentHTML:'',
            selectedDoctor:'',
            selectedSpecialty:'',
            description:'',
            listDoctors:[],
            listSpecialtys:[],
            hasOldData: false
        }
    }
    componentDidMount(){
        this.props.fetAllDoctorsRedux();
        this.props.fetAllSpecialtyRedux();
    }
    buildDataInputSelectDoctor = (inputData) =>{
        let result = []; 
        if(inputData && inputData.length > 0 ) {
            inputData.map((item,index) =>{
                let object ={};
                object.label = `${item.name}`;
                object.value = item.idStaff;
                result.push(object)
            })
        }
        return result
    }
    buildDataInputSelectSpecilty = (inputData) =>{
        let result = [];
        if(inputData && inputData.length > 0 ) {
            inputData.map((item,index) =>{
                let object ={};
                object.label = `${item.departmentName}`;
                object.value = item.idSpecialist;
                result.push(object)
            })
        }
        return result
    }
    componentDidUpdate(prevProps,prevState,snapshot){
      if(prevProps.allDoctors !== this.props.allDoctors){
        let dataSelectDoctor = this.buildDataInputSelectDoctor(this.props.allDoctors)  
        console.log(this.props.allDoctors)
        this.setState({
              listDoctors: dataSelectDoctor
          })
      }
      if(prevProps.allSpecialty !== this.props.allSpecialty){
          let dataSelectSpecialty = this.buildDataInputSelectSpecilty(this.props.allSpecialty)  
          console.log(this.props.allSpecialty)
          this.setState({
            listSpecialtys: dataSelectSpecialty
          })
      }
    } 
    handleEditorChange = ({html,text}) => {
        this.setState({
            contentMarkdown:text,
            contentHTML:html
        })
    }
    handleSaveContentMarkdown = () =>{
        let {hasOldData} = this.state
        this.props.createDoctorDetailInfo({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            idStaff:this.state.idStaff,
            idSpecialist: this.state.idSpecialist,
            description: this.state.description
        })
    }
    handleChangeDoctor = async (selectedDoctor) =>{
        console.log(selectedDoctor.value)
        this.setState({
            selectedDoctor,
            idStaff: selectedDoctor.value
        })
        let res = await getDetailInfoDoctor(selectedDoctor.value);
        // if(res && res.success === true && res.result && res.result.contentMarkdown){
        //     let markdown = res.infor.data.kMarkdown;
        //     this.setState({
        //         contentHTML: markdown.contentHTML,
        //         contentMarkdown: markdown.contentMarkdown,
        //         description: markdown.description,
        //         hasOldData: true
        //     })
        //     console.log('check res',this.state.contentMarkdown)
        // } else{
        //     this.setState({
        //         contentHTML: '',
        //         contentMarkdown: '',
        //         description: '',
        //         hasOldData: false

        //     })
        // }
    }
    handleChangeSpecialty = async (selectedSpecialty) =>{
        this.setState({
            selectedSpecialty,
            idSpecialist: selectedSpecialty.value
        })
    }
    handleOnChangeDesc = (e) =>{
        this.setState({
            description: e.target.value
        })
    }
    render() { 
        let {hasOldData} = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    TẠO THÊM THÔNG TIN BÁC SĨ
                </div> 
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chon Chuyen Khoa</label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSpecialty}
                            options={this.state.listSpecialtys}
                        />
                        <label>Chon Bac  Si</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeDoctor}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thong tin gioi thieu:</label>
                        <textarea 
                            className='form-control' 
                            rows='4'
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value = {this.state.description}
                        >                       
                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{height:'500px'}} 
                        renderHTML={text =>mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button 
                    onClick={()=> this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                >
                   {hasOldData === true ? 
                        <span>Luu thong tin</span> : <span>Tao thong tin</span>
                    }
                </button>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        allSpecialty: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetAllDoctorsRedux: () => dispatch(actions.fetchAllDoctor()),
        fetAllSpecialtyRedux: () => dispatch(actions.fetchAllSpecialty()),
        createDoctorDetailInfo: (data) => dispatch(actions.createDoctorDetailInfo(data)), 
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailInfoDoctor(data))
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
