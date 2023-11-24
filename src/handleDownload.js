import html2canvas from 'html2canvas';

export const handleDownload = () => {
  const element = document.getElementsByClassName('pvtUi');
  if (element) {
    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'nombre_de_la_imagen.png';
      link.click();
      document.body.removeChild(link);
    });
  }
};
