
import React, { forwardRef } from 'react';
import type { StudentData } from '../../types';

interface IdCardProps {
  data: StudentData;
}

const Template7 = forwardRef<HTMLDivElement, IdCardProps>(({ data }, ref) => {
  const { nim, universityName, fullName, major, dob, validThru, universityLogo, studentPhoto } = data;

  return (
    <div ref={ref} className="w-full h-full bg-gray-50 rounded-xl shadow-2xl flex flex-col font-sans overflow-hidden p-2 justify-between border-t-8 border-indigo-800">
        <header className="flex items-start justify-between">
            <div>
                <p className="font-bold text-base uppercase tracking-wider text-indigo-800">{universityName || 'NAMA UNIVERSITAS'}</p>
                <p className="text-sm text-gray-500">Kartu Tanda Mahasiswa</p>
            </div>
            {universityLogo ? (
                <img src={universityLogo} alt="Logo Universitas" className="h-10 w-10 object-contain" />
            ) : (
                <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
            )}
        </header>

        <main className="flex gap-4 items-center">
            {studentPhoto ? (
                <img src={studentPhoto} alt="Foto Mahasiswa" className="w-24 h-32 rounded-md object-cover" />
            ) : (
                <div className="w-24 h-32 bg-gray-200 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            )}
            <div className="text-[10px]">
                <p className="font-bold text-base leading-tight truncate">{fullName || 'Nama Lengkap'}</p>
                <p className="font-semibold text-indigo-700 text-sm leading-tight truncate">{major || 'Jurusan'}</p>
                <p className="font-mono text-sm text-gray-700 mt-1">{nim || '1234567890'}</p>
            </div>
        </main>
        
        <footer className="flex justify-between items-end text-[9px] font-mono">
            <div>
                <p className="font-sans font-semibold text-gray-500">Tanggal Lahir</p>
                <p>{dob || '17 Agustus 2002'}</p>
            </div>
            <div>
                <p className="font-sans font-semibold text-gray-500">Berlaku Hingga</p>
                <p>{validThru || '17 Agustus 2026'}</p>
            </div>
             <svg xmlns="http://www.w3.org/2000/svg" width="60" height="15" viewBox="0 0 100 25">
                <rect x="0" y="0" width="4" height="25" fill="#333" /><rect x="7" y="0" width="2" height="25" fill="#333" /><rect x="12" y="0" width="5" height="25" fill="#333" /><rect x="20" y="0" width="1" height="25" fill="#333" /><rect x="24" y="0" width="3" height="25" fill="#333" /><rect x="30" y="0" width="1" height="25" fill="#333" /><rect x="34" y="0" width="4" height="25" fill="#333" /><rect x="41" y="0" width="2" height="25" fill="#333" /><rect x="46" y="0" width="1" height="25" fill="#333" /><rect x="50" y="0" width="3" height="25" fill="#333" /><rect x="56" y="0" width="5" height="25" fill="#333" /><rect x="64" y="0" width="2" height="25" fill="#333" /><rect x="69" y="0" width="4" height="25" fill="#333" /><rect x="76" y="0" width="1" height="25" fill="#333" /><rect x="80" y="0" width="5" height="25" fill="#333" /><rect x="88" y="0" width="2" height="25" fill="#333" /><rect x="93" y="0" width="4" height="25" fill="#333" />
            </svg>
        </footer>
    </div>
  );
});

export default Template7;
