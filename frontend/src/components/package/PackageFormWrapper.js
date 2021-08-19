import React from 'react'
import PackageCreate from './PackageCreate'
import PackageUpdate from './PackageUpdate'
import SectionWrapper from '../../layout/SectionWrapper'
import CustomAccord from '../../layout/CustomAccord'
import "./style.css"

const pack_types = ["basic", "standard", "premium"]

const PackageFormWrapper = ({ packages, updateQuery }) => {
    console.log(packages)
    return (
        <SectionWrapper section_class="packages">
            <PackageItem
                packages={packages}
                pack_types={pack_types}
                activePackage={(activeIndex) => {
                    const active_pack = packages[activeIndex]
                    return (
                        <>
                            {packages
                                && packages.length > 0
                                && active_pack
                                ?
                                <PackageUpdate item={active_pack} updateQuery={updateQuery} />
                                :
                                <PackageCreate type={pack_types[activeIndex]} updateQuery={updateQuery} />}
                        </>
                    )
                }}
            />
        </SectionWrapper>
    )
}


const PackageItem = ({ pack_types, activePackage }) => {
    return (
        <>
            <div className="packageItem">
                {pack_types && pack_types.map((pack, i) => {
                    return (
                        <CustomAccord key={pack} eventKey={i + 1} item={{
                            title: `package: ${pack}`,
                            body: activePackage(i)
                        }} />
                    )
                })}

            </div>

        </>
    )
}

export default PackageFormWrapper
