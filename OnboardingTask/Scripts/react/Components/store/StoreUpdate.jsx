import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class StoreUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showUpdateModal} onClose={this.props.onClose} size="small">
                    <Modal.Header> Edit Store </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="StoreName" placeholder="Name" defaultValue={this.props.StoreName} onChange={this.props.onChange} />
                                <div style={{ color: "red" }}>
                                    {this.props.errors.StoreName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type="text" name="StoreAddress" placeholder='Address' defaultValue={this.props.StoreAddress} onChange={this.props.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.StoreAddress}
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