import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, } from 'semantic-ui-react';
import StoreDelete from './StoreDelete.jsx';
import StoreCreate from './StoreCreate.jsx';
import StoreUpdate from './StoreUpdate.jsx';

export class StoreTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeData: [],

            isDeleteModal: false,
            deleteId: 0,

            showCreateModal: false,

            showUpdateModal: false,
            updateId: 0,

            StoreId: '',
            StoreName: '',
            StoreAddress: '',

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

    //Get stores
    loadData() {

        $.ajax({
            url: "/Stores/GetStore",
            type: "GET",
            success: function (data) { this.setState({ storeData: data }) }.bind(this)
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
            url: "/Stores/GetUpdateStore",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({
                    StoreId: data.StoreId,
                    StoreName: data.StoreName,
                    StoreAddress: data.StoreAddress
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
        if (!this.state.StoreName) {
            formIsValid = false;
            errors['StoreName'] = '*Please enter the Store Name.';
        }

        if (typeof this.state.StoreName !== "undefined") {
            if (!this.state.StoreName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["StoreName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.StoreAddress) {
            formIsValid = false;
            errors['StoreAddress'] = '*Please enter the Store Address'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onUpdateSubmit() {
        if (this.validateForm()) {

            let data = { 'StoreId': this.state.StoreId, 'StoreName': this.state.StoreName, 'StoreAddress': this.state.StoreAddress };
            $.ajax({
                url: "/Stores/UpdateStore",
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
        if (this.state.storeData != "") {
            tableData = this.state.storeData.map(item =>
                <tr key={item.StoreId}>
                    <td>{item.StoreName}</td>
                    <td>{item.StoreAddress}</td>

                    <td>
                        <Button className="ui yellow button" onClick={this.showUpdateModal.bind(this, item.StoreId)}><i className="edit icon"></i>EDIT</Button>
                    </td>

                    <td>
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, item.StoreId)}><i className="trash icon"></i>DELETE</Button>
                    </td>

                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    <div><Button primary onClick={this.showCreateModal}>New Store</Button></div>
                    <StoreCreate onChange={this.onChange} onClose={this.closeCreateModal} onCreateSubmit={this.onCreateSubmit} showCreateModal={this.state.showCreateModal} />

                </div>

                <div>
                    <StoreUpdate onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModal} onUpdateSubmit={this.onUpdateSubmit} showUpdateModal={this.state.showUpdateModal}
                        StoreId={this.state.StoreId} StoreName={this.state.StoreName} StoreAddress={this.state.StoreAddress} errors={this.state.errors} />

                    <StoreDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} isDeleteModal={this.state.isDeleteModal} />

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
export default StoreTable;