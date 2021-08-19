import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import GigContext from '../../context/Gig-context';
import useForm from '../../custom_hooks/useForm';
import GigGrid from './GigGrid';

const init = {
    selected_package_type: null,
    selected_fabricId: null,
    fabric: null,
    selected_shipping: null
}

const GigSelect = () => {
    const { push } = useHistory();
    const { gig } = useContext(GigContext);
    console.log(gig)
    const { item, packages, shipping_options } = gig;
    const { inputs, setInputs, handleSubmit } = useForm(init, onSubmit);
    const { selected_package_type, selected_fabricId, selected_shipping } = inputs;

    useEffect(() => {
        if (packages && shipping_options) {
            console.log(packages)
            setInputs({
                selected_package_type: packages.find(pack => pack.type === "basic").type,
                selected_fabricId: packages.find(pack => pack.type === "basic").fabrics[0]._id,
                selected_shipping: shipping_options[0]
            })
        }
    }, [gig])

    const handlePackage = ({ target }) => {
        const { value, name } = target;
        // clear fabric selection on package change
        setInputs({
            ...inputs,
            selected_fabricId: null,

            [name]: value
        })
    }

    const handleFabric = (fabric) => {
        console.log(fabric)
        setInputs({
            ...inputs,
            selected_fabricId: fabric._id,
            fabric
        })
    }

    console.log(packages)

    function onSubmit() {
        push({
            pathname: `/order-create/${item._id}/`, state: {
                item,
                orderInput: {
                    itemId: item._id,
                    packageId: packages.find(pack => pack.type === selected_package_type)._id,
                    fabricId: selected_fabricId,
                    shippingId: shipping_options[0]._id
                },
                orderOptions: {
                    packages,
                    shipping_options
                },
                package: packages.find(pack => pack.type === selected_package_type),
            }
        })
    }

    if (!item) return <div>load</div>;

    return <GigGrid
        item={item}
        handleFabric={handleFabric}
        handlePackage={handlePackage}
        selected_fabricId={selected_fabricId}
        selected_package_type={selected_package_type}
        selected_shipping={selected_shipping}
        packages={packages}
        onSubmit={handleSubmit}
    />
}

export default GigSelect
