
import React, { forwardRef } from 'react';
import type { StudentData } from '../../types';

interface IdCardProps {
  data: StudentData;
}

const Template4 = forwardRef<HTMLDivElement, IdCardProps>(({ data }, ref) => {
  const { nim, universityName, fullName, alamat, major, dob, validThru, email, universityLogo, studentPhoto, stamp, signature } = data;

  return (
    <div ref={ref} className="w-full h-full bg-white rounded-xl shadow-2xl flex flex-col font-sans overflow-hidden">
      
      {/* Header */}
      <header className="bg-indigo-800 text-white p-2 flex items-center gap-3 rounded-t-xl">
        {universityLogo ? (
          <img src={universityLogo} alt="Logo Universitas" className="h-8 w-8 object-contain" />
        ) : (
          <div className="h-8 w-8 bg-white/20 rounded-full"></div>
        )}
        <div>
            <p className="font-bold text-sm uppercase tracking-wider leading-tight">{universityName || 'NAMA UNIVERSITAS'}</p>
            <p className="text-xs opacity-80 leading-tight">KARTU TANDA MAHASISWA</p>
        </div>
      </header>
      
      {/* Body */}
      <div className="flex-grow flex p-2 gap-2">
        {/* Left section: Photo & Barcode */}
        <div className="w-1/3 flex flex-col items-center justify-between pt-1 pb-2">
            {studentPhoto ? (
                <img src={studentPhoto} alt="Foto Mahasiswa" className="w-24 h-32 rounded-lg border-2 border-gray-200 object-cover shadow-md" />
            ) : (
                <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="15" viewBox="0 0 100 25">
                <rect x="0" y="0" width="4" height="25" fill="#333" /><rect x="7" y="0" width="2" height="25" fill="#333" /><rect x="12" y="0" width="5" height="25" fill="#333" /><rect x="20" y="0" width="1" height="25" fill="#333" /><rect x="24" y="0" width="3" height="25" fill="#333" /><rect x="30" y="0" width="1" height="25" fill="#333" /><rect x="34" y="0" width="4" height="25" fill="#333" /><rect x="41" y="0" width="2" height="25" fill="#333" /><rect x="46" y="0" width="1" height="25" fill="#333" /><rect x="50" y="0" width="3" height="25" fill="#333" /><rect x="56" y="0" width="5" height="25" fill="#333" /><rect x="64" y="0" width="2" height="25" fill="#333" /><rect x="69" y="0" width="4" height="25" fill="#333" /><rect x="76" y="0" width="1" height="25" fill="#333" /><rect x="80" y="0" width="5" height="25" fill="#333" /><rect x="88" y="0" width="2" height="25" fill="#333" /><rect x="93" y="0" width="4" height="25" fill="#333" />
            </svg>
        </div>

        {/* Right section: Details */}
        <div className="w-2/3 flex flex-col justify-between text-gray-800 text-[9px] leading-snug">
            <div>
                <p className="font-bold text-base leading-tight truncate">{fullName || 'Nama Lengkap'}</p>
                <p className="text-indigo-700 font-semibold mb-1 truncate">{major || 'Jurusan'}</p>
                
                <div className="font-mono space-y-0.5">
                    <p className="truncate"><strong className="font-sans font-semibold text-gray-500">NIM:</strong> {nim || '1234567890'}</p>
                    <p className="truncate"><strong className="font-sans font-semibold text-gray-500">Tgl. Lahir:</strong> {dob || '17 Agustus 2002'}</p>
                    <p className="truncate"><strong className="font-sans font-semibold text-gray-500">Email:</strong> {email || 'email@student.ac.id'}</p>
                    <p className="truncate"><strong className="font-sans font-semibold text-gray-500">Alamat:</strong> {alamat || 'Alamat Mahasiswa'}</p>
                </div>
            </div>

            <div className="flex justify-between items-end">
                 <div className="text-left">
                     <p className="text-[8px] font-semibold text-gray-500">BERLAKU HINGGA</p>
                     <p className="font-bold text-sm">{validThru || '17 Agustus 2026'}</p>
                </div>
                 <div className="text-center">
                    <div className="relative w-24 h-10">
                        {stamp && <img src={stamp} alt="Stempel" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 object-contain opacity-70 -rotate-12" />}
                        {signature && <img src={signature} alt="Tanda Tangan" className="absolute inset-0 w-full h-full object-contain z-10" />}
                    </div>
                    <p className="text-[8px] font-semibold border-t border-gray-400 pt-0.5 w-full truncate">
                        {fullName || 'Nama Lengkap'}
                    </p>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
});

export default Template4;
