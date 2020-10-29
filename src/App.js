import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

const info = [
  {id: 1, personaje:'Monkey D. Luffy',anime:'One Piece'},
  {id: 2, personaje:'Uzumaki Naruto',anime:'Naruto'},
  {id: 3, personaje:'Yagami Light',anime:'Death Note'},
  {id: 4, personaje:'Sun Jinwoo',anime:'Solo Leveling'},
  {id: 5, personaje:'Goku',anime:'Dragon Ball Z'},
  {id: 6, personaje:'Goblin Slayer',anime:'Goblin Slayer'}
]


function App() {
  const [data,setData] = useState(info);
  const [form,setForm] = useState({
    id:'',
    personaje:'',
    anime:''
  });
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const handleModal = (e) =>{
    setModalInsertar(e);
  }
  const handleModalEdit = (e, registro={id:'', personaje:'', anime:''}) =>{
    setModalEditar(e);
    setForm(registro)
  }

  const handleInsert = ()=>{
    setData([...data,form])
  }
  const handleUpdate = (dato)=>{
    var contador=0;
    var lista = data;
    lista.map( registro =>{
      if(dato.id=== registro.id){
        lista[contador].personaje = dato.personaje;
        lista[contador].anime = dato.anime;
        
      }
      contador++;
    })
    setData(lista);
    handleModalEdit(false);
  }
  const handleEliminar = (dato)=>{
    Swal.fire({
      title: `Desea eliminar registro ${dato.id}?` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!'
   }).then((result) => {
      if(result.value){
        let contador =0;
        var lista = data;
        lista.map( registro =>{
          if(registro.id === dato.id){
            lista.splice(contador,1);
          }
          contador++;
        });
        setData([...lista]);
     }
   }) 
    

  }

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  return (
   <>
    <Container>
      <br/>

      <Button color='success' onClick={() => handleModal(true)}>Insertar Personaje</Button>
      <br/><br/>

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Personaje</th>
            <th>Anime</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map( personaje =>{
              return(
              <tr key={personaje.id}>
                  <td >{personaje.id}</td>
                  <td>{personaje.personaje}</td>
                  <td>{personaje.anime}</td>
                  <td>
                    <Button color='primary' onClick={() => handleModalEdit(true,personaje)}>Editar</Button>{" "}
                    <Button color='danger' onClick={()=>{handleEliminar(personaje)}}>Eliminar</Button>
                  </td>
              </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Container>

    <Modal isOpen={modalInsertar}>
      <ModalHeader>
        <div>
          <h3>Insertar Registro</h3>
        </div>
      </ModalHeader>
      <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type='text' value={data.length+1}></input>
          </FormGroup>
          <FormGroup>
            <label>Personaje:</label>
            <input className='form-control' name='personaje' type='text' onChange={handleChange}></input>
          </FormGroup>
          <FormGroup>
            <label>Anime:</label>
            <input className='form-control' name='anime' type='text' onChange={handleChange}></input>
          </FormGroup>

      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleInsert}>Insertar</Button>
        <Button color='danger' onClick={() => handleModal(false)}>Cancelar</Button>
      </ModalFooter>


    </Modal>

    <Modal isOpen={modalEditar}>
      <ModalHeader>
        <div>
          <h3>Insertar Registro</h3>
        </div>
      </ModalHeader>
      <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type='text' value={form.id}></input>
          </FormGroup>
          <FormGroup>
            <label>Personaje:</label>
            <input className='form-control' name='personaje' type='text' value={form.personaje} onChange={handleChange}></input>
          </FormGroup>
          <FormGroup>
            <label>Anime:</label>
            <input className='form-control' name='anime' type='text'value={form.anime} onChange={handleChange}></input>
          </FormGroup>

      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={()=>handleUpdate(form)}>Actualizar</Button>
        <Button color='danger' onClick={() => handleModalEdit(false)}>Cancelar</Button>
      </ModalFooter>


    </Modal>
   </>
  );
}

export default App;
