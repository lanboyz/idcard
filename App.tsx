import React, { useState, useCallback } from 'react';
import type { StudentData } from './types';
import CardTemplate from './components/CardTemplate';

const initialData: StudentData = {
  nama: 'MUH. TAQDIR ALIWARDA',
  nim: '5302410000', // Example NIM
  prodi: 'Pendidikan Teknik Informatika dan Komputer',
  masaBerlaku: '31 DES 2025',
  tempatLahir: 'Selong',
  tanggalLahir: '06 Juni 2001',
  alamat1: 'Rt.14, Rw.0, Nanam, Selong',
  alamat2: 'Kabupaten Lombok Timur',
  golDarah: 'B',
  phone: '081234567890',
  email: 'm.taqdir@email.unnes.ac.id',
  logo: null,
  foto: null,
  stempel: null,
  tandaTangan: null,
};

const programStudiOptions = [
  // FIP
  "Bimbingan dan Konseling", "Pendidikan Guru Sekolah Dasar", "Pendidikan Guru PAUD", "Psikologi", "Kurikulum dan Teknologi Pendidikan", "Pendidikan Luar Sekolah",
  // FBS
  "Pendidikan Bahasa dan Sastra Indonesia", "Pendidikan Bahasa Inggris", "Pendidikan Bahasa Arab", "Pendidikan Bahasa Jepang", "Pendidikan Bahasa Mandarin", "Pendidikan Bahasa Prancis", "Sastra Indonesia", "Sastra Inggris", "Sastra Jawa", "Pendidikan Seni Rupa", "Pendidikan Seni Tari", "Pendidikan Seni Musik", "Desain Komunikasi Visual", "Sastra Prancis",
  // FISIP
  "Pendidikan Geografi", "Pendidikan Sejarah", "Pendidikan Sosiologi dan Antropologi", "Pendidikan Pancasila dan Kewarganegaraan", "Ilmu Sejarah", "Geografi", "Ilmu Politik", "Sosiologi", "Ilmu Komunikasi",
  // FMIPA
  "Pendidikan Matematika", "Pendidikan Fisika", "Pendidikan Kimia", "Pendidikan Biologi", "Pendidikan IPA", "Matematika", "Fisika", "Kimia", "Biologi", "Informatika", "Sistem Informasi", "Statistika", "Ilmu Lingkungan", "Farmasi", "Teknik Elektro",
  // FT
  "Pendidikan Teknik Bangunan", "Pendidikan Teknik Mesin", "Pendidikan Teknik Otomotif", "Pendidikan Kesejahteraan Keluarga", "Pendidikan Tata Boga", "Pendidikan Tata Busana", "Pendidikan Tata Kecantikan", "Teknik Mesin", "Teknik Sipil", "Teknik Kimia", "Teknik Arsitektur", "Teknik Komputer", "Pendidikan Teknik Informatika dan Komputer",
  // FIKK
  "Pendidikan Jasmani, Kesehatan dan Rekreasi", "Pendidikan Kepelatihan Olahraga", "Ilmu Keolahragaan", "Gizi", "Kesehatan Masyarakat",
  // FEB
  "Pendidikan Ekonomi (Pendidikan Akuntansi)", "Pendidikan Ekonomi (Pendidikan Koperasi)", "Pendidikan Ekonomi (Pendidikan Administrasi Perkantoran)", "Akuntansi", "Manajemen", "Ekonomi Pembangunan",
  // FH
  "Ilmu Hukum",
  // FK
  "Kedokteran"
].sort();


// --- Helper Components defined outside App to prevent re-creation on re-render ---

interface TextInputProps {
  label: string;
  name: keyof StudentData;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, value, placeholder, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
    />
  </div>
);

interface SelectInputProps {
  label: string;
  name: keyof StudentData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const SelectInput: React.FC<SelectInputProps> = ({ label, name, value, onChange, options }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 bg-white"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);


const UploadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6 text-gray-400 mr-2"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

interface FileUploadProps {
  label: string;
  name: keyof StudentData;
  onChange: (name: keyof StudentData, file: File | null) => void;
  previewUrl: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, name, onChange, previewUrl }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onChange(name, e.target.files[0]);
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="mt-1 flex items-center">
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="h-16 w-16 object-cover rounded-md bg-gray-200" />
                ) : (
                    <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                        </svg>
                    </div>
                )}
                <label htmlFor={name} className="ml-4 cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
                    <UploadIcon className="h-5 w-5 inline-block mr-1" />
                    Pilih File
                    <input id={name} name={name} type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/svg+xml" />
                </label>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  const [data, setData] = useState<StudentData>(initialData);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((name: keyof StudentData, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, [name]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-3xl font-bold text-center text-gray-900">
                  Generator Kartu Tanda Mahasiswa
              </h1>
              <p className="text-center text-gray-600 mt-1">Universitas Negeri Semarang</p>
          </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Control Panel */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Panel Kontrol</h2>
            <div className="space-y-4">
              <TextInput label="Nama Lengkap" name="nama" value={data.nama} onChange={handleTextChange} placeholder="Masukkan nama lengkap" />
              <TextInput label="NIM" name="nim" value={data.nim} onChange={handleTextChange} placeholder="Masukkan NIM" />
              <TextInput label="Berlaku Sampai" name="masaBerlaku" value={data.masaBerlaku} onChange={handleTextChange} placeholder="Contoh: 31 DES 2025" />
              <SelectInput label="Program Studi" name="prodi" value={data.prodi} onChange={handleSelectChange} options={programStudiOptions} />
              <TextInput label="Tempat Lahir" name="tempatLahir" value={data.tempatLahir} onChange={handleTextChange} placeholder="Masukkan tempat lahir" />
              <TextInput label="Tanggal Lahir" name="tanggalLahir" value={data.tanggalLahir} onChange={handleTextChange} placeholder="Contoh: 3 September 1995" />
              <TextInput label="Alamat Baris 1" name="alamat1" value={data.alamat1} onChange={handleTextChange} placeholder="Masukkan alamat baris 1" />
              <TextInput label="Alamat Baris 2" name="alamat2" value={data.alamat2} onChange={handleTextChange} placeholder="Masukkan alamat baris 2" />
              <TextInput label="Golongan Darah" name="golDarah" value={data.golDarah} onChange={handleTextChange} placeholder="Contoh: B" />
              <TextInput label="Nomor Telepon" name="phone" value={data.phone} onChange={handleTextChange} placeholder="Contoh: 081234567890" />
              <TextInput label="Email" name="email" value={data.email} onChange={handleTextChange} placeholder="Contoh: nama@email.com" />
              
              <FileUpload label="Logo Universitas (.png, .svg)" name="logo" onChange={handleFileChange} previewUrl={data.logo} />
              <FileUpload label="Foto Mahasiswa (resmi)" name="foto" onChange={handleFileChange} previewUrl={data.foto} />
            </div>
          </div>

          {/* Preview Area */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">Pratinjau Desain Kartu</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <CardTemplate design={1} data={data} />
              <CardTemplate design={2} data={data} />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="text-center py-6 text-gray-500 text-sm">
        Dibuat dengan ❤️ untuk Universitas Negeri Semarang.
      </footer>
    </div>
  );
};

export default App;