
import React, { forwardRef } from 'react';
import type { StudentData } from '../../types';

interface IdCardProps {
  data: StudentData;
}

const Template5 = forwardRef<HTMLDivElement, IdCardProps>(({ data }, ref) => {
  const { nim, universityName, fullName, major, dob, validThru, universityLogo, studentPhoto, stamp, signature } = data;

  return (
    <div ref={ref} className="w-full h-full bg-white rounded-xl shadow-2xl flex flex-col font-sans overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-indigo-800 -z-0 rounded-b-3xl"></div>
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col h-full p-3 items-center">
            
            {/* Photo */}
            <div className="mt-4">
            {studentPhoto ? (
                <img src={studentPhoto} alt="Foto Mahasiswa" className="w-28 h-36 rounded-lg object-cover border-4 border-white shadow-xl" />
            ) : (
                <div className="w-28 h-36 bg-gray-200 rounded-lg flex items-center justify-center border-4 border-white shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            )}
            </div>
            
            {/* Info */}
            <div className="text-center mt-2 flex-grow">
                <p className="font-bold text-lg leading-tight truncate">{fullName || 'Nama Lengkap'}</p>
                <p className="text-indigo-700 font-semibold truncate">{major || 'Jurusan'}</p>
                <p className="font-mono text-gray-600 text-sm mt-1">{nim || '1234567890'}</p>
            </div>

            {/* Signature & Validity */}
            <div className="w-full flex items-end justify-between text-[9px]">
                <div>
                    <p className="font-semibold text-gray-500">Tgl. Lahir: <span className="font-mono font-normal text-gray-700">{dob || '17 Agustus 2002'}</span></p>
                    <p className="font-semibold text-gray-500">Berlaku s/d: <span className="font-mono font-normal text-gray-700">{validThru || '17 Agustus 2026'}</span></p>
                </div>
                <div className="relative w-20 h-10">
                    {stamp && <img src={stamp} alt="Stempel" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 object-contain opacity-70 -rotate-12" />}
                    {signature && <img src={signature} alt="Tanda Tangan" className="absolute inset-0 w-full h-full object-contain z-10" />}
                </div>
            </div>

        </div>

        {/* Footer */}
        <footer className="bg-gray-100 p-2 text-center rounded-b-xl border-t border-gray-200">
             <div className="flex items-center justify-center gap-2">
                {universityLogo ? (
                    <img src={universityLogo} alt="Logo Universitas" className="h-6 w-6 object-contain" />
                ) : (
                    <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                )}
                <p className="font-bold text-xs uppercase tracking-wider text-indigo-800">{universityName || 'NAMA UNIVERSITAS'}</p>
            </div>
        </footer>
    </div>
  );
});

export default Template5;
