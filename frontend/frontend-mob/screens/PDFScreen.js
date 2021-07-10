import * as React from 'react'
import { View ,Text} from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import { materialUri } from "../Interface/Interface";


const PdfReader = (props)=>{
    const pdfId = props.navigation.state.params.pdfId
    const [pdfUri,setPdfUri] = React.useState("")
    React.useEffect(()=>{
      materialUri(pdfId).then((res) => {
          setPdfUri(res)
      });
    },[])
    return (
      <PDFReader
        source={{
          uri:"http://192.168.1.68:5000"+pdfUri,
        }}
      />
    )
}
export default PdfReader;