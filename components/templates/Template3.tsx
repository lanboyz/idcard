
import React, { forwardRef } from 'react';
import type { StudentData } from '../../types';

interface IdCardProps {
  data: StudentData;
}

const Template3 = forwardRef<HTMLDivElement, IdCardProps>(({ data }, ref) => {
  const { nim, universityName, fullName, alamat, major, dob, validThru, email, universityLogo, studentPhoto, stamp, signature } = data;

  return (
    <div ref={ref} className="w-full h-full bg-white rounded-xl shadow-2xl flex font-sans overflow-hidden">
      
      {/* Main Content */}
      <div className="w-2/3 p-2 flex flex-col justify-between relative">
        {universityLogo && <img src={universityLogo} alt="Watermark" className="absolute inset-0 m-auto w-1/2 h-1/2 object-contain opacity-5" />}
        
        <div className="flex items-center gap-3 z-10">
            {universityLogo ? (
                <img src={universityLogo} alt="Logo Universitas" className="h-10 w-10 object-contain" />
            ) : (
                <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
            )}
            <div>
                <p className="font-bold text-sm uppercase tracking-wider text-indigo-800">{universityName || 'NAMA UNIVERSITAS'}</p>
                <p className="text-xs text-gray-500">KARTU TANDA MAHASISWA</p>
            </div>
        </div>

        <div className="z-10">
          <p className="font-bold text-base leading-tight truncate">{fullName || 'Nama Lengkap'}</p>
          <p className="text-indigo-700 font-semibold mb-1 truncate">{major || 'Jurusan'}</p>
          
          <div className="text-[9px] font-mono space-y-0.5">
            <p className="truncate"><strong>NIM:</strong> {nim || '1234567890'}</p>
            <p className="truncate"><strong>TGL. LAHIR:</strong> {dob || '17 Agustus 2002'}</p>
            <p className="truncate"><strong>EMAIL:</strong> {email || 'email@student.ac.id'}</p>
            <p className="truncate"><strong>ALAMAT:</strong> {alamat || 'Alamat Mahasiswa'}</p>
          </div>
        </div>

        <div className="flex justify-between items-end z-10">
            <div className="text-center">
                <div className="relative w-20 h-10 mx-auto">
                    {signature && <img src={signature} alt="Tanda Tangan" className="absolute inset-0 w-full h-full object-contain" />}
                    {stamp && <img src={stamp} alt="Stempel" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 object-contain opacity-70 -rotate-12" />}
                </div>
                <p className="text-[8px] font-semibold border-t border-gray-400 mt-1 pt-0.5 w-24 mx-auto truncate">
                    {fullName || 'Nama Lengkap'}
                </p>
            </div>
            <div className="text-right">
                <p className="text-[8px] font-semibold text-gray-500">BERLAKU HINGGA</p>
                <p className="font-bold text-sm text-gray-800">{validThru || '17 Agustus 2026'}</p>
            </div>
        </div>
      </div>

      {/* Photo Panel */}
      <div className="w-1/3 bg-indigo-800 flex flex-col p-2 justify-between border-l border-gray-200">
        <div className="flex-grow flex items-center justify-center">
            {studentPhoto ? (
                <img src={studentPhoto} alt="Foto Mahasiswa" className="w-24 h-32 rounded-lg object-cover border-2 border-indigo-200 shadow-lg" />
            ) : (
                <div className="w-24 h-32 bg-indigo-700 rounded-lg flex items-center justify-center border-2 border-indigo-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                </div>
            )}
        </div>
        <div className="flex justify-center pb-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="20" viewBox="0 0 100 25">
            <rect x="0" y="0" width="4" height="25" fill="#fff" /><rect x="7" y="0" width="2" height="25" fill="#fff" /><rect x="12" y="0" width="5" height="25" fill="#fff" /><rect x="20" y="0" width="1" height="25" fill="#fff" /><rect x="24" y="0" width="3" height="25" fill="#fff" /><rect x="30" y="0" width="1" height="25" fill="#fff" /><rect x="34" y="0" width="4" height="25" fill="#fff" /><rect x="41" y="0" width="2" height="25" fill="#fff" /><rect x="46" y="0" width="1" height="25" fill="#fff" /><rect x="50" y="0" width="3" height="25" fill="#fff" /><rect x="56" y="0" width="5" height="25" fill="#fff" /><rect x="64" y="0" width="2" height="25" fill="#fff" /><rect x="69" y="0" width="4" height="25" fill="#fff" /><rect x="76" y="0" width="1" height="25" fill="#fff" /><rect x="80" y="0" width="5" height="25" fill="#fff" /><rect x="88" y="0" width="2" height="25" fill="#fff" /><rect x="93" y="0" width="4" height="25" fill="#fff" />
          </svg>
        </div>
      </div>
    </div>
  );
});

export default Template3;
