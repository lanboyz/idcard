
import React, { forwardRef } from 'react';
import type { StudentData } from '../../types';

interface IdCardProps {
  data: StudentData;
}

const Template1 = forwardRef<HTMLDivElement, IdCardProps>(({ data }, ref) => {
  const { nim, universityName, fullName, alamat, major, dob, validThru, email, universityLogo, studentPhoto, stamp, signature } = data;

  return (
    <div ref={ref} className="w-[3.375in] h-[2.125in] bg-white rounded-xl shadow-2xl flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-3 bg-indigo-800 text-white rounded-t-xl">
        {universityLogo ? (
          <img src={universityLogo} alt="Logo Universitas" className="h-12 w-12 mr-3 object-contain" />
        ) : (
          <div className="h-12 w-12 mr-3 bg-white/20 rounded-full"></div>
        )}
        <div className="text-left">
          <p className="font-bold text-sm leading-tight uppercase tracking-wider">{universityName || 'NAMA UNIVERSITAS'}</p>
          <p className="text-xs leading-tight opacity-80">KARTU TANDA MAHASISWA</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex-grow flex p-3 relative">
        <div className="w-1/3 pr-3">
          {studentPhoto ? (
            <img src={studentPhoto} alt="Foto Mahasiswa" className="w-full h-[110px] rounded-md border-2 border-gray-200 object-cover" />
          ) : (
            <div className="w-full h-[110px] bg-gray-200 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>
        <div className="w-2/3 text-gray-800 text-[9px] leading-snug">
          <p className="font-bold text-lg leading-tight -mt-1 truncate">{fullName || 'Nama Lengkap'}</p>
          <p className="text-[8px] text-gray-600 leading-tight truncate">{alamat || 'Alamat Mahasiswa'}</p>
          <p className="text-indigo-700 font-semibold mb-1 truncate">{major || 'Jurusan'}</p>
          
          <div className="grid grid-cols-3 gap-x-2 mt-1">
            <span className="font-semibold text-gray-500">NIM</span>
            <span className="col-span-2 font-mono">: {nim || '1234567890'}</span>

            <span className="font-semibold text-gray-500">Tgl. Lahir</span>
            <span className="col-span-2 font-mono">: {dob || 'YYYY-MM-DD'}</span>
            
            <span className="font-semibold text-gray-500">Berlaku s/d</span>
            <span className="col-span-2 font-mono">: {validThru || 'YYYY-MM-DD'}</span>

            <span className="font-semibold text-gray-500">Email</span>
            <span className="col-span-2 font-mono truncate">: {email || 'email@student.ac.id'}</span>
          </div>
        </div>

        {/* Overlays */}
        {signature && <img src={signature} alt="Tanda Tangan" className="absolute bottom-2 right-3 w-20 h-10 object-contain" />}
        {stamp && <img src={stamp} alt="Stempel" className="absolute bottom-1 right-8 w-14 h-14 object-contain opacity-70 -rotate-12" />}
      </div>
       {/* Footer */}
       <div className="bg-gray-100 p-1 rounded-b-xl flex justify-end">
         <svg xmlns="http://www.w3.org/2000/svg" width="60" height="15" viewBox="0 0 100 25">
            <rect x="0" y="0" width="4" height="25" fill="#333" />
            <rect x="7" y="0" width="2" height="25" fill="#333" /><rect x="12" y="0" width="5" height="25" fill="#333" /><rect x="20" y="0" width="1" height="25" fill="#333" /><rect x="24" y="0" width="3" height="25" fill="#333" /><rect x="30" y="0" width="1" height="25" fill="#333" /><rect x="34" y="0" width="4" height="25" fill="#333" /><rect x="41" y="0" width="2" height="25" fill="#333" /><rect x="46" y="0" width="1" height="25" fill="#333" /><rect x="50" y="0" width="3" height="25" fill="#333" /><rect x="56" y="0" width="5" height="25" fill="#333" /><rect x="64" y="0" width="2" height="25" fill="#333" /><rect x="69" y="0" width="4" height="25" fill="#333" /><rect x="76" y="0" width="1" height="25" fill="#333" /><rect x="80" y="0" width="5" height="25" fill="#333" /><rect x="88" y="0" width="2" height="25" fill="#333" /><rect x="93" y="0" width="4" height="25" fill="#333" />
        </svg>
       </div>
    </div>
  );
});

export default Template1;
