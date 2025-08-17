
import React, { forwardRef } from 'react';
import type { StudentData } from '../../types';

interface IdCardProps {
  data: StudentData;
}

const Template8 = forwardRef<HTMLDivElement, IdCardProps>(({ data }, ref) => {
  const { nim, universityName, fullName, major, dob, validThru, universityLogo, studentPhoto, signature } = data;

  return (
    <div ref={ref} className="w-full h-full bg-indigo-50 rounded-xl shadow-2xl flex flex-col font-sans overflow-hidden relative p-2 text-indigo-900">
        {universityLogo && <img src={universityLogo} alt="Watermark" className="absolute inset-0 m-auto w-3/4 h-3/4 object-contain opacity-5" />}

        <header className="flex items-center justify-between z-10">
            <div>
                <p className="font-extrabold text-lg uppercase tracking-wide leading-tight">{universityName || 'NAMA UNIVERSITAS'}</p>
                <p className="text-xs font-semibold opacity-70">KARTU TANDA MAHASISWA</p>
            </div>
             {universityLogo ? (
                <img src={universityLogo} alt="Logo Universitas" className="h-10 w-10 object-contain" />
            ) : (
                <div className="h-10 w-10 bg-indigo-200 rounded-md"></div>
            )}
        </header>

        <main className="flex-grow flex items-center gap-4 z-10">
             {studentPhoto ? (
                <img src={studentPhoto} alt="Foto Mahasiswa" className="w-24 h-32 rounded-md object-cover border-4 border-white shadow-md" />
            ) : (
                <div className="w-24 h-32 bg-indigo-200 rounded-md flex items-center justify-center border-4 border-white shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            )}
            <div>
                <p className="font-bold text-lg leading-tight truncate">{fullName || 'Nama Lengkap'}</p>
                <p className="font-semibold text-base leading-tight truncate">{major || 'Jurusan'}</p>
                <p className="font-mono text-base text-indigo-800">{nim || '1234567890'}</p>
            </div>
        </main>

        <footer className="flex justify-between items-end z-10">
            <div className="text-[9px] font-mono">
                <p><strong className="font-sans font-semibold">Tgl. Lahir:</strong> {dob || '17 Agustus 2002'}</p>
                <p><strong className="font-sans font-semibold">Berlaku s/d:</strong> {validThru || '17 Agustus 2026'}</p>
            </div>
            <div className="text-center">
                {signature && <img src={signature} alt="Tanda Tangan" className="w-24 h-10 object-contain" />}
                <p className="text-[8px] font-semibold border-t-2 border-indigo-200 pt-0.5 w-full truncate">
                    {fullName || 'Nama Lengkap'}
                </p>
            </div>
        </footer>
    </div>
  );
});

export default Template8;
