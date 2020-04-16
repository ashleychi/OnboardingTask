import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, } from 'semantic-ui-react';
import SaleDelete from './SaleDelete.jsx';
import SaleCreate from './SaleCreate.jsx';
import SaleUpdate from './SaleUpdate.jsx';


export class SaleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saleData: [],
            showDeleteModal: false,
            deleteId: 0,

            showCreateModal: false,

            SaleId: '',
            ProductName: '',
            StoreName: '',
            CustomerName: '',
            DateSold: '',

            showUpdateModal: false,
            updateId: 0,

          
            errors: {}
        };

        this.loadData = this.loadData.bind(this);
        this.DateConverter = this.DateConverter.bind(this);
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
    DateConverter(tempdate) {

        var converted = parseInt((tempdate.replace("/Date(", "").replace(")/", "")));

        var temp = new Date(converted);
        var formatedMonth = ("0" + (temp.getMonth() + 1)).slice(-2);
        var formatedDate = ("0" + temp.getDate()).slice(-2);
        var date = (temp.getFullYear() + "-" + formatedMonth + "-" + formatedDate);
        return date;

    }

    //Get Sales
    loadData() {

        $.ajax({
            url: "/Sales/GetSale",
            type: "GET",
            success: function (data) { this.setState({ saleData: data }) }.bind(this)
        });
    }

    //Delete    
    handleDelete(id) {

        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
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
            url: "/Sales/GetUpdateSale",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({
                    SaleId: data.SaleId,
                    CustomerName: data.CustomerName,
                    ProductName: data.ProductName,
                    StoreName: data.StoreName,
                    DateSold: this.DateConverter(data.DateSold)
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

        if (!this.state.DateSold ) {
           
            formIsValid = false;
            errors['DateSold'] = 'Please provide the sale date.' 
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onUpdateSubmit() {
        if (this.validateForm()) {
            let data = {
                'SaleId': this.state.SaleId,
                'ProductName': this.state.ProductName,
                'CustomerName': this.state.CustomerName,
                'StoreName': this.state.StoreName,
                'DateSold': this.state.DateSold
            };

            $.ajax({
                url: "/Sales/UpdateSale",
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
        if (this.state.saleData != "") {
            tableData = this.state.saleData.map(item =>
                <tr key={item.SaleId}>
                    <td>{item.CustomerName}</td>
                    <td>{item.ProductName}</td>
                    <td>{item.StoreName}</td>
                    <td>{this.DateConverter(item.DateSold)}</td>
                    <td>
                        <Button className="ui yellow button" onClick={this.showUpdateModal.bind(this, item.SaleId)} ><i className="edit icon"></i>EDIT</Button>
                    </td>

                    <td>
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, item.SaleId)} ><i className="trash icon"></i>DELETE</Button>
                    </td>

                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    <div><Button primary onClick={this.showCreateModal}>New Sale</Button></div>
                    <SaleCreate onChange={this.onChange} onClose={this.closeCreateModal} onCreateSubmit={this.onCreateSubmit} showCreateModal={this.state.showCreateModal} />

                </div>
                

                <div>
                    <SaleUpdate onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModal} onUpdateSubmit={this.onUpdateSubmit} showUpdateModal={this.state.showUpdateModal}
                        SaleId={this.state.SaleId} ProductName={this.state.ProductName} CustomerName={this.state.CustomerName} StoreName={this.state.StoreName} DateSold={this.state.DateSold}  errors={this.state.errors} />


                    <SaleDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />

                    
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Store</th>
                                <th>DateSold</th>
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
export default SaleTable;