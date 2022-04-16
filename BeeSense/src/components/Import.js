import React, { useState, useEffect } from "react";
// import {Line} from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import DrawGraph from "./DrawGraph";
// ChartJS.register(...registerables);

// class Import extends React.Component {
//     constructor (props) {
//         super(props);
//         this.state = {
//             file: {},
//             array: [],
//         };
//     }

//     fileReader = new FileReader();

//     handleOnChange = (e) => {
//         // TODO
//         this.setState({
//             file: e.target.files[0]
//         });
//     }

//     csvFileToArray = (file) => {
//         const csvHeader = file.slice(0, file.indexOf('\n')).split(',');
//         const csvRows = file.slice(file.indexOf('\n') + 1).split('\n');

//         const newArray = csvRows.map(i => {
//             const values = i.split(',');
//             const obj = csvHeader.reduce((object, header, index) => {
//                 object[header] = values[index];
//                 return object;
//             }, {});
//             return obj;
//         });

//         this.setState({
//             array: newArray
//         })
//     }

//     handleOnSubmit = (e) => {
//         e.preventDefault()

//         console.log(this.file)

//         // this.fileReader.onload = (event) => {
//         //     const text = event.target.result;
//         //     this.csvFileToArray(text);
//         // }
//         // // console.log(this.state.array)
//         // this.fileReader.readAsText(this.file);
//     }

//     render () {
//         return (
//             <>
//                 <h3>Welcome! Import your csv</h3>
//                 <form>
//                     <div>
//                         <input type={"file"} id={"csvFileInput"} accept={".csv"} onChange={this.handleOnChange} />
//                     </div>
//                     <button onClick={(e) => {this.handleOnSubmit(e)}}>Upload your csv here</button>
//                 </form>
//             </>
//         );
//     };
// };


const Import = () => {
    const [file, setFile] = useState();
    const [headers, setHeaders] = useState([]);
    const [array, setArray] = useState([]);
    // const [submitted, setSubmitted] = useState(false);
    const [dataset, setDataset] = useState();
    const [currentHeader, setCurrentHeader] = useState('')

    useEffect(() => {
        if (headers.length) {
            const data = {};
            for (const header of headers) {
                data[header] = []
            }

            for (let i = 0; i < array.length - 1; i++) {
                // console.log(elem);
                for (const [key, value] of Object.entries(array[i])) {
                    // console.log(name);
                    if (key === 'Date') {
                        data[key].push(value)
                    }
                    else {
                        data[key].push(parseFloat(value));
                    }
                }
            }

            const index = headers.indexOf('Date');
            if (index > -1) {
                headers.splice(index, 1); // 2nd parameter means remove one item only
            }

            setDataset(data);
        }
    }, [headers]);
    

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        
        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });
        
        setArray(array);
        setHeaders(csvHeader);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };
            fileReader.readAsText(file);
        }
    };

    return (
        <>
            <h3>CSV VISUALISATION</h3>
            
            { dataset ?
                <>
                    <div className="dropdown">
                        <button className="dropbtn">Dropdown</button>
                        <div className="dropdown-content">
                            {/* <a onClick={() => { setCurrentHeader('Packet') }}>Packet</a>
                            <a onClick={ () => { setCurrentHeader('Temperature in F') }}>Packet</a> */}
                            { headers.map(header => {
                                return (
                                    <a key={ header } onClick={ () => { setCurrentHeader(header); } }>{ header }</a>
                                );
                            })}

                        </div>
                    </div>

                    <div>
                        <DrawGraph
                            dataset={ dataset }
                            name={ currentHeader }  
                        />
                    </div>
                    <div>
                        <button onClick={ () => { setDataset(null) } }>Upload A Different File</button>
                    </div>
                </>
                :
                <form>
                    <div>
                        <input
                            type={ "file" }
                            id={ "csvFileInput" }
                            accept={ ".csv" }
                            onChange={ handleOnChange } 
                        />
                    </div>

                    <button onClick={ (e) => { handleOnSubmit(e) } }>IMPORT CSV</button>
                </form>
            }
        </>
    );
};

export default Import;
