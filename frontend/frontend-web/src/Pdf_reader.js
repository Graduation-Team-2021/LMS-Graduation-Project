import React, { useState, Component } from 'react';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

// import samplePDF from './projectdatabase.pdf';

// export default function Test() {
//   const [numPages, setNumPages] = useState(null);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <Document
//       file={samplePDF}
//       onLoadSuccess={onDocumentLoadSuccess}
//     >
//       {Array.from(
//         new Array(numPages),
//         (el, index) => (
//           <Page
//             key={`page_${index + 1}`}
//             pageNumber={index + 1}
//           />
//         ),
//       )}
//     </Document>
//   );
// }

// import PDFReader from "react-pdf-reader";
// import "react-pdf-reader/dist/TextLayerBuilder.css";
// import "react-pdf-reader/dist/PdfReader.css";


// import { Worker ,  Viewer } from '@react-pdf-viewer/core';
// // import pdf1 from "https://www.cambridgeenglish.org/images/young-learners-sample-papers-2018-vol1.pdf";
// import '@react-pdf-viewer/core/lib/styles/index.css';
// //import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';

// // Import styles
// import '@react-pdf-viewer/full-screen/lib/styles/index.css';
// ////import { toolbarPlugin , ToolbarPluginProps } from '@react-pdf-viewer/toolbar';
// //import { OpenFile, Viewer } from '@react-pdf-viewer/core';

// // Import styles
// import '@react-pdf-viewer/toolbar/lib/styles/index.css';

// const defaultLayoutPluginInstance = defaultLayoutPlugin();
// const pdf =()=>{
//   render() {
//     return (
// {/* <PDFReader
//     file="C:\Users\ibrahim shoukry\Desktop\first_try_hema\src\componets\Pdf_reader\projectdatabase.pdf"
//     renderType="canvas"
// />)
//   } */)}
// }}
//const fullScreenPluginInstance = fullScreenPlugin();
// const toolbarPluginInstance = toolbarPlugin(
//   getFilePlugin = {
//   fileNameGenerator: (file : OpenFile) => {
//       // `file.name` is the URL of opened file
//       const fileName = file.name.substring(file.name.lastIndexOf('/') + 1);
//       return `a-copy-of-${fileName}`;
//   }
// },
// searchPlugin = {
//   keyword: 'PDF'
// },
// selectionModePlugin = {
//   selectionMode: SelectionMode.Hand
// },
// );
// const { Toolbar } = toolbarPluginInstance;
//   return(
//     <div
//             style={{
//                 border: '1px solid rgba(0, 0, 0, 0.3)',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 height: '100%',
//             }}
//         >
//             <div
//                 style={{
//                     alignItems: 'center',
//                     backgroundColor: '#eeeeee',
//                     borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
//                     display: 'flex',
//                     padding: '4px',
//                 }}
//             >
//                 <Toolbar />
//             </div>
//             <div
//                 style={{
//                     flex: 1,
//                     overflow: 'hidden',
//                 }}
//             >
//                 <Viewer
//                     fileUrl='https://fathomless-chamber-20173.herokuapp.com/https://www.cambridgeenglish.org/images/young-learners-sample-papers-2018-vol1.pdf'
//                     plugins={[
//                         toolbarPluginInstance,
//                     ]}
//                 />
//             </div>
//         </div>
//     );
// };

//     <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//       {/* <Viewer fileUrl="./projectdatabase.pdf" /> */}
//       <div
//     style={{
//         border: '1px solid rgba(0, 0, 0, 0.3)',
//         height: '750px',
//     }}
// >
//     <Viewer fileUrl="https://fathomless-chamber-20173.herokuapp.com/https://www.cambridgeenglish.org/images/young-learners-sample-papers-2018-vol1.pdf"
//       plugins={[
//       //Register plugins,
//       fullScreenPluginInstance,
//       toolbarPluginInstance,
//       ]}
//     />
// </div>
//     </Worker>
//   )
// }

//import React from 'react'

//import PDFViewer from 'pdf-viewer-reactjs'
// import PDFViewer from 'pdf-viewer-reactjs-bulma-wrapped';
// import 'bulma/css/bulma.css'
// import 'bulma-helpers/css/bulma-helpers.min.css'
// const pdf = (props) => {
//     return (
//         <PDFViewer
//             document={{
//                 url: 'https://fathomless-chamber-20173.herokuapp.com/https://www.cambridgeenglish.org/images/young-learners-sample-papers-2018-vol1.pdf',
//             }}
//         />
//     )
// }

const pdf = () => {
  return (
    <div>
      <iframe 
      src="https://www.cambridgeenglish.org/images/young-learners-sample-papers-2018-vol1.pdf"
        frameborder="0"
        height="1200px"
        width="100%"
        allowfullscreen = 'true'
        >

      </iframe>
    </div>
  )
}



export default pdf;