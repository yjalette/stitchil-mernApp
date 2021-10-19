import React from 'react'
import { Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import ListingNew from '../../components/listing/ListingNew'
import dateHelper from '../../helpers/dateHelper'
import BoxWrapper from '../../layout/BoxWrapper'

const DashboardTableGigs = ({ gigs }) => {
    const { push } = useHistory()
    return (
        <div>
            <BoxWrapper mod_class="dashboardTable">
                <Table
                    striped
                    borderless
                    hover
                    responsive="md"
                    size="sm"
                    variant="dark"
                    className="dashboardTable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {gigs &&
                            gigs.length > 0 &&
                            gigs.map((gig, i) => {
                                if (!gig.details) return null
                                return (
                                    <tr key={gig._id}>
                                        <td
                                            className="clickElem"
                                            onClick={() => push(`/details/${gig.details._id}/`)}>
                                            {gig.details.title}
                                        </td>
                                        <td>{!gig.active ? "draft" : "active"}</td>
                                        <td>{dateHelper(gig.createdAt)}</td>
                                        <td
                                            className="clickElem"
                                            onClick={() => push(`/listing/draft/type-make/${gig._id}/`)}>
                                            edit
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
                <ListingNew listingType="make" />
            </BoxWrapper>
        </div>
    )
}

export default DashboardTableGigs
