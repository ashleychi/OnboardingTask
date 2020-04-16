import React from "react"
import ReactDOM from "react-dom"
import { Modal, Button, Form } from "semantic-ui-react"

export default class StoreCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },
            StoreName: '',
            StoreAddress: '',

            errors: {}
        }

        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.StoreName) {
            formIsValid = false;
            errors['StoreName'] = 'Please enter the Store Name.';
        }

        if (typeof this.state.StoreName !== "undefined") {
            if (!this.state.StoreName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["StoreName"] = "Please enter alphabet characters only.";
            }
        }

        if (!this.state.StoreAddress) {
            formIsValid = false;
            errors['StoreAddress'] = 'Please enter the Store Address'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onCreateSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let data = { 'StoreName': this.state.StoreName, 'StoreAddress': this.state.StoreAddress };

            $.ajax({
                url: "/Stores/CreateStore",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })

                    window.location.reload()
                }.bind(this)
            });
        }
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }



    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showCreateModal} onClose={this.props.onClose} size='small'>
                    <Modal.Header> Create Store </Modal.Header>
                    <Modal.Content>
                        <Form className="ui form segment">
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="StoreName" placeholder='Name' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.StoreName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type="text" name="StoreAddress" placeholder='Address' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.StoreAddress}
                                </div>
                            </Form.Field>
                        </Form>

                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} className="ui secondary button"  >Cancel
                        </Button>
                        <Button onClick={this.onCreateSubmit} className="ui right labeled icon green button">Create
                        <i className="check icon"></i>
                        </Button>

                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}
