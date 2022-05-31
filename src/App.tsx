import { useEffect, useState } from 'react'
import './App.css'
import { renderUsers, createUser, deleteUser } from './api'
import Navbar from './components/Navbar/Navbar'
import {Users} from './types'
import UserTable from './components/UserTable/UserTable'
import ModalCreateUser from './components/Modal/Modal'


function App(): JSX.Element {
  
  const [userList, setUsers] = useState<Users[]>([] as Users[])
  
  useEffect(() => {
    renderUsers().then(users => setUsers(users))
  }, [])
  
  const [userCreateModal, setUserCreateModal] = useState<boolean>(false)
  
  const handleCreateUser = async (user: Omit<Users, "id">) => {
    const newUser = await createUser(user)
    setUsers(
      oldUserList => [...oldUserList, newUser]
      )
    }

    const handleDeleteUser = async (id: number) => {
      await deleteUser(id)
      setUsers(
        oldUserList => oldUserList.filter(user => user.id !== id)
      )
    }
    
    const handleOpenCreateUserModal = () => {
      setUserCreateModal(true)
    }
    
    const handleCloseCreateUserModal = () => {
      setUserCreateModal(false)
    }
    
  return (
    <>
      <Navbar onClick={handleOpenCreateUserModal}/>
      <UserTable users={userList}
                 onDelete={handleDeleteUser}/>
      <ModalCreateUser 
      show={userCreateModal}
      createUser={handleCreateUser}
      onHide={handleCloseCreateUserModal}
      />
    </>
  )
}

export default App
