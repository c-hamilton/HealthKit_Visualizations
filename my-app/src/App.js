import React, { useState, useRef } from 'react';
import { useOnClickOutside } from './hooks/hooks';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';

import { Burger, Menu } from './components';

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

function App() {
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));

    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyles />
                <div ref={node}>
                    <Burger open={open} setOpen={setOpen} />
                    <Menu open={open} setOpen={setOpen} />
                </div>
                <div>
                    <h1>Hello. This is Health Kit Data Explorer</h1>
                    <Plots/>
                </div>
            </>
        </ThemeProvider>
    );
}
export default App;
