import React, {useEffect} from 'react';
import {string} from 'prop-types';
import {StyledActivity} from './Activity.styled';
import Axios from "axios";

function handlePlot1() {
    Axios.get("http://localhost:5000/plot1").then(resp => window.Bokeh.embed.embed_item(resp.data, 'plot1'))
}

const Activity = ({page, open}) => {
    useEffect(() => {
        handlePlot1();
    }, [page]);

    console.log(open);
    return (
        <StyledActivity open={open}>
            <h2>Activity Summary</h2>
            <div id='plot1' className="bk-root"></div>
        </StyledActivity>
    )
};

Activity.propTypes = {
    page: string.isRequired,
};

export default Activity;