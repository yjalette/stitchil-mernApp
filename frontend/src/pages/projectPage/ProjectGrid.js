import React from 'react'
import { useContext } from 'react'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import OrderSummary from '../../components/order/OrderSummary'
import OrderContext from '../../context/Order-context'
import CustomAccord from '../../layout/CustomAccord'
import CustomDropdown from '../../layout/CustomDropdown'
import SectionHeader from '../../layout/SectionHeader'

const menu_btn = (item) => <DropdownItem key={item}>{item}</DropdownItem>

const ProjectGrid = () => {
    const { order } = useContext(OrderContext)

    return (
        <div className="projectGrid">
            <SectionHeader title={order.item.title}>
                <CustomDropdown
                    menu_align="left"
                    btn_class="fas fa-bars btn-icon-plain"
                    items={["revision", "dispute", "finish"]}
                    dropdown_item={(item) => menu_btn(item)}
                />
            </SectionHeader>
            <CustomAccord item={{
                title: "Order summary",
                body: <OrderSummary {...order} />,
            }}
                eventKey={1}
            />

        </div>
    )
}

export default ProjectGrid
