import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class SaleUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },

            CustomerDropdownList: [],
            ProductDropdownList: [],
            StoreDropdownList: [],

        };

        this.onClose = this.onClose.bind(this);

        this.CustomersDropdown = this.CustomersDropdown.bind(this);
        this.ProductsDropdown = this.ProductsDropdown.bind(this);
        this.StoresDropdown = this.StoresDropdown.bind(this);
       
    }

    componentDidMount() {
        this.CustomersDropdown();
        this.ProductsDropdown();
        this.StoresDropdown();
    }

    onClose() {
        this.setState({ showUpdateModal: false });
        window.location.reload()
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
                this.setState({ StoreDropdownList: data })
            }.bind(this)
        });

    }


    
    render() {
        let CustomerDataList = [].concat(this.state.CustomerDropdownList)
        let ProductDataList = [].concat(this.state.ProductDropdownList)
        let StoreDataList = [].concat(this.state.StoreDropdownList)
        
        return (
            <React.Fragment>
                <Modal open={this.props.showUpdateModal} onClose={this.props.onClose} size='small'>
                    <Modal.Header> Edit Sales </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Customer Name</label>
                                <select name="CustomerName" onChange={this.props.onChange}>
                                    {CustomerDataList.map((x) => {
                                        if (x.CustomerName == this.props.CustomerName) {
                                            return (<option key={x.CustomerId} value={x.CustomerName} selected>{x.CustomerName}</option>)
                                        }
                                        else {
                                            return (<option key={x.CustomerId} value={x.CustomerName}>{x.CustomerName}</option>)
                                        }
                                    })}
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.CustomerName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Product Name</label>
                                <select name="ProductName" onChange={this.props.onChange}>
                                    {ProductDataList.map((x) => {
                                        if (x.ProductName == this.props.ProductName) {
                                            return (<option key={x.ProductId} value={x.ProductName} selected>{x.ProductName}</option>)
                                        }
                                        else {
                                            return (<option key={x.ProductId} value={x.ProductName}>{x.ProductName}</option>)
                                        }
                                    })}
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.ProductName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Store Name</label>
                                <select name="StoreName"  onChange={this.props.onChange}>
                                    {StoreDataList.map((x) => {
                                        if (x.StoreName == this.props.StoreName) {
                                            return (<option key={x.StoreId} value={x.StoreName} selected>{x.StoreName}</option>)
                                        }
                                        else {
                                            return (<option key={x.StoreId} value={x.StoreName}>{x.StoreName}</option>)
                                        }
                                    })}
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.StoreName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Date Sold</label>
                                <input type="date" name="DateSold" defaultValue={this.props.DateSold} onChange={this.props.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.DateSold}
                                </div>
                            </Form.Field>
                            
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} className="ui secondary button" >Cancel
                        </Button>
                        <Button onClick={this.props.onUpdateSubmit} className="ui right labeled icon  red button">Edit
                        <i className="check icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}