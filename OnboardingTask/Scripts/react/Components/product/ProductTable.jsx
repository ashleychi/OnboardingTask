import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, } from 'semantic-ui-react';
import ProductDelete from './ProductDelete.jsx';
import ProductCreate from './ProductCreate.jsx';
import ProductUpdate from './ProductUpdate.jsx';
import { number } from 'prop-types';

export class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: [],

            isDeleteModal: false,
            deleteId: 0,

            showCreateModal: false,

            showUpdateModel: false,
            updateId: 0,

            ProductId: '',
            ProductName: '',
            Price: '',

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

    //Get products
    loadData() {

        $.ajax({
            url: "/Products/GetProduct",
            type: "GET",
            success: function (data) { this.setState({ productData: data }) }.bind(this)
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
            url: "/Products/GetUpdateProduct",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({
                    ProductId: data.ProductId,
                    ProductName: data.ProductName,
                    Price: data.Price
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
        if (!this.state.ProductName) {
            formIsValid = false;
            errors['ProductName'] = 'Please enter the Product Name.';
        }

        if (typeof this.state.ProductName !== "undefined") {
            if (!this.state.ProductName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["ProductName"] = "Please enter alphabet characters only.";
            }
        }

        if (!this.state.Price) {
            formIsValid = false;
            errors['Price'] = 'Please enter the Product Price'
        }
        if (typeof this.state.Price !== "undefined") {
            var stringNumber = (this.state.Price).toString();
            if (!stringNumber.match(/^\d+(\.\d{1,2})?$/)) {
                formIsValid = false;
            errors["Price"] = "Please enter numbers only." ;
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }


    onUpdateSubmit() {
        if (this.validateForm()) {

            let data = { 'ProductId': this.state.ProductId, 'ProductName': this.state.ProductName, 'Price': this.state.Price };
            $.ajax({
                url: "/Products/UpdateProduct",
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
        if (this.state.productData!= "") {
            tableData = this.state.productData.map(item =>
                <tr key={item.ProductId}>
                    <td>{item.ProductName}</td>
                    <td>${item.Price}</td>

                    <td>
                        <Button className="ui yellow button" onClick={this.showUpdateModal.bind(this, item.ProductId)}><i className="edit icon"></i>EDIT</Button>
                    </td>

                    <td>
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, item.ProductId)}><i className="trash icon"></i>DELETE</Button>
                    </td>


                </tr>
            )           
        }
        return (
            <React.Fragment>
                <div>
                    <div><Button primary onClick={this.showCreateModal}>New Product</Button></div>
                    <ProductCreate onChange={this.onChange} onClose={this.closeCreateModal} onCreateSubmit={this.onCreateSubmit} showCreateModal={this.state.showCreateModal} />

                </div>             
                <div>
                    
                    <ProductUpdate onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModal} onUpdateSubmit={this.onUpdateSubmit} showUpdateModal={this.state.showUpdateModal}
                        ProductId={this.state.ProductId} ProductName={this.state.ProductName} Price={this.state.Price} errors={this.state.errors} />


                    <ProductDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} isDeleteModal={this.state.isDeleteModal} />


                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
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
export default ProductTable;