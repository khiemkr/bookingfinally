import axios from "../axios" 

const handleLogin = (userEmail,userPassword) => {
    // return axios.post('/api/login',{email: userEmail,password: userPassword})
    return axios.post('/api/login/staff',{email: userEmail,password: userPassword})
} 
const handleLoginPatient = (userEmail,userPassword) => {
    // return axios.post('/api/login',{email: userEmail,password: userPassword})
    return axios.post('/api/login/patient',{email: userEmail,password: userPassword})
} 
// const getAllUsers = (inputId) =>{
//     // return axios.get(`/api/get-all-users?id=${inputId}`)
//     // return axios.get(`/api/get-all-staff?idStaff=${inputId}`)
//     return axios.get(`/api/staff/getAll?id=${inputId}`)
// }
// lay toan bo nhan vien
const getAllUsers = () =>{
    return axios.get(`/api/staff/getAll`)
}
// taoj nhan vien moi
const createNewUserService = (data) =>{ 
    // return axios.post('/api/create-new-user',data);
    return axios.post('/api/staff/create',data);
}

// taoj moi chuyen khoa
const createNewSpecialty = (data) =>{ 
    // return axios.post('/api/create-new-user',data);
    return axios.post('/api/specialist/add',data);
}
// lay danh sach chuyen khoa
const getAllSpecialist = () =>{
    return axios.get(`/api/specialist/getAll`)
}
//lay thong tin 1 chuyen khoa
const getDetailSpecialist = (inputId) =>{
    return axios.get(`/api/specialist/getSingle?idSpecialist=${inputId}`)
}

// lay danh sach gio kham
const getAllExamination = () =>{
    return axios.get(`/api/examinationhours/getAll`)
}
// tao gio kham moi
const createNewExaminationHourUserService = (data) =>{
    return axios.post('/api/examinationhours/add',data);
}
const createNewPatient = (data) =>{ 
    // return axios.post('/api/create-new-user',data);
    return axios.post('/api/patient/add',data);
}
const deleteUserService = (userId) =>{
    return axios.delete('/api/delete-user',{
        data:{
            id: userId
        }
    })
}
const editUserService = (Inputdata) =>{
    return axios.put('api/edit-user',Inputdata)
}
// const getAllCodeService = (inputType)  =>{
//     // return axios.get(`/api/allcode?type=${inputType}`)
//     return axios.get(`/api/role//getAll?type=${inputType}`)

// }
const getAllCodeService = ()  =>{
    // return axios.get(`/api/allcode?type=${inputType}`)
    return axios.get(`/api/role//getAll`)

}
//lay hong toan bo thong tin bac si 
const getAllDoctors = () =>{
    // return axios.get(`/api/get-all-doctors`); 
    return axios.get(`/api/doctorinfo/getAllDoctor`);
}
//tao them thong tin bac si
const createDoctorInfo = (data) =>{ 
    return axios.post('/api/doctorinfo/add',data);
}
// lay thong tin chi tiet 1 benh nhan 
const getDetailPatient = (inputId) =>{
    return axios.get(`/api/patient/getSingle?idPatient=${inputId}`)
}
// lay thong tin chi tiet mot bac si
const getDetailInfoDoctor = (inputId) =>{
    return axios.get(`/api/doctorinfo/getDetailDoctor?idStaff=${inputId}`)
}
// lay bac si cua mot chuyen khoa
const getAllDoctorofSpecialty = (inputId) =>{
    return axios.get(`/api/doctorinfo/getDoctorSpecialist?idSpecialist=${inputId}`)
}
// tao gio kham cho tung bac si
const createDoctorTime = (data) =>{ 
    return axios.post('/api/doctorTime/add',data);
}
























const getTopDoctorHomeService = (limit) =>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const saveDetailDoctor = (data) =>{
    return axios.post('/api/save-info-doctor',data)
} 

// const getDetailInfoDoctor = (inputId) =>{
//     return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
// }

export { 
    handleLogin,getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctor,
    getDetailInfoDoctor,
    createNewPatient,
    handleLoginPatient ,
    createNewSpecialty,
    getAllSpecialist,
    getAllExamination,
    createNewExaminationHourUserService,
    createDoctorInfo,
    getDetailPatient,
    getAllDoctorofSpecialty,
    getDetailSpecialist,
    createDoctorTime


}