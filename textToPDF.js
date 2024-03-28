import {getDocument} from 'pdfjs-dist' 

export default async function extractingTextFromPDF(pdfPath){

try{
    const uint8Array = new Uint8Array(pdfPath)
    const pdf = await getDocument(uint8Array).promise;
    let fullText = '';
    let promises = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++){
        promises.push(
            pdf.getPage(pageNum).then(page=>
                page.getTextContent()).then(textContent=>{
                    fullText += textContent.items.map(
                        item=> item.str
                    ).join('')+ '';
                }).catch(error =>{
                    console.error('Error extracting text',pageNum,error)
                })
        )
    }
await Promise.all(promises);
    return fullText.trim();
}catch(error){
    console.error('Error loading PDF', error);
    throw error;
}

}







