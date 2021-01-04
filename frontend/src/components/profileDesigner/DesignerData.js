import React, { useEffect } from 'react';

import './style.css'

import DesignerSum from './DesignerSum';
import useGetData from '../../custom_hooks/useGetData';

const DesignerData = ({ portfolioId }) => {
    const { getData, data } = useGetData("designerResume");

    useEffect(() => {
        if (portfolioId) getData({ variables: { portfolioId } })
    }, [portfolioId]);

    return <DesignerSum values={data && data.designerResume} />
}

export default DesignerData;


