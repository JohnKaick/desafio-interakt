import React from 'react'
import DeliveryComponent from './DeliveryComponent'

class DeliveryContainer extends React.Component {

    state = {
        ...this.props,
        productsInsert: []
    }

    onChange = (e, m) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    onChangeCarrier = (value, e) => {
        this.setState({
            carrier: value
        })
    }

    onChangeProduct = (value, e) => {
        const { productsInsert } = this.state
        let newProducts = productsInsert
        newProducts.push(value)
        this.setState({
            productsInsert: newProducts
        })
    }

    onInsert = async (form) => {
        const { address, carrier, date, productsInsert, description } = this.state
        await this.props.insert({
            variables: {
                input: {
                    address,
                    carrier,
                    date,
                    products: productsInsert,
                    description
                }
            }
        }).then(() => {
            this.setState({
                address: '',
                carrier: null,
                date: '',
                productsInsert: [],
                description: ''
            })
        })
    }

    onEdit = async (delivery) => {
        await this.props.edit({
            variables: {
                input: {
                    _id: delivery._id,
                    address: delivery.address,
                    carrier: delivery.carrier,
                    date: delivery.date,
                    products: delivery.products,
                    description: delivery.description,
                }
            }
        })
    }

    onDelete = async (id) => {
        await this.props.delete({
            variables: {
                input: {
                    _id: id,
                }
            }
        })
    }

    render() {
        return (
            <DeliveryComponent
                {...this.props}
                {...this.state}
                deliveries={this.props.deliveries}
                products={this.props.products}
                carriers={this.props.carriers}
                onChange={this.onChange}
                onChangeDate={this.onChangeDate}
                onChangeCarrier={this.onChangeCarrier}
                onChangeProduct={this.onChangeProduct}
                onInsert={this.onInsert}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
            />
        )
    }
}

export default DeliveryContainer
