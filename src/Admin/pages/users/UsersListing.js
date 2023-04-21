import { Fragment } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import UsersCard from "./UsersCard";

const UsersListing = (props) => {

    const page = props.formData.page;
    const limit = props.formData.limit;
    
    return (
        <Row>
            <Col md={12}>
                <Card className="admintblcard p-2">
                    <Card.Body className="admintbl">
                        <Row className="justify-content-start">
                            <Col md={2}>
                                <Card.Title className="Grey">User listing</Card.Title>
                            </Col>
                            <Col md={2}>
                                <Link className="text-decoration-none Greylight">View All</Link>
                            </Col>
                        </Row>
                        <table className="table table-borderless ">
                            <thead className="F14 Greylight">
                                <tr className="ecom-tbl-tr">
                                    <th scope="col">S.No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Mobile No.</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Roles</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody className="F13 Greylight">

                                {
                                    props.userList && props.userList.length > 0 && props.userList.map((val, ind) => {
                                        return <UsersCard {...props} key={ind}
                                            sno={page * limit + ind + 1}
                                        />
                                    })
                                }
                              
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default UsersListing;