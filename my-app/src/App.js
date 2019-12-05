import React, {useState, useRef, useEffect} from 'react';
import {useOnClickOutside} from './hooks/hooks';
import {ThemeProvider} from 'styled-components';
import {GlobalStyles} from './global';
import {theme} from './theme';

import {Burger, Menu, Activity} from './components';
import {handlePlot1, handlePlot2} from './PlotGetter';

function Plots() {
    return (
        <div>
            <button variant="contained" style={{margin: 10}} color="primary" onClick={handlePlot1}>
                Get Plot 1
            </button>
            <button variant="contained" style={{margin: 10}} color="primary" onClick={handlePlot2}>
                Get Plot 2
            </button>
            <div id='testPlot' className="bk-root"></div>
        </div>
    );
}

function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

function PageSelector({page, open}) {
    // Here we need to do a check against the previous version of the props
    // https://usehooks.com/usePrevious/
    if (page === "Activity") {
        return <Activity page={page} open={open}/>;
    } else if (page === "Heart") {
        return (<div> This is the Heart Page</div>);
    }
    return <LandingPage/>;
}

function LandingPage() {
    return (
        <div>
            <h1>Hello. This is Health Kit Data Explorer</h1>
            <h2>Todo create a way for uploading files here.</h2>
            <Plots/>
        </div>
    );

}

function App() {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState("Default");
    const node = useRef();

    useOnClickOutside(node, () => setOpen(false));

    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyles/>
                <div ref={node}>
                    <Burger open={open} setOpen={setOpen}/>
                    <Menu open={open} setOpen={setOpen} page={page} setPage={setPage}/>
                </div>
                <div>
                    <PageSelector page={page} open={open}/>
                </div>
            </>
        </ThemeProvider>
    );
}

export default App;
