const dropArea = document.querySelector(".drop-area");
const drapText = dropArea.querySelector("h1");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector('#input-file');
let files;
let ids;

button.addEventListener("click", (e) => {
    input.click();
});

input.addEventListener("change", (e) => {
    files = input.files;
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
});

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    drapText.textContent = "Suelta para subir los documentos";
});

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    drapText.textContent = "Arrastra y suelta documentos";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active");
    drapText.textContent = "Arrastra y suelta documentos";
});

function showFiles(files) {
    if (files.length == undefined) {
        processFile(files);
    } else {
        for (const file of files){
            processFile(file);
        }
    }
}

function processFile(file) {
    const docType = file.type;
    const validExtensions = ['application/pdf'];

    if (ids == undefined) {
        ids = [];
    }

    if (validExtensions.includes(docType)) {
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;
        //const id = Math.floor(Math.random() * 1000000);
        ids.push(id);

        fileReader.addEventListener('load', e => {
            const fileInfo = {
                originalname: file.name,
                mimetype: file.type,
                buffer: e.target.result,
                size: file.size
            }

            const imageContainer = document.createElement('div');
            imageContainer.id = id;
            imageContainer.className = "file-container";
            imageContainer.style.marginBottom = "5px";
            imageContainer.style.marginTop = "5px";

            const statusDiv = document.createElement('div');
            statusDiv.className = "status";

            const fileNameSpan = document.createElement('span');
            fileNameSpan.textContent = file.name;

            const statusTextSpan = document.createElement('span');
            statusTextSpan.className = "status-text";
            statusTextSpan.textContent = "Cargando...";

            statusDiv.appendChild(fileNameSpan);
            statusDiv.appendChild(statusTextSpan);
            imageContainer.appendChild(statusDiv);

            const previewElement = document.querySelector("#preview");
            previewElement.appendChild(imageContainer);

            uploadFile(file, id, file.name, fileInfo.buffer);
        });
        fileReader.readAsArrayBuffer(file);
    } else {
        alert('No es un documento válido');
    }
}

//async function uploadFile(file, id, formData) {
//    try {
//        const response = await fetch('/altaDocumentos', {
//            method: "POST",
//            body: formData
//        });

//        const responseText = await response.text();
//        console.log(responseText);

//        document.querySelector(
//            `#${id} .status-text`
//        ).innerHTML = `<span class="success">Documento subido correctamente</span>`;
//    } catch (error) {
//        document.querySelector(
//            `#${id} .status-text`
//        ).innerHTML = `<span class="failure">El documento no pudo subirse</span>`;
//    }
//}

//function onSubir(files, id) {
//    const nombreArchivo = files[0].originalname;

//    const formData = new FormData();
//    formData.append("nombreArchivo", nombreArchivo);

//    uploadFile(files[0], id, formData);
//}

let uploadedFiles = [];

async function uploadFile(file, id, filename, buffer) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);

    try {
        const response = await fetch('/altaDocumentos', {
            method: "POST", 
            body: formData
        });

        const responseText = await response.text();
        console.log(responseText);

        const fileInfo = {
            originalname: file.name,
            mimetype: file.type,
            buffer: buffer,
            size: file.size
        }

        uploadedFiles.push(fileInfo);

        const statusTextElement = document.querySelector(`#${id} .status-text`);

        if (statusTextElement) {
            statusTextElement.innerHTML = `<span class="success">Documento subido correctamente</span>`;
        } else {
            console.error(`No se encontró el elemento con id ${id}`);
        }
    } 
    catch (error) {
        console.error(error);
        
        const statusTextElement = document.querySelector(`#${id} .status-text`);
        if (statusTextElement) {
            statusTextElement.innerHTML = `<span class="failure">El documento no pudo subirse</span>`;
        } 
        else {
            console.error(`No se encontró el elemento con id ${id}`);
        }
    }

    if(uploadedFiles.length === files.length){
        console.log("Información de archivos subidos:", uploadedFiles);
    }
}

async function onSubir(e) {
    e.preventDefault();

    if (files && files.length > 0) {
        try {
            const formData = new FormData();
            for (const file of files) {
                formData.append('file', file);
            }

            const response = await fetch('/altaDocumentos', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json(); 
                console.log('Archivos subidos:', result.identifiers);
            } else {
                console.error('Error al subir los archivos:', response.status);
            }
        } catch (error) {
            console.error('Error al subir los archivos:', error);
        }
    } else {
        console.error('No se han seleccionado archivos para subir.');
    }
}

function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
}