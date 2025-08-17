
import React, { forwardRef } from 'react';
import type { StudentData } from '../../types';

interface IdCardProps {
  data: StudentData;
}

const Template6 = forwardRef<HTMLDivElement, IdCardProps>(({ data }, ref) => {
  const { nim, universityName, fullName, major, dob, validThru, universityLogo, studentPhoto, stamp, signature } = data;

  return (
    <div ref={ref} className="w-full h-full bg-white rounded-xl shadow-2xl flex font-sans overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/3 bg-indigo-800 flex flex-col items-center justify-around p-2 text-white">
            {universityLogo ? (
                <img src={universityLogo} alt="Logo Universitas" className="h-12 w-12 object-contain bg-white p-1 rounded-full" />
            ) : (
                <div className="h-12 w-12 bg-white/20 rounded-full"></div>
            )}
            
            {studentPhoto ? (
                <img src={studentPhoto} alt="Foto Mahasiswa" className="w-24 h-32 rounded-lg object-cover border-2 border-indigo-200 shadow-lg" />
            ) : (
                <div className="w-24 h-32 bg-indigo-700 rounded-lg flex items-center justify-center border-2 border-indigo-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            )}

            <p className="font-mono text-xs">{nim || '1234567890'}</p>
        </div>

        {/* Right Panel */}
        <div className="w-2/3 p-3 flex flex-col justify-between">
            <div>
                <p className="font-bold text-sm uppercase tracking-wider text-gray-500">KARTU TANDA MAHASISWA</p>
                <p className="font-bold text-lg text-indigo-800 leading-tight">{universityName || 'NAMA UNIVERSITAS'}</p>
            </div>
            
            <div className="text-[10px]">
                <p className="font-semibold text-gray-500">Nama Lengkap</p>
                <p className="font-bold text-base leading-tight truncate">{fullName || 'Nama Lengkap'}</p>
                <p className="font-semibold text-gray-500 mt-1">Jurusan</p>
                <p className="font-bold text-base text-indigo-700 leading-tight truncate">{major || 'Jurusan'}</p>
            </div>

            <div className="flex justify-between items-end">
                <div className="text-[9px]">
                    <p><strong>Tgl. Lahir:</strong> {dob || '17 Agustus 2002'}</p>
                    <p><strong>Berlaku s/d:</strong> {validThru || '17 Agustus 2026'}</p>
                </div>
                <div className="relative w-24 h-12 text-center">
                    {stamp && <img src={stamp} alt="Stempel" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 object-contain opacity-70 -rotate-12" />}
                    {signature && <img src={signature} alt="Tanda Tangan" className="absolute inset-0 w-full h-full object-contain z-10" />}
                    <p className="text-[8px] font-semibold border-t border-gray-400 absolute bottom-0 w-full pt-0.5 truncate">
                        {fullName || 'Pemegang Kartu'}
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
});

export default Template6;
