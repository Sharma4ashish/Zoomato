import DataUriParser from "datauri/parser";
import path from "path"


const getBuffer = (file:any)=>{
    const parser = new DataUriParser()

    const extName = path.extname(file.orignalname).toString()

    return parser.format(extName,file.buffer);

}

export default getBuffer;