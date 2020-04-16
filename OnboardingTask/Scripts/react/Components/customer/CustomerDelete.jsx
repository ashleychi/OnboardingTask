import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';

export default class CustomerDelete extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onDeleteSubmit(id) {
        $.ajax({
            url: "/Customers/Delete",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ success: data })
                window.location.reload()
            }.bind(this)
        });
    }

    onClose() {
        this.setState({ isDeleteModal: false });
        window.location.reload()
    }

    render() {

        return (
            <React.Fragment>
                <Modal open={this.props.isDeleteModal} onClose={this.props.onClose} size='small'>
                    <Modal.Header>Delete Customer</Modal.Header>
                    <Modal.Content>
                        <h4>
                            Are you sure?
                        </h4>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose}  className="ui secondary button" >Cancel
                        </Button>                      
                        <button onClick={() => this.onDeleteSubmit(this.props.delete)} className="ui right labeled icon  red button">
                            <i className="x icon" ></i>
                            Delete
                        </button>
                        
                        
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}


