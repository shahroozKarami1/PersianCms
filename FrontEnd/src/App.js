import React from 'react'
import "./generalStyles/custom.css"
import { Container, Row, Col } from "react-bootstrap"
import SideBar from "./components/sideBar/SideBar"
import Header from "./components/header/Header"
import  {useRoutes} from  "react-router-dom"
import  "./App.css"
import  routes  from  './Routes/routes'

export default function App() {

  let Router    =  useRoutes(routes)
 console.log(Router);
  return (

    <>
      <Container fluid>

        <Row>

          <Col lg={2}  md= {4}    sm =  {12}   style={{padding :  0}}>

            <SideBar></SideBar>

          </Col>

          <Col lg={10}    md  =  {6}   sm = {12}   >

            <div className='main-right__side'>

              <Header></Header>

             {Router}
            </div>


          </Col>


        </Row>



      </Container>







    </>
  )
}
