import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class ProductUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showUpdateModal} onClose={this.props.onClose} size="small">
                    <Modal.Header> Edit Product </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="ProductName" placeholder="Name" defaultValue={this.props.ProductName} onChange={this.props.onChange} />
                                <div style={{ color: "red" }}>
                                    {this.props.errors.ProductName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type="text" name="Price" placeholder='Price' defaultValue={this.props.Price} onChange={this.props.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.Price}
                                </div>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary >Cancel 
                        </Button>
                        <Button onClick={this.props.onUpdateSubmit} className="ui right labeled icon green button">Edit
                            <i className="check icon"></i>
                        </Button>

                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}