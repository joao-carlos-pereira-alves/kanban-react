export const downloadFile = (event, url, filename) => {
  event.stopPropagation();

  const link = document.createElement("a");

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);

      link.href = blobUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => console.error("Erro ao baixar o arquivo:", error));
};
