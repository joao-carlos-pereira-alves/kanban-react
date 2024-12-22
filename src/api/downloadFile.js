export const downloadFile = (url, filename) => {
 // Cria um link temporário
 const link = document.createElement('a');

 // Usando a URL fornecida para buscar o Blob
 fetch(url)
   .then(response => response.blob())  // Converte a URL para Blob
   .then(blob => {
     // Cria um Object URL para o Blob
     const blobUrl = URL.createObjectURL(blob);

     // Define a URL do link para o Blob
     link.href = blobUrl;
     link.download = filename;

     // Adiciona o link ao DOM, dispara o clique e remove o link após o download
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);

     // Libera a URL do Blob após o download
     URL.revokeObjectURL(blobUrl);
   })
   .catch(error => console.error('Erro ao baixar o arquivo:', error));
};