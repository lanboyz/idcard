import React, { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import type { StudentData } from '../types';

interface CardTemplateProps {
  design: 1 | 2;
  data: StudentData;
}

const Barcode: React.FC = () => (
    <div className="flex justify-between items-center w-full h-5">
      {[...Array(60)].map((_, i) => (
        <span
          key={i}
          className={`bg-black h-full ${[2, 5, 8, 13, 21, 34, 55].includes(i) ? 'bg-purple-800' : ''}`}
          style={{ width: `${i % 3 === 0 ? '1px' : '1.5px'}` }}
        ></span>
      ))}
    </div>
);

const DownloadIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 mr-2"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const CardTemplate: React.FC<CardTemplateProps> = ({ design, data }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (cardRef.current === null) {
      return;
    }
    
    try {
      // Temporarily remove hover effect to prevent it from being captured in the image
      cardRef.current.classList.remove('hover:scale-105');

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: 5 // Render at 5x resolution for high quality
      });
      
      // Restore hover effect
      cardRef.current.classList.add('hover:scale-105');

      const link = document.createElement('a');
      link.download = `KTM-UNNES-${data.nim || 'kartu'}-${design}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Gagal mengunduh kartu:', err);
      // Restore hover effect even if it fails
       if (cardRef.current) {
           cardRef.current.classList.add('hover:scale-105');
       }
      alert('Gagal mengunduh gambar. Silakan coba lagi.');
    }
  }, [data.nim, design]);

  let cardElement: JSX.Element | null = null;

  if (design === 1) {
    const { nama, nim, prodi, tempatLahir, tanggalLahir, alamat1, alamat2, golDarah, masaBerlaku, logo, foto } = data;
    const backgroundSvg = `url("data:image/svg+xml,%3Csvg width='856' height='540' viewBox='0 0 856 540' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='856' height='540' fill='white'/%3E%3Cpath d='M0 0 H580 C565 180, 565 360, 580 540 H0 V0 Z' fill='%231E3A8A'/%3E%3Cpath d='M580 0 C565 180, 565 360, 580 540' stroke='%23FACC15' stroke-width='12'/%3E%3C/svg%3E")`;
    
    cardElement = (
      <div ref={cardRef} className={`w-full aspect-[85.6/54] rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 overflow-hidden font-sans`}>
        <div className="relative w-full h-full bg-cover bg-center" style={{ backgroundImage: backgroundSvg }}>
          {logo && <div className="absolute inset-0 flex items-center justify-center"><img src={logo} alt="Watermark" className="w-48 h-48 object-contain opacity-20" /></div>}
          <div className="absolute inset-0 flex">
            <div className="w-[67%] h-full p-4 flex flex-col relative text-white">
              <header className="flex items-center space-x-3">
                {logo ? <img src={logo} alt="Logo" className="h-12 w-12 object-contain" /> : <div className="h-12 w-12 bg-black/20 rounded-full flex-shrink-0"></div>}
                <div><p className="text-lg font-semibold leading-tight">Universitas</p><p className="text-lg font-semibold leading-tight">Negeri Semarang</p></div>
              </header>
              <main className="mt-8 text-yellow-300" style={{ fontSize: '10px' }}>
                <p className="font-semibold">{tempatLahir}, {tanggalLahir}</p><p className="font-semibold mt-1">{alamat1}</p><p className="font-semibold">{alamat2}</p>
                <hr className="border-t border-white/50 my-2" /><p className="font-semibold">Goldar: {golDarah}</p>
              </main>
              <footer className="absolute bottom-2 left-4 right-4 text-white/40 text-center">
                <p className="font-bold text-2xl tracking-widest">UNNES</p><p className="text-[8px] font-semibold tracking-wide">UNIVERSITAS NEGERI SEMARANG</p>
              </footer>
            </div>
            <div className="w-[33%] h-full flex flex-col items-center p-3 text-black">
              <div className="w-[90px] h-[120px] bg-gray-200 mt-2">{foto && <img src={foto} alt="Foto" className="w-full h-full object-cover" />}</div>
              <div className="text-center mt-3 w-full"><p className="font-bold text-sm leading-tight">{nama}</p><p className="text-xs mt-1">{prodi}</p><p className="text-xs">{nim}</p><p className="text-xs mt-1">Berlaku Sampai: {masaBerlaku}</p></div>
              <div className="mt-auto w-[95%] mb-2"><Barcode /></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (design === 2) {
      const { nama, nim, prodi, tempatLahir, tanggalLahir, alamat1, alamat2, golDarah, phone, email, masaBerlaku, logo, foto } = data;
      cardElement = (
        <div ref={cardRef} className="relative w-full aspect-[85.6/54] rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 overflow-hidden font-sans text-gray-800">
          <div className="absolute inset-0 flex z-0"><div className="w-[60%] h-full bg-white"></div><div className="w-[40%] h-full bg-yellow-400"></div></div>
          {logo && <div className="absolute inset-0 flex items-center justify-center z-10"><img src={logo} alt="Watermark" className="w-48 h-48 object-contain opacity-15" /></div>}
          <div className="relative w-full h-full flex z-20">
            <div className="w-[60%] h-full p-4 flex flex-col">
              <header className="flex items-center space-x-3">
                {logo ? <img src={logo} alt="Logo" className="h-14 w-14 object-contain" /> : <div className="h-14 w-14 bg-gray-200 rounded-md flex-shrink-0"></div>}
                <div><p className="text-lg font-bold leading-tight">Universitas</p><p className="text-lg font-bold leading-tight">Negeri Semarang</p></div>
              </header>
              <main className="mt-auto text-black/80" style={{ fontSize: '10px' }}>
                <p className="font-medium">{tempatLahir}, {tanggalLahir}</p><p className="font-medium mt-0.5">{alamat1}</p><p className="font-medium">{alamat2}</p>
                <p className="font-medium mt-2">Goldar: {golDarah}</p><p className="font-medium">Phone: {phone}</p><p className="font-medium">Email: {email}</p>
              </main>
            </div>
            <div className="w-[40%] h-full flex flex-col items-center p-3">
              <div className="w-[90px] h-[120px] bg-red-300 mt-2 border-2 border-white shadow-md">{foto && <img src={foto} alt="Foto" className="w-full h-full object-cover" />}</div>
              <div className="text-center mt-3 w-full text-black/90"><p className="font-bold text-sm leading-tight">{nama}</p><p className="text-[10px] mt-1 leading-tight font-semibold">{prodi}</p><p className="text-xs mt-0.5">{nim}</p><p className="text-xs mt-1">Berlaku Sampai: {masaBerlaku}</p></div>
              <div className="mt-auto w-[95%] mb-2"><Barcode /></div>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div>
      {cardElement}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleDownload}
          className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-105"
          aria-label={`Unduh desain kartu ${design}`}
        >
          <DownloadIcon />
          Unduh
        </button>
      </div>
    </div>
  );
};

export default CardTemplate;