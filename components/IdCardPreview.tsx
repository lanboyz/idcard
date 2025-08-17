import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

interface IdCardPreviewProps {
  title: string;
  children: React.ReactElement;
}

const IdCardPreview: React.FC<IdCardPreviewProps> = ({ title, children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current === null) {
      return;
    }
    try {
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        pixelRatio: 10, // Menghasilkan gambar resolusi sangat tinggi untuk kualitas cetak
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });
      const link = document.createElement('a');
      link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_ID_Card.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Gagal mengunduh gambar!', err);
      alert('Maaf, terjadi kesalahan saat mencoba mengunduh gambar.');
    }
  };

  // We need to clone the child element to pass the ref to it.
  // Casting `children` is a workaround for a TypeScript limitation with
  // refs on function components with React.cloneElement.
  const cardWithRef = React.cloneElement(children as React.ReactElement<any>, { ref: cardRef });

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="w-[3.375in] h-[2.125in] flex items-center justify-center">
         {cardWithRef}
      </div>
      <button
        onClick={handleDownload}
        className="w-full mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
        aria-label={`Unduh ${title}`}
      >
        Download PNG
      </button>
    </div>
  );
};

export default IdCardPreview;