import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { BASE_URL } from "../../services/conf";

const initialState = {
    cliente_nombre: '',
    cliente_apellido: '',
    cliente_fecha_nacimiento: ''
};

export default function CreateCliente() {

    const navigate = useNavigate();
    const [cliente, setCliente] = useState(initialState);
    const [isDisabled, setIsDisabled] = useState(true);
    const [validationError, setValidationError] = useState({});

    useEffect(() => {
        const { cliente_nombre, cliente_apellido, cliente_fecha_nacimiento } = cliente;
        setIsDisabled(!(cliente_nombre && cliente_apellido && cliente_fecha_nacimiento));
    }, [cliente]);

    const crearCliente = async () => {
        await axios.post(`${BASE_URL}api/clientes`, cliente).then(({data}) => {
            Swal.fire({
                icon:"success",
                text:data.message
            })
            navigate('/');
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                Swal.fire({
                    text:response.data.message,
                    icon:"error"
                })
            }
        })
    }

    const handleChange = (value, nombre) => {
        setCliente({...cliente, [nombre]: value});
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Crear Cliente</h4>
                            <hr />
                            <div className="form-wrapper">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value])=>(
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="nombre">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" value={cliente.cliente_nombre} onChange={(event)=>{
                                                    handleChange(event.target.value, 'cliente_nombre')
                                                }}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="apellido">
                                                <Form.Label>Apellido</Form.Label>
                                                <Form.Control type="text" value={cliente.cliente_apellido} onChange={(event)=>{
                                                    handleChange(event.target.value, 'cliente_apellido')
                                                }}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="fecha_nacimiento">
                                                <Form.Label>Fecha Nacimiento</Form.Label>
                                                <Form.Control type="date" value={cliente.cliente_fecha_nacimiento} onChange={(event)=>{
                                                    handleChange(event.target.value, 'cliente_fecha_nacimiento')
                                                }}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button disabled={isDisabled} onClick={crearCliente} variant="primary" className="mt-3" size="lg" block="block" type="button">
                                        Guardar
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
