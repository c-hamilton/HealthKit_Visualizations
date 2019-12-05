import Axios from 'axios';

export function handlePlot1() {
    Axios.get("http://localhost:5000/plot1").then(resp => window.Bokeh.embed.embed_item(resp.data, 'testPlot'))
}

export function handlePlot2() {
    Axios.get("http://localhost:5000/plot2").then(resp => window.testPlot2 = window.Bokeh.embed.embed_item(resp.data, 'testPlot'))
}
