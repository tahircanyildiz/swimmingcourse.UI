import React, { useEffect, useState } from 'react'
import CustomModal from './CustomModal';
import Tables from './Tables';
import toast from 'react-hot-toast';
import { get } from '../services/apiHandler';
import AddTeacher from '../components/TeacherTab/AddTeacher';
import UpdateTeacher from '../components/TeacherTab/UpdateTeacher';
import DeleteTeacher from '../components/TeacherTab/DeleteTeacher';

function TeacherTab() {


  const [data, setData] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [StudentAddModalVisible, setStudentAddModalVisible] = useState(false)
  const [StudentUpdateModalVisible, setStudentUpdateModalVisible] = useState(false)
  const [StudentDeleteModalVisible, setStudentDeleteModalVisible] = useState(false)

  const handleOpenCloseStudentAddModal = () => {
    StudentAddModalVisible ?
      setStudentAddModalVisible(false) : setStudentAddModalVisible(true);
  }

  const handleOpenCloseUpdateModal = (e) => {
    StudentUpdateModalVisible ?
      setStudentUpdateModalVisible(false) : setStudentUpdateModalVisible(true);
    setSelectedStudent(e.id)
  }

  const handleOpenCloseDeleteModal = (e) => {
    StudentDeleteModalVisible ?
      setStudentDeleteModalVisible(false) : setStudentDeleteModalVisible(true);
    setSelectedStudent(e)

  }

  useEffect(() => {
    get('/api/users/getonlyteachers').then(response => setData(response)).catch((error) => {
      toast.error('GET İstek sırasında bir sorun oluştu daha sonra tekrar deneyin.')
    });
  })




  return (
    <div className=' w-full p-6'>
      <Tables
      onDeletePress={(e) => handleOpenCloseDeleteModal(e)}
        onEditPress={(e) => handleOpenCloseUpdateModal(e)}
        onPress={() => handleOpenCloseStudentAddModal()}
        data={data}
      />
      <CustomModal visible={StudentAddModalVisible} setState={setStudentAddModalVisible}  >
        <AddTeacher />
      </CustomModal>
      <CustomModal visible={StudentUpdateModalVisible} setState={setStudentUpdateModalVisible} >
        <UpdateTeacher id={selectedStudent} />
      </CustomModal>
      <CustomModal visible={StudentDeleteModalVisible} setState={setStudentDeleteModalVisible} >
        <DeleteTeacher id={selectedStudent} />
      </CustomModal>
    </div>
  )
}

export default TeacherTab