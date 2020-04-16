import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, } from 'semantic-ui-react';
import CustomerDelete from './CustomerDelete.jsx';
import CustomerCreate from './CustomerCreate.jsx';
import CustomerUpdate from './CustomerUpdate.jsx';

export class CustomerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerData: [],

            isDeleteModal: false,
            deleteId: 0,

            showCreateModal: false,

            showUpdateModel: false,
            updateId: 0,

            CustomerId: '',
            CustomerName: '',
            CustomerAddress: '',

            Success: [],
            errors: {}
        };

        this.loadData = this.loadData.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);

        this.showCreateModal = this.showCreateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);

        this.onChange = this.onChange.bind(this);
        this.showUpdateModal = this.showUpdateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);

    }

    componentDidMount() {
        this.loadData();
    }

    //Get customers
    loadData() {

        $.ajax({
            url: "/Customers/GetCustomer",
            type: "GET",
            success: function (data) { this.setState({ customerData: data }) }.bind(this)
        });
    }

    //Delete    
    handleDelete(id) {
        this.setState({ isDeleteModal: true });
        this.setState({ deleteId: id });
    }

    closeDeleteModal() {
        this.setState({ isDeleteModal: false });
        window.location.reload()
    }
    //Create
    showCreateModal() {
        this.setState({ showCreateModal: true });
    }

    closeCreateModal() {
        this.setState({ showCreateModal: false });
        window.location.reload()
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    //Update
    showUpdateModal(id) {
        this.setState({ showUpdateModal: true });
        this.setState({ updateId: id });

        $.ajax({
            url: "/Customers/GetUpdateCustomer",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({
                    CustomerId: data.CustomerId,
                    CustomerName: data.CustomerName,
                    CustomerAddress: data.CustomerAddress
                })
            }.bind(this)
        });
    }

    closeUpdateModal() {
        this.setState({ showUpdateModal: false });
        window.location.reload()
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.CustomerName) {
            formIsValid = false;
            errors['CustomerName'] = 'Please enter the Customer Name.';
        }

        if (typeof this.state.CustomerName !== "undefined") {
            if (!this.state.CustomerName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["CustomerName"] = "Please enter alphabet characters only.";
            }
        }

        if (!this.state.CustomerAddress) {
            formIsValid = false;
            errors['CustomerAddress'] = 'Please enter the Customer Address'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onUpdateSubmit() {
        if (this.validateForm()) {

            let data = { 'CustomerId': this.state.CustomerId, 'CustomerName': this.state.CustomerName, 'CustomerAddress': this.state.CustomerAddress };
            $.ajax({
                url: "/Customers/UpdateCustomer",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })
                    window.location.reload()
                }.bind(this)
            });
        }
    }


    render() {
        let tableData = null;
        if (this.state.customerData!= "") {
            tableData = this.state.customerData.map(item =>
                <tr key={item.CustomerId}>
                    <td>{item.CustomerName}</td>
                    <td>{item.CustomerAddress}</td>

                    <td>
                        <Button className="ui yellow button" onClick={this.showUpdateModal.bind(this, item.CustomerId)}><i className="edit icon"></i>EDIT</Button>
                    </td>

                    <td>
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, item.CustomerId)}><i className="trash icon"></i>DELETE</Button>
                    </td>

                </tr>
            )           
        }
        return (
            <React.Fragment>
                <div>
                    <div><Button primary onClick={this.showCreateModal}>New Customer</Button></div>
                    <CustomerCreate onChange={this.onChange} onClose={this.closeCreateModal} onCreateSubmit={this.onCreateSubmit} showCreateModal={this.state.showCreateModal} />

                </div>
               
                <div>
                    <CustomerUpdate  onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModal} onUpdateSubmit={this.onUpdateSubmit} showUpdateModal={this.state.showUpdateModal}
                        CustomerId={this.state.CustomerId} CustomerName={this.state.CustomerName} CustomerAddress={this.state.CustomerAddress} errors={this.state.errors} />

                    <CustomerDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} isDeleteModal={this.state.isDeleteModal} />

                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}
export default CustomerTable;