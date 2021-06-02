import * as React from 'react'
import { View ,Text} from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

const PdfReader = (props)=>{
    return (
      <PDFReader
        source={{
          base64:"data:application/pdf;base64,"+props.pdfStream,
        }}
      />
    )
}
export default PdfReader;

