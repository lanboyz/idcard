
import React, { forwardRef } from 'react';
import type { StudentData } from '../../types';

interface IdCardProps {
  data: StudentData;
}

const Template9 = forwardRef<HTMLDivElement, IdCardProps>(({ data }, ref) => {
  const { nim, universityName, fullName, major, dob, validThru, universityLogo, studentPhoto, signature } = data;

  return (
    <div ref={ref} className="w-full h-full bg-white rounded-xl shadow-2xl flex flex-col font-sans overflow-hidden">
        {/* Header */}
        <header className="bg-indigo-800 p-3 text-white text-center rounded-t-xl">
             {universityLogo ? (
                <img src={universityLogo} alt="Logo Universitas" className="h-10 w-10 object-contain mx-auto mb-1 bg-white p-1 rounded-full" />
            ) : (
                <div className="h-10 w-10 bg-white/20 rounded-full mx-auto mb-1"></div>
            )}
            <p className="font-bold text-sm uppercase tracking-wider leading-tight">{universityName || 'NAMA UNIVERSITAS'}</p>
        </header>

        {/* Main Content */}
        <main className="p-3 flex-grow flex flex-col justify-between">
            <div className="text-center">
                <p className="font-bold text-lg leading-tight truncate">{fullName || 'Nama Lengkap'}</p>
                <p className="text-indigo-700 font-semibold truncate">{major || 'Jurusan'}</p>
                <p className="font-mono text-gray-600 text-sm mt-1">{nim || '1234567890'}</p>
            </div>

            <div className="flex items-center gap-3">
                {studentPhoto ? (
                    <img src={studentPhoto} alt="Foto Mahasiswa" className="w-20 h-28 rounded-md object-cover border-2 border-gray-200" />
                ) : (
                    <div className="w-20 h-28 bg-gray-200 rounded-md flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                )}
                <div className="text-[9px] font-mono w-full">
                    <p className="truncate"><strong className="font-sans font-semibold text-gray-500">Tgl. Lahir:</strong> {dob || '17 Agustus 2002'}</p>
                    <p className="truncate"><strong className="font-sans font-semibold text-gray-500">Berlaku s/d:</strong> {validThru || '17 Agustus 2026'}</p>
                    <div className="mt-2 text-center">
                        {signature && <img src={signature} alt="Tanda Tangan" className="w-24 h-8 object-contain mx-auto" />}
                        <p className="text-[8px] font-sans font-semibold border-t border-gray-400 mt-1 pt-0.5 w-full truncate">
                            {fullName || 'Nama Lengkap'}
                        </p>
                    </div>
                </div>
            </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-100 p-1 flex justify-center rounded-b-xl">
             <svg xmlns="http://www.w3.org/2000/svg" width="80" height="20" viewBox="0 0 100 25">
                <rect x="0" y="0" width="4" height="25" fill="#333" /><rect x="7" y="0" width="2" height="25" fill="#333" /><rect x="12" y="0" width="5" height="25" fill="#333" /><rect x="20" y="0" width="1" height="25" fill="#333" /><rect x="24" y="0" width="3" height="25" fill="#333" /><rect x="30" y="0" width="1" height="25" fill="#333" /><rect x="34" y="0" width="4" height="25" fill="#333" /><rect x="41" y="0" width="2" height="25" fill="#333" /><rect x="46" y="0" width="1" height="25" fill="#333" /><rect x="50" y="0" width="3" height="25" fill="#333" /><rect x="56" y="0" width="5" height="25" fill="#333" /><rect x="64" y="0" width="2" height="25" fill="#333" /><rect x="69" y="0" width="4" height="25" fill="#333" /><rect x="76" y="0" width="1" height="25" fill="#333" /><rect x="80" y="0" width="5" height="25" fill="#333" /><rect x="88" y="0" width="2" height="25" fill="#333" /><rect x="93" y="0" width="4" height="25" fill="#333" />
            </svg>
        </footer>
    </div>
  );
});

export default Template9;
