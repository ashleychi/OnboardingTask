import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class SaleCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },

            CustomerName: '',
            ProductName: '',
            StoreName: '',
            DateSold: '',

            CustomerDropdownList: [],
            ProductDropdownList: [],
            StoresDropdownList: [],

            Success: [],
            errors: {}
        };

        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);

        this.CustomersDropdown = this.CustomersDropdown.bind(this);
        this.ProductsDropdown = this.ProductsDropdown.bind(this);
        this.StoresDropdown = this.StoresDropdown.bind(this);
    }

    componentDidMount() {
        this.CustomersDropdown();
        this.ProductsDropdown();
        this.StoresDropdown();
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.CustomerName) {
            formIsValid = false;
            errors['CustomerName'] = 'Please select the Customer.';
        }

        if (!this.state.ProductName) {
            formIsValid = false;
            errors['ProductName'] = 'Please select the Product.'
        }

        if (!this.state.StoreName) {
            formIsValid = false;
            errors['StoreName'] = 'Please select the Store.'
        }

        if (!this.state.DateSold) {
            formIsValid = false;
            errors['DateSold'] = 'Please provide the sale date.'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onCreateSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {


            let data = {
                'CustomerName': this.state.CustomerName,
                'ProductName': this.state.ProductName,
                'StoreName': this.state.StoreName,
                'DateSold': this.state.DateSold
            };

            $.ajax({
                url: "/Sales/CreateSale",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })

                    window.location.reload()
                }.bind(this)
            });
        }
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    CustomersDropdown() {
        $.ajax({
            url: "/Sales/GetCustomer",
            type: "GET",
            success: function (data) {
                this.setState({ CustomerDropdownList: data })
            }.bind(this)
        });
    }

    ProductsDropdown() {
        $.ajax({
            url: "/Sales/GetProduct",
            type: "GET",
            success: function (data) {
                this.setState({ ProductDropdownList: data })
            }.bind(this)
        });
    }

    StoresDropdown() {
        $.ajax({
            url: "/Sales/GetStore",
            type: "GET",
            success: function (data) {
                this.setState({ StoresDropdownList: data })
            }.bind(this)
        });
    }

    render() {
        let CustomerDataList = [{ CustomerId: '', CustomerName: 'Select  Customer' }].concat(this.state.CustomerDropdownList)
        let ProductDataList = [{ ProductId: '', ProductName: 'Select Product' }].concat(this.state.ProductDropdownList)
        let StoreDataList = [{ StoreId: '', StoreName: 'Select Store' }].concat(this.state.StoresDropdownList)

        return (
            <React.Fragment>
                <Modal open={this.props.showCreateModal} onClose={this.props.onClose} size='small'>
                    <Modal.Header> Create Sales </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Date Sold</label>
                                <input type="date" name="DateSold"  onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.DateSold}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Customer Name</label>
                                <select name="CustomerName" onChange={this.onChange} value={this.state.CustomerName}>
                                    {CustomerDataList.map((x) => <option key={x.CustomerId} value={x.CustomerName}>{x.CustomerName}</option>)}
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.CustomerId}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Product Name</label>
                                <select name="ProductName" onChange={this.onChange} value={this.state.ProductName}>
                                    {ProductDataList.map((x) => <option key={x.ProductId} value={x.ProductName}>{x.ProductName}</option>)}
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.ProductName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Store Name</label>
                                <select name="StoreName" onChange={this.onChange} value={this.state.StoreName}>
                                    {StoreDataList.map((x) => <option key={x.StoreId} value={x.StoreName}>{x.StoreName}</option>)}
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.StoreName}
                                </div>
                            </Form.Field>
                            
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} className="ui secondary button" >Cancel
                        </Button>
                        <Button onClick={this.onCreateSubmit} className="ui right labeled icon  red button">Create
                        <i className="check icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}